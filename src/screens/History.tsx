import { useCallback, useEffect, useState } from "react";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center,Heading,Text, VStack,SectionList,Toast, useToast} from "native-base";
import { AppError } from "@utils/AppError";
import { api } from "@services/api";
import { useFocusEffect } from "@react-navigation/native";
import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";


export function History(){

    const [isLoading,setIsLoading] = useState(true); 
    const [exercises,setExercises] = useState<HistoryByDayDTO[]>([]);

    const toast = useToast();

    async function fetchHistory () {
        try {
            setIsLoading(true);
            const response = await api.get("/history");
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel carregar historico"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchHistory();
    },[]))

    return (
    <VStack>
         <ScreenHeader title="Historico de exercicios" />
        
         <SectionList sections={exercises} keyExtractor={item => item.id} 
            renderItem={({item}) => (
                <HistoryCard data={item}/>
            )}
            renderSectionHeader={({section}) => (
                <Heading color="gray.200" fontSize="md" mt={10} mb={3}>{section.title}</Heading>
            )}
            px={5}
            contentContainerStyle={exercises.length == 0 && {flex:1,justifyContent:"center"}}
            ListEmptyComponent={() => (
                <Text color="white" textAlign="center">
                    Não a exercicios ainda {'\n'}
                    vamos treinar hoje
                </Text>
            )}
            showsVerticalScrollIndicator={false}
         />
            
    </VStack>
    );
}