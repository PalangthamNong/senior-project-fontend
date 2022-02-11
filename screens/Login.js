import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiURL } from "../environment";
import { LoginAuth } from "../services/auth.service";
export default function Login({ navigation }) {
  const [authData, seTauthData] = useState({ id: "", password: "" });
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const logger = async () => {
    console.log(await AsyncStorage.getItem("user"));
  };
  useEffect(() => {
    logger()
  }, []);
  useEffect(() => {
    console.log(authData);
  }, [authData]);
  function login() {
    LoginAuth(authData.id, authData.password)
      .then((r) => {
        if (r.status === 200) {
          if (r.data?.data?.StatusPass == 1) {
            if (r.data?.data?.Posittions_ID == 0) {
              AsyncStorage.setItem("user", JSON.stringify(r.data.data));
              navigation.navigate("Home");
            }
            if (r.data?.data?.Posittions_ID == 1) {
              AsyncStorage.setItem("user", JSON.stringify(r.data.data));
              navigation.navigate("Home");
            }
          }
          if (r.data?.data?.StatusPass == 2) {
            AsyncStorage.setItem("user", JSON.stringify(r.data.data));
            navigation.navigate("Home2");
          }

          if (r.data?.data?.ID_User == "Admin") {
            AsyncStorage.setItem("user", JSON.stringify(r.data.data));
            navigation.navigate("Home2");
          } else {
            // navigation.navigate("UserMain");
            // alert("เกิดข้อผิดพลาดโปรดกรอกข้อมูลใหม่อีกครั้ง");
          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/BlueRaspberry.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Image
            style={styles.Logo}
            source={require("../assets/picture/Logo.png")}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => seTauthData({ ...authData, id: text })}
            placeholderTextColor="#fff"
            placeholder="รหัสประจำตัว"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              seTauthData({ ...authData, password: text })
            }
            placeholderTextColor="#fff"
            placeholder="รหัสผ่าน"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={() => login()}>
            <Text style={styles.Titlebtn}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home2")}
          >
            <Text style={styles.Titlebtn}>เข้าสู่ระบบ(Admin)</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.Tcho}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.TitleRs}>ย้อนกลับ</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  Logo: {
    width: 350,
    height: 350,
    opacity: 0.9,
  },
  image: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 0,
    borderColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 15,
    margin: 20,
    borderRadius: 10,
    width: 330,
  },
  Titlebtn: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  TitleRs: {
    fontSize: 20,
    color: "#ffff",
    textDecorationLine: "underline",
    fontFamily: "MitrExtraLight",
  },
  Tcho: {
    justifyContent: "center",
    alignItems: "center",
  },
});
