import { useCallback, useEffect, useState } from "react";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { SectionList } from "react-native";
import { Center, HStack, Text, VStack, FlatList, Heading, useToast } from "native-base";
import { ExerciseCard } from "@components/ExerciceCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { api } from "@services/api"

import { AppNavigatorRoutesProps } from "@routes/App.routes"
import { apiTeste } from "@services/api_teste";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";


export function Home() {

    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState<string[]>();
    const [groupSelected, setGrupSelected] = useState('costa');
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])

    const toast = useToast();

    const navigation = useNavigation<AppNavigatorRoutesProps>();

    function handleOpenExerciseDetails(exerciseId:string) {
        navigation.navigate("Exercise",{exerciseId})
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups');
            setGroups(response.data);
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel carregar os grupos"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        }
    }

    async function fetchExercisesByGroup() {
        setIsLoading(true);
        try {
            const exercices = await api.get(`exercises/bygroup/${groupSelected}`);
            const dataExercises = exercices.data;
            setExercises(dataExercises);
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : "Não foi possivel carregar os exercicios"
            toast.show({
                title,
                placement: "top",
                bgColor: "red.500"
            })
        } finally {
            setIsLoading(false);
        }
    }



    useEffect(() => {
        fetchGroups();
    }, []);

    useFocusEffect(useCallback(() => {
        fetchExercisesByGroup();
    }, [groupSelected]))

    return (
        <VStack flex={1}>
            <HomeHeader />
            <FlatList
                mt={10}
                minH={10}
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
            {
                isLoading ? <Loading /> :
                    <VStack flex={1} px={8}>
                        <HStack justifyContent="space-between" mb={5}>
                            <Heading color="gray.200" fontSize="md">Exercicios</Heading>
                            <Text color="gray.200" fontSize="sm" >4</Text>
                        </HStack>
                        <FlatList
                            data={exercises}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
                                <ExerciseCard
                                    data={item}
                                    onPress={() => handleOpenExerciseDetails(item.id)}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                            _contentContainerStyle={{ pb: 20 }}
                        />
                    </VStack>
            }
        </VStack>
    );
}