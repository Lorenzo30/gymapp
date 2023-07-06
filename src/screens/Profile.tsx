import * as ImagePicker from "expo-image-picker"

import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, Alert, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import {useState} from "react"
import { Button } from "@components/Button";
import { Input } from "@components/Input";

import * as FileSystem from "expo-file-system"

export function Profile() {

    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);
    const [userPhoto,setUserPhoto] = useState("");

    const toast = useToast();

    async function handleUserPhotoSelect(){
        setIsLoadingPhoto(true);
        try {
            const photoSelected = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                quality:1,
                aspect:[4,4],
                allowsEditing:true
            });
            
            if (photoSelected.canceled) {
                return;
            }

            if (photoSelected.assets[0].uri) {
                const photoInfo = await FileSystem.getInfoAsync(photoSelected.assets[0].uri)
                if(photoInfo.size && (photoInfo.size / 1024 / 1024 ) > 0){
                   return toast.show(
                    {title:"Essa imagem passa o tamanho maximo de 1mb",
                     placement:"top",
                     bgColor:"red.500"
                    }
                    )
                } 
                setUserPhoto(photoSelected.assets[0].uri)
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
                                source={{ uri:userPhoto }} />
                    }

                    <TouchableOpacity onPress={handleUserPhotoSelect}>
                        <Text color="green.500" mt={5} mb={8} fontWeight="bold" fontSize="md">alterar foto </Text>
                    </TouchableOpacity>

                    <Input placeholder="Nome" bg="gray.600" />
                    <Input placeholder="email" isDisabled bg="gray.600" />
                </Center>
                
                <VStack px={10} mt={12} mb={9}>
                    <Heading color="gray.200" fontSize="md" mb={2}> Alterar senha </Heading>
                    <Input bg="gray.600" placeholder="senha antiga" secureTextEntry/>
                    <Input bg="gray.600" placeholder="Nova senha" secureTextEntry/>
                    <Input bg="gray.600" placeholder="Confirme a senha nova" secureTextEntry/>
                    <Button title="Atualizar" mt={4}/>
                </VStack>
            </ScrollView>
        </VStack>
    );
}