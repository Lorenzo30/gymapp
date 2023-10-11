import * as ImagePicker from "expo-image-picker"

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, Alert, useToast, Container } from "native-base";
import { TouchableOpacity } from "react-native";
import { useCallback, useState } from "react"

import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

import * as FileSystem from "expo-file-system"
import { useAuth } from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { useFocusEffect } from "@react-navigation/native";

type FormDataProps = {
    name: string,
    email: string,
    password: string,
    old_password: string,
    confirm_password: string
}

const profileSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    old_password: yup.string(),

    password: yup.string().min(6, "A senha deve conter no minimo 6 digitos").nullable().transform((value) => !!value ? value : null)
        .when('old_password', {
            is: (Field: any) => Field,
            then: () => yup.string().required('infome a nova senha')
        }),

    confirm_password: yup.string().oneOf([yup.ref('password'), null], "A confirmação de senha não confere").nullable().transform(value => !!value ? value : null)
})

export function Profile() {

    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
    const [userPhoto, setUserPhoto] = useState("");
    const toast = useToast();
    const { user, updateUserProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        defaultValues: {
            name: user.name,
            email: user.email,
        },
        resolver: yupResolver(profileSchema)
    });

   

    useFocusEffect(useCallback(() => {
        //setUserPhoto(`${api.defaults.baseURL}/avatar/${user.avatar}`);
    }, []))

    async function handleProfileUpdate(data: FormDataProps) {
        setIsLoading(true);
        try {

            const updateUser = user;
            updateUser.name = data.name

            await api.put("/users", data);
            toast.show({
                title: "Perfil atualizado com sucesso",
                placement: "top",
                bgColor: "green.500"
            })

            await updateUserProfile(updateUser);

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel atualizar os dados!"

            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function handleUserPhotoSelect() {
        setIsLoadingPhoto(true);
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
                aspect: [4, 4],
                allowsEditing: true
            });

            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
                if (photoInfo.size && (photoInfo.size / 1024 / 1024) > 1) {
                    return toast.show(
                        {
                            title: "Essa imagem passa o tamanho maximo de 1mb",
                            placement: "top",
                            bgColor: "red.500"
                        }
                    )
                }

                const fileExtension = photoSelected.assets[0].uri.split(".").pop();

                const photoFile = {
                    name: `${user.name}.${fileExtension}`.toLowerCase(),
                    uri: photoSelected.assets[0].uri,
                    type: `${photoSelected.assets[0].type}/${fileExtension}`
                } as any

                const userPhotoUploadForm = new FormData();
                userPhotoUploadForm.append("avatar", photoFile)

                try {
                    const avatarUpdatedResponse = await api.patch("/users/avatar", userPhotoUploadForm, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })

                    const userUpdated = user;
                    userUpdated.avatar = avatarUpdatedResponse.data.avatar;
                    updateUserProfile(userUpdated)
                    setUserPhoto(`${api.defaults.baseURL}/avatar/${userUpdated.avatar}`);
                    toast.show({
                        title: "Foto atualizada",
                        placement: "top",
                        bgColor: "green.500"
                    })
                } catch (error) {
                    const isAppError = error instanceof AppError
                    const title = isAppError ? error.message : "Não foi possivel atualizar os dados!"

                    toast.show({
                        title,
                        placement: "top",
                        bgColor: "red.500"
                    })
                }

            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingPhoto(false)
        }

    }

    return (
        <VStack flex={1}>
            <ScreenHeader title="Perfil" />
            <ScrollView>
                <Center mt={6} px={10}>
                    {
                        isLoadingPhoto ?
                            <Skeleton
                                w={33}
                                h={33}
                                startColor="gray.400"
                                endColor="gray.300"
                                rounded="full" />
                            :
                            <UserPhoto

                                alt="Imagem"
                                size={33}
                                source={{ uri: userPhoto }} />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" mt={5} mb={8} fontWeight="bold" fontSize="md">alterar foto </Text>
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                onChangeText={onChange}
                                placeholder="Nome"
                                bg="gray.600"
                                value={value}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChangeText={onChange}
                                placeholder="email"
                                isDisabled
                                bg="gray.600"
                            />
                        )}
                    />


                </Center>

                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2}> Alterar senha </Heading>

                    <Controller
                        control={control}
                        name="old_password"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChangeText={onChange}
                                bg="gray.600"
                                placeholder="senha antiga"
                                secureTextEntry
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChangeText={onChange}
                                bg="gray.600"
                                placeholder="nova senha"
                                secureTextEntry
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="confirm_password"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                value={value}
                                onChangeText={onChange}
                                bg="gray.600"
                                placeholder="confirme a senha"
                                secureTextEntry
                                errorMessage={errors.confirm_password?.message}
                            />
                        )}
                    />

                    <Button
                        title="Atualizar"
                        mt={4}
                        isLoading={isLoading}
                        onPress={handleSubmit(handleProfileUpdate)}
                    />
                </VStack>
            </ScrollView>
        </VStack>
    );
}