import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Picker,
  Button,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Number_ServicesShow } from "../services/queue.service";
export default function UserMain({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState();
  const [Number_Services, setNumber_Services] = useState();
  
  const fetchUser = async () => {
    setUser(await AsyncStorage.getItem("user"));
  };
  const fetchNumber_Services = () => {
    Number_ServicesShow().then(result =>{
      console.log(result.status);
      setNumber_Services(result.data?.Number_Services || 0)})
  };

  useEffect(() => {
    fetchUser()
    fetchNumber_Services()
  }, []);
   



  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/BlueRaspberry.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.navigate("CalenderTestcopy")}>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/calendar.png")}
            />
          </TouchableOpacity>
        </View>
        <Image
          style={{
            position: "absolute",
            width: 650,
            height: 650,
            marginTop: 150,
            opacity: 0.10,
          }}
          resizeMode="contain"
          source={require("../assets/picture/Logo.png")}
        />
        <View style={styles.QueueNow}>
          <Text style={styles.NumQueueNow}>0</Text>
          <Text style={styles.TextQueueNow}>คิวปัจจุบัน</Text>
     
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ margin: 10 }}>
            <View style={styles.QueueNow1}>
              <Text style={styles.NumQueueBefore}>0</Text>
              <Text style={styles.TextQueueBefore}>
                จำนวนการต่อคิวก่อนหน้าคุณ
              </Text>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <View style={styles.QueueNow}>
              <Text style={styles.NumQueueAfter}>0</Text>
              <Text style={styles.TextQueueAfter}>จำนวนการต่อคิวทั้งหมด</Text>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <View style={styles.QueueNow}>
              <Text style={styles.NumQueueAfter}>{Number_Services}</Text>
              <Text style={styles.TextQueueAfter}>จำนวนนักกอล์ฟ</Text>
            </View>
          </View>
        </View>

        <View style={styles.DropDown}>
          <View style={{ width: "65%" }}>
            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: "การต่อคิวปกติ", value: "NormalQueue" },
                {
                  label: "ออกปฎิบัติงานแบบพิเศษ",
                  value: "W1",
                },
                {
                  label: "ออกปฎิบัติงานแบบการนัดหมาย",
                  value: "W2",
                },
                {
                  label: "ออกปฎิบัติงานแบบการมอบหมายงาน",
                  value: "W3",
                },
              ]}
              dropDownContainerStyle={{ borderWidth: 0 }}
              style={{ borderWidth: 0 }}
              selectedItemLabelStyle={{
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
              placeholder="รูปแบบการออกปฎิบัติงาน"
              placeholderStyle={{ color: "#00B4DB" }}
              labelStyle={{ color: "#00B4DB" }}
              listItemLabelStyle={{ color: "#00B4DB" }}
              setOpen={setOpen}
              setValue={setValue}
            />
            <View>
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "MitrExtraLight",
                    color: "#00B4DB",
                  }}
                >
                  ต่อคิว
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-end",
            marginRight: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image
              style={styles.Sitebar}
              source={require("../assets/menu.png")}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  DropDown: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex:100,
  },
  Hd: {
    color: "#fff",
    fontSize: 40,
    margin: 10,
  },
  image: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  Narbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  Narbarimg: {
    width: 25,
    height: 25,
  },
  Narbartext: {
    fontSize: 25,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
  QueueNow: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  QueueNow1: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  NumQueueNow: {
    fontSize: 150,
    fontFamily: "MitrExtraLight",
    color: "#fff",
  },
  TextQueueNow: {
    fontFamily: "MitrExtraLight",
    color: "#fff",
    fontSize: 30,
  },

  NumQueueBefore: {
    fontSize: 50,
    fontFamily: "MitrExtraLight",
    color: "#fff",
  },
  TextQueueBefore: {
    fontFamily: "MitrExtraLight",
    color: "#fff",
    fontSize: 15,
    maxWidth: 115,
    textAlign: "center",
  },

  NumQueueAfter: {
    fontSize: 50,
    fontFamily: "MitrExtraLight",
    color: "#fff",
  },
  TextQueueAfter: {
    fontFamily: "MitrExtraLight",
    color: "#fff",
    fontSize: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 10,
    margin: 20,
    borderRadius: 500,
  },
  Sitebar: {
    width: 50,
    height: 50,
  },
});
