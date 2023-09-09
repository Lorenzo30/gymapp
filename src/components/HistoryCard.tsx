import { HistoryDTO } from "@dtos/HistoryDTO";
import { HStack, Heading, Text, VStack } from "native-base";

type Props = {
    data:HistoryDTO;
}

export function HistoryCard({data}:Props){
    return (
        <HStack p={5} w="full" px={5} mb={3} bg="gray.600" rounded="md" alignItems="center" justifyContent="space-between">
            <VStack flex={1}>
                <Heading color="white" fontSize="sm" textTransform="capitalize">
                    {data.name}
                </Heading>
                <Text color="gray.100" fontSize="lg" numberOfLines={1}>
                    {data.group}
                </Text>
            </VStack>
            <Text color="gray.300" fontSize="md">
                {data.hour}
            </Text>
        </HStack>
    );
}