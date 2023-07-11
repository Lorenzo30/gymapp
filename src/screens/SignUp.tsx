import { VStack, Image, Text, Center, Heading, ScrollView,useToast } from "native-base";
import { api } from "@services/api";

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TextBase } from "react-native";
import { useForm, Controller } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import { useNavigation } from "@react-navigation/native";

import * as yup from "yup";
import axios from "axios";
import { AppError } from "@utils/AppError";

type FormDataProps = {
    name: string,
    email: string,
    password: string,
    password_confirm: string
}

const signUpSchema = yup.object({
    name: yup.string().required("Informe o nome"),
    email: yup.string().required("Primeiro informe o email").email("Email inválido"),
    password: yup.string().required("Informe a senha").min(6, "A senha deve ter pelo menos 6 digitos"),
    password_confirm: yup.string().required("Informe a confirmação de senha").oneOf([yup.ref('password')], "A confirmação da senha não confere")
})

export function SignUp() {
    const navigation = useNavigation();
    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    });

    const toast = useToast();

    function handleGoBack() {
        navigation.goBack();
    }

    async function handleSignUp({ name, email, password }: FormDataProps) {
        try {
            await api.post("/users", {
                name,
                email,
                password
            });
        } catch (error) {
           const isAppError = error instanceof AppError
           const title = isAppError ? error.message : 'Erro no servidor tente novamente mais tarde!';
           toast.show({
              title,
              placement:"top",
              bgColor:"red.500"
           });
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10}>
                <Image
                    source={BackgroundImg}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                    defaultSource={BackgroundImg}
                />

                <Center my={24}>
                    <LogoSvg />
                    <Text color="gray.100"> Treine sua mente e seu corpo</Text>
                </Center>


                <Center>
                    <Heading color="gray.100" fontSize="xl" fontFamily="heading">
                        Crie sua conta
                    </Heading>
                </Center>

                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            errorMessage={errors.name?.message}
                            placeholder="Nome"
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            errorMessage={errors.email?.message}
                            onChangeText={onChange}
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            errorMessage={errors.password?.message}
                            placeholder="password"
                            onChangeText={onChange}
                            secureTextEntry
                            value={value}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="password_confirm"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            errorMessage={errors.password_confirm?.message}
                            placeholder="confirm password"
                            onChangeText={onChange}
                            secureTextEntry
                            value={value}
                            onSubmitEditing={handleSubmit(handleSignUp)}
                            returnKeyType="send"
                        />
                    )}
                />

                <Button
                    title="Criar conta"
                    variant="outline"
                    onPress={handleSubmit(handleSignUp)}
                />
            </VStack>
        </ScrollView>
    );
}