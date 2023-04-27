import { Button as ButtonNative,IButtonProps,Text } from "native-base"

type Props = IButtonProps & {
title:string,
variant?:"solid" | "outline"
}

export function Button ({title,variant = "solid",...rest}:Props) {
    return (
        <ButtonNative {...rest} w="full" h={14} 
            bg={variant == "outline" ? "transparent" : "green.700"} 
            borderWidth={variant == "outline" ? 1 : 0}
            borderColor="green.500"
            _pressed={{
            bg:"green.300"
        }}>
            <Text color="white" fontFamily="heading" fontSize="sm" rounded="full"
            >{title}</Text>
        </ButtonNative>
    )
}