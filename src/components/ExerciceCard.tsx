import { HStack,Heading,Image, VStack,Text,Icon } from "native-base";
import { TouchableOpacity,TouchableOpacityProps } from "react-native";
import {Entypo} from "@expo/vector-icons"


type Props = TouchableOpacityProps & {

}

export function ExerciseCard({...rest}:Props){
    return (
        <TouchableOpacity {...rest}>
          <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
             <Image 
                source={{uri:"https://www.origym.com.br/upload/remada-unilateral-3.png"}}
                alt="imagem exerciso"
                w={16}
                h={16}
                rounded="md"
                mr={4}
                resizeMode="cover"
                />
          
          <VStack flex={1}>
             <Heading fontSize="lg" color="white">Remada unilateral</Heading>
             <Text fontSize="sm" numberOfLines={2} color="gray.200">3 x 12 repetições </Text>
          </VStack>

            <Icon as={Entypo} name="chevron-thin-right" color="gray.300"/>
          </HStack>
        </TouchableOpacity>
    );
}