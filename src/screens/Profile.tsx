import { ScreenHeader } from "@components/ScreenHeader";
import { UserPhoto } from "@components/UserPhoto";
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";
import { TouchableOpacity } from "react-native";

import { Button } from "@components/Button";
import { Input } from "@components/Input";

export function Profile() {

    const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

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
                                source={{ uri: "https://media.seudinheiro.com/uploads/2023/01/Blazer-EV-foto-Chevrolet.jpg" }} />
                    }

                    <TouchableOpacity>
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