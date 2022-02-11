import axios from "axios";
import React, { useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiURL } from "../environment";
export default function ShowEditUser({ navigation }) {
  const [number, onChangeNumber] = React.useState(null);
  function Search() {
    console.log("search:", number);
    axios
      .get(`${apiURL}/find-users`, { params: { id: number } })
      .then((r) => {
        if (r.status === 200) {
          navigation.navigate("ShowEditUserAdmin", {
            data: r.data,
          });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/Clouds.jpg")}
        resizeMode="cover"
        style={styles.Background}
      >
        <ScrollView>
          {/* <Image
            style={{
              position: "absolute",
              width: 650,
              height: 650,
              marginTop: 50,
              opacity: 0.1,
              marginRight: 100,
            }}
            resizeMode="contain"
            source={require("../assets/picture/LogoBule.png")}
          /> */}
          <View style={styles.Narbar}>
            <View style={{ width: "90%" }}>
              <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
            </View>
            <View style={{  }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={styles.Narbarimg}
                  source={require("../assets/picture/back-button.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.Header}>
            <Image
              style={styles.Headerimg}
              source={require("../assets/picture/profile.png")}
            />
            <Text style={styles.HeaderText}>จัดการข้อมูลพนักงานแคดดี้</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={styles.userimg}
              source={require("../assets/picture/LogoBule.png")}
            />
            <View>
              <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={number}
                placeholder="หมายเลขประจำตัว"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.countContainer}></View>
            <TouchableOpacity style={styles.button} onPress={Search}>
              <Text style={styles.Txtbutton}>ค้นหา</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Background: {
    flex: 1,
  },
  Narbar: {
    flexDirection: "row",
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    width: "100%",
  },
  Narbarimg: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
  },
  Narbartext: {
    fontSize: 25,
    fontFamily: "MitrExtraLight",
    marginLeft: 10,
    margin: 10,
    color: "#00B4DB",
  },
  Header: {
    flexDirection: "row",
    marginLeft: 10,
    margin: 10,
  },
  Headerimg: {
    width: 20,
    height: 20,
    marginTop: 5,
    margin: 5,
  },

  HeaderText: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  userimg: {
    width: 250,
    height: 250,
    marginVertical: 30,
    marginTop: 30,
  },
  input: {
    height: 45,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 250,
    borderColor: "#00B4DB",
    borderRadius: 5,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#00B4DB",
    padding: 10,
    width: 250,
  },
  countContainer: {
    alignItems: "center",
    padding: 10,
  },
  Txtbutton: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "MitrExtraLight",
  },
});
