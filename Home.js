import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import MainRateEmployees from "./screens/MainRateEmployees";
import UserManual from "./screens/test";
import ShowEditUser from "./screens/ShowEditUser";
import UserMain from "./screens/UserMain";


import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();
function CustomDrawerContent(props) {
  function logout() {
    AsyncStorage.removeItem("user");
    props.navigation.navigate('Login')
  }
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="LogOUT"
        onPress={logout}
        icon={({ focused, size }) => (
          <Icon size={size} color="#00B4DB" name="arrow-circle-o-left" />
        )}
      />
    </DrawerContentScrollView>
  );
}
export default function Home() {
  return (
    <Drawer.Navigator
      // initialRouteName="UserMain"
      initialRouteName="UserMain"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="UserMain"
        component={UserMain}
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="home" />
          ),
        }}
      />
      <Drawer.Screen
        name="MainRateEmployees"
        component={MainRateEmployees}
        options={{
          title: "MainRateEmployees",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="star" />
          ),
        }}
      />
      
        <Drawer.Screen
        name="EditUser"
        component={ShowEditUser}
        options={{
          title: "EditUser",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="edit" />
          ),
        }}
      />
      <Drawer.Screen
        name="UserManual"
        component={UserManual}
        options={{
          title: "UserManual",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="book" />
          ),
        }}
      />
      
    </Drawer.Navigator>
  );
}
