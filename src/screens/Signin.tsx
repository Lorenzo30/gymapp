import { VStack,Image, Text, Center, Heading,ScrollView} from "native-base";

import {AuthNavigatorRoutesProps} from "@routes/Auth.routes"

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TextBase } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SigIn(){

    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    function handleNewAccount(){
        navigation.navigate("SignUp");
    }
    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
        <VStack flex={1}  px={10}>
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
                Acesse sua conta
            </Heading>
        </Center>
       
       <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
       <Input placeholder="Senha" secureTextEntry/>

       <Button title="Acessar" onPress={handleNewAccount}/>

       <Center>
            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                Ainda não tem acesso
            </Text>
       </Center>
      
       <Button title="Criar conta" variant="outline"/>
        </VStack>
    </ScrollView>    
    );
}