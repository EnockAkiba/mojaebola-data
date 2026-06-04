import { useContext, useEffect, useState } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingStack from "./stacks/OnboardingStack";
import PublicStack from "./stacks/PublicStack";
import PrivateStack from "./stacks/PrivateStack";
import { AuthContext } from "../context/AuthContext";
import { subscribe } from "../utils/eventBus";

export default function RootNavigator() {
    const { isAuth, loading } = useContext(AuthContext);

    const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

    useEffect(() => {
        const check = async () => {
            try {
                const seen = await AsyncStorage.getItem("hasSeenOnboarding");

                setHasSeenOnboarding(seen === "true");
            } catch (e) {
                console.log("Erreur onboarding :", e);

                // important
                setHasSeenOnboarding(false);
            }
        };

        check();
        // subscribe to onboarding events so we can update navigation immediately
        const unsub = subscribe('onboardingSeen', (val) => {
            setHasSeenOnboarding(!!val);
        });

        return () => unsub();
    }, []);
    console.log("loading =", loading);
    console.log("hasSeenOnboarding =", hasSeenOnboarding);
    console.log("isAuth =", isAuth);
    if (loading || hasSeenOnboarding === null) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <ActivityIndicator size="large" />
                <Text>Chargement...</Text>
            </View>
        );
    }

    if (!hasSeenOnboarding) {
        return <OnboardingStack />;
    }

    if (isAuth) {
        return <PrivateStack />;
    }

    return <PublicStack />;
}