import { Input as NativeBaseInput,IInputProps } from "native-base";

export function Input({...rest}:IInputProps){
    return (
        <NativeBaseInput 
            bg="gray.400"
            h={14}
            px={10}
            borderWidth={0}
            fontSize="md"
            fontFamily="body"
            mb={4}
            {...rest}
            _focus={{
                bg:"gray.400",
                borderWidth:"1px",
                borderColor:"green.500"
            }}
            placeholderTextColor="gray.300"
        />
    );
}