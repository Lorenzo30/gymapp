import { HistoryCard } from "@components/HistoryCard";
import { ScreenHeader } from "@components/ScreenHeader";
import { Center,Heading,Text, VStack } from "native-base";
import { SectionList } from "react-native";

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
         <ScreenHeader title="History" />
        
         <SectionList sections={exercises} keyExtractor={item => item} 
            renderItem={({item}) => (
                <HistoryCard />
            )}
            renderSectionHeader={({section}) => (
                <Heading color="gray.200" fontSize="md" mt={10} mb={3}>{section.title}</Heading>
            )}
         />
            
    </VStack>
    );
}