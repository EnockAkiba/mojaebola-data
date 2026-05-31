import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PublicTabs from "../PublicTabs";
import ArticleDetailScreen from "../../screens/articles/ArticleDetailScreen";

const Stack = createNativeStackNavigator();

export default function PublicStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="publicTabs" component={PublicTabs} />
            <Stack.Screen
                name="ArticleDetailScreen"
                component={ArticleDetailScreen}
            />
        </Stack.Navigator>
    );
}