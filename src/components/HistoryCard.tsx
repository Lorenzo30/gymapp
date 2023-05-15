import { HStack, Heading, Text, VStack } from "native-base";

export function HistoryCard(){
    return (
        <HStack p={5} w="full" px={5} mb={3} bg="gray.600" rounded="md" alignItems="center" justifyContent="space-between">
            <VStack>
                <Heading color="white" fontSize="sm" textTransform="capitalize">
                    Costas
                </Heading>
                <Text color="gray.100" fontSize="lg" numberOfLines={1}>
                    Puxada frontal
                </Text>
            </VStack>
            <Text color="gray.300" fontSize="md">
                08:56
            </Text>
        </HStack>
    );
}