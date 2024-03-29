import { Center, Text, VStack, Icon, HStack, Heading, Image, Box, ScrollView, useToast } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons"
import { useNavigation,useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/App.routes";


import { Button } from "@components/Button";

import BodySvg from "@assets/body.svg"
import SeriesSvg from "@assets/series.svg"
import RepetionsSvg from "@assets/repetitions.svg"
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useEffect, useState } from "react";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";


type RouteParams = {
    exerciseId:string
}

export function Exercise() {
    const navigation = useNavigation<AppNavigatorRoutesProps>();
    const [exercise,setExercise] = useState<ExerciseDTO>({} as ExerciseDTO);
    const [isLoading,setIsLoading] = useState(true);
    const [sendingRegister,setSendingRegister] = useState(false);

    function handleGoBack() {
        navigation.goBack();
    }

    const toast = useToast();
    const route = useRoute();
    const {exerciseId} = route.params as RouteParams;

    
    async function fetchExercise(){
        setIsLoading(true);
        try {
          const response = await api.get(`/exercises/${exerciseId}`);
          setExercise(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel carregar o exercicio"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false);
        }
    }

    async function handleExerciseHistoryRegister(){
        setSendingRegister(true);
        try {
          await api.post("/history",{
            exercise_id:exerciseId
          })

          toast.show({
            title:"Parabéns",
            placement: "top",
            bgColor: "green.700"
        })

        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel registrar o historico do exercicio"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setSendingRegister(false);
        }
    }
    
    useEffect(() => {
        fetchExercise();
    },[exerciseId]);


    return (
        <VStack flex={1}>
            <VStack px={8} bg="gray.600" pt={12}>
                <TouchableOpacity onPress={() => handleGoBack()}>
                    <Icon as={Feather} name="arrow-left" color="green.500" size={6} />
                </TouchableOpacity>
                <HStack justifyContent="space-between" mt={4} mb={8} alignItems="center">
                    <Heading color="gray.100" fontSize="lg" flexShrink={1}>{exercise.name}</Heading>

                    <HStack alignItems="center">
                        <BodySvg />
                        <Text color="gray.200" ml={1} textTransform="capitalize">{exercise.group}</Text>
                    </HStack>
                </HStack>
            </VStack>


            <ScrollView>
                {isLoading ? <Loading /> : 
                <>
                <VStack p={8}>
                    <Image
                        w="full"
                        alt="imagem exercicio"
                        h={80}
                        resizeMode="cover"
                        rounded="lg"
                        source={{ uri:`${api.defaults.baseURL}/exercise/demo/${exercise.demo}` }} />
                </VStack>
                <Box bg="gray.600" rounded="md" pb={4} px={4}>
                    <HStack alignItems="center" justifyContent="space-around" mb={6} mt={5}>
                        <HStack>
                            <SeriesSvg />
                            <Text color="gray.200" ml={2}>{exercise.series}</Text>
                        </HStack>

                        <HStack>
                            <RepetionsSvg />
                            <Text color="gray.200" ml={2}>{exercise.repetitions}</Text>
                        </HStack>
                    </HStack>
                    <Button 
                        title="Marcar como resolvido" 
                        isLoading={sendingRegister} 
                        onPress={handleExerciseHistoryRegister}    
                    />
                </Box>
                </>
                }
            </ScrollView>

        </VStack>
    );
}