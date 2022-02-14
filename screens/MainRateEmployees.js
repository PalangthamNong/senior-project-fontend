import React, { useEffect,useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiURL } from "../environment";
import {
  ChangeVerifyIdentity,
  VerifyIdentity,
} from "../services/customer.service";
export default function MainRateEmployees({ navigation }) {
  const [authData, seTauthData] = useState({ Fullname: "", Phone: "" });
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    console.log(user);
  };
  // function ChangeVerifyIdentitys() {
  //   ChangeVerifyIdentity()

  // }

  // function ChangeVerifyIdentitys() {
  //   // ChangeVerifyIdentity(1,(res.data.data.)
  // }

  function VerifyIdentitys() {
    VerifyIdentity(authData.Fullname, authData.Phone).then((res) => {
      console.log(res.data);
      if (res.data.data === null) {
        Alert.alert("ข้อมูลนักกีฬากอล์ฟไม่ถูกต้องโปรดกรอกใหม่อีกครั้ง");
      }
      if (res.data.data.Check_Pass == 1) {
        Alert.alert("รายชื่อนี้ทำการประเมินไปแล้ว");
      }
      if (res.data.data.Check_Pass == 0) {
        // ChangeVerifyIdentitys()
        navigation.navigate("RateEmployees", { id: res.data.data.Customer_id });
      }
    });
  }
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
          <View style={styles.Narbar}>
            <View style={{flex: 1 }}>
              <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
            </View>
            <View style={{marginRight: 10}}>
              <TouchableOpacity onPress={() => navigation.navigate("UserMain")}>
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
              source={require("../assets/picture/star.png")}
            />
            <Text style={styles.HeaderText}>
              การประเมินการปฎิบัติงานพนักงาน
            </Text>
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
              source={{
                uri: `${apiURL}/public/profile/${user.Image}`
              }}
              
            />
            <View>
              <TextInput
                style={styles.input}
                placeholderTextColor="#a4deea"
                placeholder="ชื่อต้นนักกีฬากอล์ฟ"
                onChangeText={(text) =>
                  seTauthData({ ...authData, Fullname: text })
                }
              />
              <TextInput
                style={[styles.input]}
                placeholderTextColor="#a4deea"
                placeholder="หมายเลขโทรศัพท์"
                onChangeText={(text) =>
                  seTauthData({ ...authData, Phone: text })
                }
              />
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => VerifyIdentitys()}
              >
                <Text style={styles.Titlebtn}>ประเมินพนักงาน</Text>
              </TouchableOpacity>
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
    width: 200,
    height: 200,
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
    borderWidth: 3,
    borderRadius: 50,
    width: 150,
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
});
