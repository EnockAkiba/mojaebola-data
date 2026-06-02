import React from "react";
import { useColorScheme } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from '@react-native-vector-icons/ionicons';

import InfoScreen from "../screens/info/InfoScreen";
import RiskZonesScreen from "../screens/risk/RiskZonesScreen";

import { LightTheme, DarkTheme } from "../config/Theme";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
    const scheme = useColorScheme();
    const theme = scheme === "dark" ? DarkTheme : LightTheme;

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarStyle: {
                    backgroundColor: theme.colors.card,
                    borderTopColor: theme.colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={InfoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                    tabBarLabel: "Accueil",
                }}
            />

            <Tab.Screen
                name="RiskZonesScreen"
                component={RiskZonesScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="swap-horizontal-outline" size={size} color={color} />
                    ),
                    tabBarLabel: "zones ",
                }}
            />

        </Tab.Navigator>
    );
}
