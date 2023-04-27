import { useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { SectionList } from "react-native";
import { Center, HStack, Text, VStack, FlatList, Heading } from "native-base";
import { ExerciseCard } from "@components/ExerciceCard";


export function Home() {

    const [groups, setGroups] = useState(['costa', 'ombro', 'biceps', 'tricpes']);
    const [groupSelected, setGrupSelected] = useState('costa');
    const [exercises,setExercises] = useState(["Puxada frontal","Triceps","3","4"]);

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                mt={10}
                maxH={10}
                mb={10}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{ px: 8 }}
                data={groups}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={groupSelected == item}
                        onPress={() => setGrupSelected(item)}
                    />
                )}
            />
            <VStack flex={1} px={8}>
                <HStack justifyContent="space-between" mb={5}>
                    <Heading color="gray.200" fontSize="md">Exercicios</Heading>
                    <Text color="gray.200" fontSize="sm" >4</Text>
                </HStack>
                <FlatList 
                    data={exercises}
                    keyExtractor={item => item}
                    renderItem={({item}) => (
                        <ExerciseCard />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{pb:20}}
                />
            </VStack>
        </VStack>
    );
}