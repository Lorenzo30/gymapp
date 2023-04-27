import { VStack,Image, Text, Center, Heading,ScrollView} from "native-base";

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TextBase } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function SignUp(){

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.goBack();
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
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
       
       <Input placeholder="Nome"/>
       <Input placeholder="Email" keyboardType="email-address" autoCapitalize="none"/>
       <Input placeholder="Senha" secureTextEntry/>

       <Button title="Criar conta" variant="outline"/>
        </VStack>
    </ScrollView>    
    );
}