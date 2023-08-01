import { HStack,Heading,Text, VStack,Icon } from "native-base";
import {MaterialIcons} from "@expo/vector-icons"
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";


import userPhotoDefault from "@assets/userPhotoDefault.png";

export function HomeHeader(){

    const {user,signOut} = useAuth();

    return (
        <HStack bg="gray.600" pt={16} px={8} pb={5} alignItems="center">
            <UserPhoto 
                size={16} 
                source={user.avatar ? {uri:user.avatar} : userPhotoDefault} 
                alt="Imagem do usuario"
                mr={3}
            />
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">Olá</Text>
                <Heading color="gray.100" fontSize="md" fontFamily="heading">{user.name}</Heading>
            </VStack>

            <TouchableOpacity onPress={signOut}>
               <Icon as={MaterialIcons} name="logout" color="gray.200" size={7}/>
            </TouchableOpacity>
        </HStack>
    );
}