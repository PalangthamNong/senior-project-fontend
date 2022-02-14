import React, { useEffect, useState } from "react";
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
import { apiURL } from "../environment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
export default function ShowEditUser({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/picture/Clouds.jpg")}
          resizeMode="cover"
          style={styles.Background}
        >
          <Image
            style={{
              position: "absolute",
              width: 650,
              height: 650,
              marginTop: 50,
              opacity: 0.05,
              marginRight: 100,
            }}
            resizeMode="contain"
            source={require("../assets/picture/LogoBule.png")}
          />
          <View style={styles.Narbar}>
            <View style={{ flex: 1 }}>
              <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate("AdminMain")}>
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
            <Text style={styles.HeaderText}>ข้อมูลส่วนตัว</Text>
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
              source={
                user.Image
                ? { uri: `${apiURL}/public/profile/${user.Image}` }
                : require("../assets/picture/user1.png")
            }
              
            />
            <View
              style={{
                width: "95%",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>ชื่อ-นามสกุล :</Text>
                    <Text style={styles.DatauserShow1}>
                      {user.FirstName} {user.LastName}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>เพศ :</Text>

                    <Text style={styles.DatauserShow1}>{user.Gender}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>วันเกิด :</Text>

                    <Text style={styles.DatauserShow1}>{user.Birthdate}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>เลขประจำตัว :</Text>

                    <Text style={styles.DatauserShow1}>{user.ID_User}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>เบอร์โทรศัพท์ :</Text>

                    <Text style={styles.DatauserShow1}>{user.Phone}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "75%",
                      
                    }}
                  >
                    <Text style={styles.DatauserText}>อีเมลล์ :</Text>

                    <Text style={styles.DatauserShow1}>{user.Email}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate("NewEditAdmin");
                    console.log("test");
                  }}
                >
                  <Text style={styles.Titlebtn}>แก้ไขข้อมูลส่วนตัว</Text>
                </TouchableOpacity>
              </View>
              <View>
               
              </View>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
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
    marginRight: 10,
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
    width: 150,
    height: 150,
    marginVertical: 30,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#00B4DB",
    padding: 10,
  },
  HeaderText1: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 160,
    backgroundColor: "transparent",
    borderColor: "#00B4DB",
  },
  Titlebtn: {
    fontSize: 16,
    color: "#00B4DB",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 2,
    color: "#00B4DB",
    fontSize: 20,
    marginVertical: 15,
    fontFamily: "MitrExtraLight",
  },
  Datauser: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  DatauserText: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    margin: 15,
    width: "40%",
  },
  DatauserShow: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    marginLeft: 45,
    margin: 15,
  },
  DatauserShow1: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",

    margin: 15,
  },
});
