import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
// import RewardsScreen from "../screens/Rewards/RewardsScreen";
// import HistoryScreen from "../screens/History/HistoryScreen";
import CustomDrawerContent from "../components/drawer/CustomDrawerContent"
import BottomTabs from "./BottomTabs";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: { width: 280 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
        <Drawer.Screen name="Tabs" component={BottomTabs} />
      {/* <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
      {/* <Drawer.Screen name="Rewards" component={RewardsScreen} /> */}
      {/* <Drawer.Screen name="History" component={HistoryScreen} /> */}
    </Drawer.Navigator>
  );
}
