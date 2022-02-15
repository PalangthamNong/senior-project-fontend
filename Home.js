import React, { useEffect, useState } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import MainRateEmployees from "./screens/MainRateEmployees";
import UserManual from "./screens/test";
import ShowEditUser from "./screens/ShowEditUser";
import UserMain from "./screens/UserMain";

import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Switch, Text, View } from "react-native";
import { UpdateUser } from "./services/auth.service";
import { FindUser } from "./services/user.service";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const [user, setUser] = useState({});
  function logout() {
    AsyncStorage.removeItem("user");
    props.navigation.navigate("Login");
  }
  const fetchUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };

  useEffect(() => {
    fetchUser();
  }, []);
  useEffect(() => {
    FindUser(user?.ID_User).then((result) => {
      console.log(result.data.notifyStatus == 0 ? true : false);
      setIsShown(result.data.notifyStatus == 0 ? true : false);
    });
  }, [user]);
  const [isShown, setIsShown] = useState(false);
  function UpdateNotify() {
    setIsShown(!isShown);
    UpdateUser(user.ID_User, { notifyStatus: isShown ? 1 : 0 }).then(() => {
      Alert.alert(isShown ? "เปิดการแจ้งเตือน" : "ปิดการแจ้งเตือน");
    });
  }
  return (
    <DrawerContentScrollView
      contentContainerStyle={{ height: "100%" }}
      {...props}
    >
      <DrawerItemList {...props} />
      <DrawerItem
        label="LogOUT"
        onPress={logout}
        icon={({ focused, size }) => (
          <Icon size={size} color="#00B4DB" name="arrow-circle-o-left" />
        )}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          bottom: "2%",
          position: "absolute",
        }}
      >
        <View
          style={{
            width: "30%",
            alignItems: "center",
          }}
        >
          <View style={{}}>
            <Switch
              trackColor={{ false: "#ADD8E6", true: "#ADD8E6" }}
              thumbColor={isShown ? "#ddd" : "#ddd"}
              ios_backgroundColor="#ADD8E6"
              onValueChange={UpdateNotify}
              value={!isShown}
            />
          </View>
        </View>
        <View
          style={{
            width: "50%",
            alignItems: "flex-start",

            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#696969" }}>Notifications</Text>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

export default function Home() {
  return (
    <Drawer.Navigator
      // initialRouteName="UserMain"
      initialRouteName="UserMain"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
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
