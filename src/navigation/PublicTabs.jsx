import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@react-native-vector-icons/ionicons";

import PublicHomeScreen from "../screens/home/PublicHomeScreen";
import RiskZonesScreen from "../screens/risk/RiskZonesScreen";
// import ReportCaseScreen from "../screens/report/ReportCaseScreen";
import InfoScreen from "../screens/info/InfoScreen";
// import ArticleDetailScreen from "../screens/articles/ArticleDetailScreen";
import AboutScreen from "../screens/info/AboutScreen";

const Tab = createBottomTabNavigator();

export default function PublicTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: "#D64545",
                tabBarInactiveTintColor: "#999",

                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === "Home") iconName = "home";
                    else if (route.name === "RiskZones") iconName = "map";

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={PublicHomeScreen} />
            <Tab.Screen
                name="Info"
                component={InfoScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="book" size={size} color={color} />
                    ),
                    tabBarLabel: "Info",
                }}
            />
            <Tab.Screen name="RiskZones" component={RiskZonesScreen} />


            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" size={size} color={color} />
                    ),
                    tabBarLabel: "À propos",
                }}
            />

        </Tab.Navigator>
    );
}