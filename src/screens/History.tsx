import { useState } from "react";

import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center,Heading,Text, VStack,SectionList } from "native-base";


export function History(){

    const [exercises,setExercises] = useState([
        {
            title:"24/06/2022",
            data:['puxada frontal','remada unilateral']
        },
        {
            title:"25/06/2022",
            data:['puxada frontal','remada unilateral']
        }
    ]);

    return (
    <VStack>
         <ScreenHeader title="Historico de exercicios" />
        
         <SectionList sections={exercises} keyExtractor={item => item} 
            renderItem={({item}) => (
                <HistoryCard />
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