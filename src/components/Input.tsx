import { Input as NativeBaseInput,IInputProps,FormControl } from "native-base";

type Props = IInputProps & {
 errorMessage?:string | null
}

export function Input({errorMessage = null,isInvalid,...rest}:Props){

    const Invalid = !!errorMessage || isInvalid;

    return (
      <FormControl isInvalid={Invalid}  mb={4}>
        <NativeBaseInput 
            bg="gray.400"
            color="white"
            h={14}
            px={10}
            borderWidth={0}
            fontSize="md"
            isInvalid={Invalid}
            _invalid={{
                borderWidth:1,
                borderColor:"red.500"
            }}
            fontFamily="body" 
            {...rest}
            _focus={{
                bg:"gray.400",
                borderWidth:"1px",
                borderColor:"green.500"
            }}
            placeholderTextColor="gray.300"
        />

        <FormControl.ErrorMessage> 
            {errorMessage}
        </FormControl.ErrorMessage>
    </FormControl>
    );
}