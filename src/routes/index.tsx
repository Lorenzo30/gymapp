import { useContext } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme } from "native-base";

import { AuthRoutes } from "./Auth.routes";

import { AppRoutes } from "./App.routes";
import { AuthContext } from "@contexts/AuthContext";
import { useAuth } from "@hooks/useAuth";
import { Loading } from "@components/Loading";

export function Routes() {
    const {user,isLoadingUserStorageData} = useAuth();

    const { colors } = useTheme();
    const theme = DefaultTheme;
    theme.colors.background = colors.gray[700];

    if (isLoadingUserStorageData) {
        return (
            <Loading />
        )
    }

    return (
        <NavigationContainer theme={theme}>
               {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}