import { createBottomTabNavigator,BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Platform } from "react-native";
import { useTheme } from "native-base";
import { Home } from "@screens/Home";
import { Exercise } from "@screens/Exercise";
import { History } from "@screens/History"
import {Profile } from "@screens/Profile";

import HomeSvg from "@assets/home.svg";
import HistorySvg from "@assets/history.svg";
import ProfileSvg from "@assets/profile.svg";


type AppRoutes = {
    Home:undefined,
    Exercise:undefined,
    Profile:undefined,
    History:undefined
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>

const {Navigator,Screen} = createBottomTabNavigator<AppRoutes>();

export function AppRoutes(){

    const {sizes,colors} = useTheme();
    const iconSize = sizes[6];

    return (
        <Navigator screenOptions={{
            headerShown:false,
            tabBarShowLabel:false,
            tabBarActiveTintColor:colors.green[700],
            tabBarStyle:{
                backgroundColor:colors.gray[600],
                borderTopWidth:0,
                height:Platform.OS == "android" ? "auto" : 96,
                paddingBottom:sizes[10],
                paddingTop:sizes[6]
            }
        }}>
            <Screen  name="Home" component={Home} options={{
                tabBarIcon:({color}) => (
                    <HomeSvg fill={color} width={iconSize} height={iconSize} />
                )
            }}/>
            <Screen  name="History" component={History} 
             options={{
                tabBarIcon:({color}) => (
                    <HistorySvg fill={color} width={iconSize} height={iconSize} />
                )
            }}
            />
            <Screen  name="Profile" component={Profile} 
             options={{
                tabBarIcon:({color}) => (
                    <ProfileSvg fill={color} width={iconSize} height={iconSize} />
                )
            }}
            />
            <Screen  name="Exercise" options={{tabBarButton:() => null}} component={Exercise}/>
        </Navigator>
    );
}