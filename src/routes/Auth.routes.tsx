import { createNativeStackNavigator,NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SigIn } from "@screens/Signin";
import { SignUp } from "@screens/SignUp";


type AuthRoutes =  {
signIn:undefined,
SignUp:undefined
}

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>

const {Navigator,Screen} = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
    return (
        <Navigator screenOptions={{
            headerShown:false
        }}>
            <Screen name="signIn" 
            component={SigIn}/>

            <Screen name="SignUp" 
            component={SignUp}/>
        </Navigator>
    );
}