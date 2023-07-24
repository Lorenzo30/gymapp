import { useState } from "react";

import { VStack, Image, Text, Center, Heading, ScrollView,useToast } from "native-base";

import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"

import { AuthNavigatorRoutesProps } from "@routes/Auth.routes"

import LogoSvg from "@assets/logo.svg"
import BackgroundImg from "@assets/background.png"
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { TextBase } from "react-native";
import { useNavigation } from "@react-navigation/native"

import { useAuth } from "@hooks/useAuth";
import { useEffect } from "react";
import { AppError } from "@utils/AppError";

type FormData = {
    email: string,
    password: string
}

const validations = yup.object({
    email: yup.string().required("Digite o email"),
    password: yup.string().required("digite a senha")
});

export function SigIn() {
    const navigation = useNavigation<AuthNavigatorRoutesProps>();

    const [isLoading,setIsLoading] = useState(false);

    const toast = useToast();
    const {signIn,user} = useAuth();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validations)
    });

    async function handleSigIn({email,password}:FormData) {
       try {
         setIsLoading(true);
         await signIn(email,password);
       } catch (error) {
         const isAppError = error instanceof AppError
         const title = isAppError ? error.message : "Não foi possivel logar tente novamente mais tarde!"

         setIsLoading(false);

         toast.show({
            title,
            placement:"top",
            bgColor:"red.500"
         })
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
                        Acesse sua conta
                    </Heading>
                </Center>

                <Controller
                    name="email"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            placeholder="Email"
                            errorMessage={errors.email?.message}
                            onChangeText={onChange}
                            value={value}
                            keyboardType="email-address"
                            autoCapitalize="none" />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <Input
                            errorMessage={errors.password?.message}
                            placeholder="Senha"
                            onChangeText={onChange}
                            secureTextEntry
                            value={value}
                            autoCapitalize="none" />
                    )}
                />

                <Button 
                title="Acessar" 
                onPress={handleSubmit(handleSigIn)} 
                isLoading={isLoading}
                />

                <Center>
                    <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                        Ainda não tem acesso
                    </Text>
                </Center>

                <Button
                    title="Criar conta"
                    variant="outline"
                    onPress={() => navigation.navigate("SignUp")}
                />
            </VStack>
        </ScrollView>
    );
}