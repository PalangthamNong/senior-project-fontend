import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Loading from "./screens/Loading";
import Login from "./screens/Login";
import RateEmployees from "./screens/RateEmployees";
import Main from "./screens/Main";
import Signup from "./screens/Signup";
import PendingApproval from "./screens/PendingApproval";
import MainRateEmployees from "./screens/MainRateEmployees";
import Workstatistics from "./screens/Workstatistics";
import DetailsWorkstatistics from "./screens/CalenderTestcopy";
import AdminMain from "./screens/AdminMain";
import MainStatistics from "./screens/MainStatistics";
import Statistics from "./screens/Statistics";
// import CalenderJob from "./screens/CalenderTestcopy";
import NewEditUsers from "./screens/NewEditUsers2";
import NewEditAdmin from "./screens/NewEditUsers";

import UserManual from "./screens/test";
import UserManual2 from "./screens/test2";
import AppLoading from "expo-app-loading";

// import CalenderTestc from "./screens/CalenderTestcopy";

import Carouselwood from "./screens/Carouselwood";
import Carouselwoods from "./screens/Carouselwoods";
import UserMain from "./screens/UserMain";
import ShowEditUser from "./screens/ShowEditUser";
import ShowEditAdmin from "./screens/ShowEditAdmin";
import ShowEditUserAdmin from "./screens/ShowEditUserAdmin";

import SearchEditUserAdmin from "./screens/SearchEditUserAdmin";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RateEmployeesAdmin from "./screens/RateEmployeesAdmin";
import RateEmployeesAdminDetails from "./screens/RateEmployeesAdminDetails";
import * as Font from "expo-font";
import Test from "./screens/test";
import Home from "./Home";
import Home2 from "./Home2";
import ConfirmAccessUser from "./screens/ConfirmAccessUser";
import GetNumber from "./screens/GetNumber";
import CalenderTestcopy from "./screens/CalenderTestcopy";
const Stack = createNativeStackNavigator();
const getFonts = () =>
  Font.loadAsync({
    MitrExtraLight: require("./assets/fonts/Mitr/Mitr-Light.ttf"),
  });
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  if (!fontsLoaded) {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => setFontsLoaded(true)}
      ></AppLoading>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="RateEmployees"
          // initialRouteName="GetNumber"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="Test" component={Test} />
          <Stack.Screen name="CalenderTestcopy" component={CalenderTestcopy} />
          <Stack.Screen name="Carouselwood" component={Carouselwood} />
          <Stack.Screen name="RateEmployees" component={RateEmployees} />
          <Stack.Screen name="MainStatistics" component={MainStatistics} />
          <Stack.Screen name="Statistics" component={Statistics} />
          <Stack.Screen
            name="MainRateEmployees"
            component={MainRateEmployees}
          />
          <Stack.Screen name="ShowEditUser" component={ShowEditUser} />
          <Stack.Screen name="ShowEditAdmin" component={ShowEditAdmin} />
          <Stack.Screen name="NewEditUsers" component={NewEditUsers} />
          <Stack.Screen name="NewEditAdmin" component={NewEditAdmin} />
          
          {/* <Stack.Screen name="CalenderJob" component={CalenderJob} /> */}
          <Stack.Screen name="Carouselwoods" component={Carouselwoods} />
          <Stack.Screen name="ConfirmAccessUser" component={ConfirmAccessUser} />
          <Stack.Screen name="UserManual" component={UserManual} />
          <Stack.Screen name="UserManual2" component={UserManual2} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Home2" component={Home2} />

          <Stack.Screen name="AdminMain" component={AdminMain} />
          <Stack.Screen
            name="RateEmployeesAdminDetails"
            component={RateEmployeesAdminDetails}
          />
          <Stack.Screen
            name="RateEmployeesAdmin"
            component={RateEmployeesAdmin}
          />
          <Stack.Screen
            name="ShowEditUserAdmin"
            component={ShowEditUserAdmin}
          />

          <Stack.Screen name="GetNumber" component={GetNumber} />
          {/* <Stack.Screen name="UserMain" component={UserMain} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
