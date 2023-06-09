import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme } from "native-base";

import { AuthRoutes } from "./Auth.routes";

import { AppRoutes } from "./App.routes";
import { AuthContext } from "@contexts/AuthContext";

export function Routes() {

    const contextData = useContext(AuthContext);
    console.log("Contexto => ",contextData);

    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    return (
        <NavigationContainer theme={theme}>
                <AuthRoutes />
        </NavigationContainer>
    );
}