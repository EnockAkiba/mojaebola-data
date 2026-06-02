import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import Onboarding from "../screens/Onboarding/Onboarding";
import PublicHomeScreen from "../screens/home/PublicHomeScreen";
import AboutScreen from "../screens/info/AboutScreen";

import DrawerNavigator from "./DrawerNavigator";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    const [loading, setLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

    useEffect(() => {
        const checkAppState = async () => {
            try {
                const token = await AsyncStorage.getItem("@token");
                const seen = await AsyncStorage.getItem("hasSeenOnboarding");

                setIsAuth(!!token);
                setHasSeenOnboarding(seen === "true");
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        checkAppState();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>

                    {/* 1. FIRST OPEN */}
                    {!hasSeenOnboarding && (
                        <Stack.Screen name="Onboarding" component={Onboarding} />
                    )}

                    {/* 2. AUTHENTICATED USER */}
                    {hasSeenOnboarding && isAuth && (
                        <Stack.Screen name="Main" component={DrawerNavigator} />
                    )}

                    {/* 3. NOT AUTHENTICATED BUT APP USED */}
                    {hasSeenOnboarding && !isAuth && (
                        <Stack.Screen name="PublicHome" component={PublicHomeScreen} />
                    )}
                    <Stack.Screen name="AboutScreen" component={AboutScreen} />

                    {/* AUTH SCREENS (accessible depuis PublicHome ou navigation interne) */}
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="Register" component={RegisterScreen} />

                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
    );
}