import { NavigationContainer,DefaultTheme } from "@react-navigation/native";
import { useTheme } from "native-base";
import { AuthRoutes } from "./Auth.routes";
import { AppRoutes } from "./App.routes";

export function Routes(){

    const {colors} = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    return (
        <NavigationContainer theme={theme}>
            <AuthRoutes />
        </NavigationContainer>
    );
}