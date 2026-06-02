import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";
// import CustomDrawerContent from "../components/drawer/CustomDrawerContent";
// import NotificationScreen from '../screens/Notifications/NotificationScreen';
// import ProfileScreen from "../screens/Profile/ProfileScreen";
const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {

  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
    //   drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={BottomTabs} />
      {/* <Drawer.Screen name="Notifications" component={NotificationScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} /> */}

    </Drawer.Navigator>
  );
}

