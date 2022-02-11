import React from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function Main({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/BlueRaspberry.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View>
          <Image
            style={styles.Logo}
            source={require("../assets/picture/Logo.png")}
          />
          <Text style={styles.Title}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.Titlebtn}>เข้าสู่ระบบ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Tcho}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.TitleRs}>สมัครสมาชิก</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
  Title: {
    fontFamily: "MitrExtraLight",
    fontSize: 30,
    color: "#FFFFFF",
    textAlign: "center",
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 15,
    margin: 20,
    borderRadius: 10,
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
