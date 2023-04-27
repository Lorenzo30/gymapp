import { HStack,Heading,Text, VStack,Icon } from "native-base";
import {MaterialIcons} from "@expo/vector-icons"
import { UserPhoto } from "./UserPhoto";
import { TouchableOpacity } from "react-native";


export function HomeHeader(){
    return (
        <HStack bg="gray.600" pt={16} px={8} pb={5} alignItems="center">
            <UserPhoto size={16} source={{uri:"https://media.seudinheiro.com/uploads/2023/01/Blazer-EV-foto-Chevrolet.jpg"}} alt="Imagem do usuario"/>
            <VStack flex={1}>
                <Text color="gray.100" fontSize="md">Olá</Text>
                <Heading color="gray.100" fontSize="md">Lorenzo</Heading>
            </VStack>

            <TouchableOpacity>
               <Icon as={MaterialIcons} name="logout" color="gray.200" size={7}/>
            </TouchableOpacity>
        </HStack>
    );
}