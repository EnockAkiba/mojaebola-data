import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../../screens/Onboarding/Onboarding";

const Stack = createNativeStackNavigator();

export default function OnboardingStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Onboarding" component={Onboarding} />
        </Stack.Navigator>
    );
}