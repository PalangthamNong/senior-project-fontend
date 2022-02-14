import * as React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import RateEmployees from "./screens/RateEmployees";
import AdminMain from "./screens/AdminMain";
import ConfirmAccessUser from "./screens/ConfirmAccessUser";
import MainRateEmployees from "./screens/MainRateEmployees";
import  RateEmployeesAdmin  from "./screens/RateEmployeesAdmin";
import  RateEmployeesAdminDetails  from "./screens/RateEmployeesAdminDetails";
import UserManual from "./screens/test";
import ShowEditUser from "./screens/ShowEditAdmin";
import SearchEditUserAdmin from "./screens/SearchEditUserAdmin";
import MainStatistics from "./screens/MainStatistics";
import Login from "./screens/Login";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  function logout() {
    AsyncStorage.removeItem("user");
    props.navigation.navigate("Login");
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

export default function Home2() {
  return (
    <Drawer.Navigator
      // initialRouteName="UserMain"
      initialRouteName="AdminMain"
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="AdminMain"
        component={AdminMain}
        options={{
          title: "Home",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="home" />
          ),
        }}
      />
      <Drawer.Screen
        name="MainStatistics"
        component={MainStatistics}
        options={{
          title: "Statistics",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="database" />
          ),
        }}
      />
      <Drawer.Screen
        name="ConfirmAccessUser"
        component={ConfirmAccessUser}
        options={{
          title: "ConfirmAccessUser",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="check-square-o" />
          ),
        }}
      />
      <Drawer.Screen
        name="SearchEditUserAdmin"
        component={SearchEditUserAdmin}
        options={{
          title: "EditUserAdmin",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="search" />
          ),
        }}
      />
      <Drawer.Screen
        name="ShowEditUser"
        component={ShowEditUser}
        options={{
          title: "EditUser",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="edit" />
          ),
        }}
      />
     
      <Drawer.Screen
        name="RateEmployeesAdmin"
        component={RateEmployeesAdmin}
        options={{
          title: "RateEmployeesAdmin",
          drawerIcon: ({ focused, size }) => (
            <Icon size={size} color="#00B4DB" name="sort-amount-desc" />
          ),
        }}
      />
     
      
    </Drawer.Navigator>
  );
}
