import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Picker,
  Button,
  Alert,
  Switch,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { InputQueueing, ShowQueueingNow } from "../services/queue.service.js";
import { StatisticsInput, Update } from "../services/statistics.service.js";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Number_ServicesShow, DaleteUser } from "../services/queue.service";
//
import * as Notifications from "expo-notifications";
import { io } from "socket.io-client";
import { appIP } from "../environment.js";
import {
  notify,
  registerForPushNotificationsAsync,
} from "../services/notify.service.js";
//
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default function UserMain({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState();
  const [Number_Services, setNumber_Services] = useState();
  const [queue, setQueue] = useState([]);
  const [myqueue, setMyQueue] = useState(0);
  const [nqueue, setNQueue] = useState(0);
  const [allqueue, setallqueue] = useState(0);
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [isShown, setIsShown] = useState(false);
  const toggleTheBox = () => {
    setIsShown((previousState) => !previousState);
  };
  //required
  const ws = useRef(io(`ws://${appIP}:5000`)).current;
  // const ws = useRef(io(`ws://${appIP}:5000`)).current;
  //--------------------------------
  const fetchUser = async () => {
    let data = await AsyncStorage.getItem("user");
    setUser(JSON.parse(data));
    return JSON.parse(data);
  };

  const getQueue = (queuedata, userId) => {
    let q = queuedata.findIndex((item) => item.Queue_Now == userId);

    setNQueue(queuedata[0]?.Queue_Now || 0);
    setMyQueue(q);
  };
  const fetchQueue = async () => {
    ShowQueueingNow().then(async ({ data }) => {
      setQueue(data);

      const user_ = await fetchUser();

      setallqueue(data.length);
      getQueue(data, user_?.ID_User);
    });
  };
  const fetchAllQueue = async () => {
    ShowQueueingNow().then(async ({ data }) => {
      setallqueue(data.length);
    });
  };

  const fetchNumber_Services = () => {
    Number_ServicesShow().then((result) => {
      setNumber_Services(result.data?.Number_Services || 0);
    });
  };

  function BF_DaleteUser() {
    console.log("value",value);
    if (value === null) {
      Alert.alert("โปรดเลือกรูปแบบการออกปฎิบัติงานและทำตามขั้นตอนการต่อคิวปฎิบัติงาน");
      return null ;
    }
    if (value === "ออกปฎิบัติงานแบบการนัดหมาย") {
      Alert.alert("การยกเลิกผิดพลาดและต้องทำตามขั้นตอนการต่อคิวปฎิบัติงาน");
      return null ;
    }
    if (value === "ออกปฎิบัติงานแบบการมอบหมายงาน") {
      Alert.alert("การยกเลิกผิดพลาดและต้องทำตามขั้นตอนการต่อคิวปฎิบัติงาน");
      return null ;
    }
    // _DaleteUser();
  }

  async function _DaleteUser(id) {
    const user_ = await fetchUser();
    DaleteUser(user_.ID_User).then((res) => {
      if (res.status === 200) {
        Alert.alert("ยกเลิกสำเร็จ");
        ws.emit("queueUpdate", {});
      } else {
        Alert.alert("ยกเลิกไม่สำเร็จ");
      }
    });
  }

  function BF_DaleteUser1() {
    console.log("value",value);
    if (value === null) {
      Alert.alert("โปรดเลือกรูปแบบการออกปฎิบัติงานและทำตามครั้งตอนการต่อคิวปฎิบัติงาน");
      return null ;
    }
    _DaleteUser1();
  }

  async function _DaleteUser1(id) {
    const user_ = await fetchUser();
    const qtemp = [...queue];
    DaleteUser(user_.ID_User).then((res) => {
      if (res.status === 200) {
        ws.emit("queueUpdate");
        StatisticsInput({
          Sts_ID_User: user_?.ID_User,
          Quantity: 1,
          Typequeue: value,
        }).then((re) => {
          if (res.status === 200) {
            ws.emit("notify", {
              ID_User: user_.ID_User,
              nqueue,
              Number_Services: Number_Services - 1,
              allqueue: allqueue - 1,
              qtemp
            });
            Alert.alert("ออกปฎิบัติงานสำเร็จ");
            Update(Number_Services, Number_Services - 1).then((result) => {
              fetchNumber_Services();
              fetchAllQueue();
            });
          } else {
            Alert.alert("บันทึกไม่สำเร็จ!");
          }
        });
      } else {
        Alert.alert("ปฎิบัติงานไม่สำเร็จ");
      }
    });
  }
  async function Queueing() {
    const nuser = await fetchUser();
    console.log();
    if (value == null) {
      Alert.alert("โปรดเลือกรูปแบบการออกปฎิบัติงาน");
    } else if (value == "การต่อคิวปกติ") {
      InputQueueing({
        Queue_Now: nuser?.ID_User,
        prority: nqueue == 0 ? nuser?.ID_User : parseInt(nuser?.ID_User) + 1000,
      }).then((res) => {
        ws.emit("queueUpdate");
        fetchQueue();
        if (res.status === 200) {
          Alert.alert(res.data.message);
          // Alert.alert("ต่อคิวสำเร็จ");
        } else {
          Alert.alert("เกิดการผิดพลาดในการต่อคิว");
        }
      });
      fetchQueue();
    } else if (value == "ออกปฎิบัติงานแบบการนัดหมาย") {
      Alert.alert("โปรดเลือกรูปแบบการออกปฎิบัติงานและทำตามครั้งตอนการต่อคิวปฎิบัติงาน");
    } else if (value == "ออกปฎิบัติงานแบบการมอบหมายงาน") {
      Alert.alert("โปรดเลือกรูปแบบการออกปฎิบัติงานและทำตามครั้งตอนการต่อคิวปฎิบัติงาน");
    }
  }
  useEffect(() => {
    fetchUser();
    fetchNumber_Services();
    fetchQueue();
    registerForPushNotificationsAsync()
      .then((token) => setToken(token))
      .catch((e) => console.log(e));
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    ws.on("message", (e) => {
      e.close();
    });
    ws.on("queueUpdate", (msg, e) => {
      fetchUser();
      fetchNumber_Services();
      fetchAllQueue();
      fetchQueue();
      console.log(token);
      if (token)
        notify({
          notifyToken: token,
          title: "Hello world",
          body: "แจ้งเตือนเว้ยเห้ย",
        })
          .then((result) => {
            // console.log(result);
          })
          .catch((e) => console.log(e));
    });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
          <TouchableOpacity
            onPress={() => navigation.navigate("CalenderTestcopy")}
          >
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
            opacity: 0.1,
          }}
          resizeMode="contain"
          source={require("../assets/picture/Logo.png")}
        />
        <View></View>
        <View style={styles.QueueNow}>
          <Text style={styles.NumQueueNow}>{nqueue}</Text>
          <Text style={styles.TextQueueNow}>คิวปัจจุบัน</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ width: "33%", alignItems: "center" }}>
            <Text style={styles.NumQueueBefore}>
              {myqueue <= -1 ? 0 : myqueue}{" "}
            </Text>
            <Text style={styles.TextQueueBefore}>
              จำนวนการต่อคิวก่อนหน้าคุณ
            </Text>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <Text style={styles.NumQueueAfter}>{allqueue}</Text>
            <Text style={styles.TextQueueAfter}>จำนวนการต่อคิวทั้งหมด</Text>
          </View>
          <View style={{ width: "33%", alignItems: "center" }}>
            <Text style={styles.NumQueueAfter}>
              {Number_Services <= -1 ? 0 : Number_Services}
            </Text>
            <Text style={styles.TextQueueAfter}>จำนวนนักกอล์ฟ</Text>
          </View>
        </View>

        <View style={styles.DropDown}>
          <View style={{ width: "85%" }}>
            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: "การต่อคิวปกติ", value: "การต่อคิวปกติ" },
                {
                  label: "ออกปฎิบัติงานแบบการนัดหมาย",
                  value: "ออกปฎิบัติงานแบบการนัดหมาย",
                },
                {
                  label: "ออกปฎิบัติงานแบบการมอบหมายงาน",
                  value: "ออกปฎิบัติงานแบบการมอบหมายงาน",
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
            <View style={{ width: "100%" }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    Queueing();
                  }}
                  style={styles.button}
                >
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

              <View>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",

                      width: "100%",
                    }}
                  >
                    <View style={{ width: "47%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => {
                          BF_DaleteUser1();
                        }}
                        style={styles.button1}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "MitrExtraLight",
                            color: "#00B4DB",
                          }}
                        >
                          ออกปฎิบัติงาน
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ width: "47%", alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => BF_DaleteUser()}
                        style={styles.button1}
                      >
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: "MitrExtraLight",
                            color: "#00B4DB",
                          }}
                        >
                          ยกเลิกการต่อคิว
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
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
    zIndex: 100,
    marginTop: 20,
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
    fontSize: 60,
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
    marginLeft: 15,
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
  button1: {
    alignItems: "center",
    backgroundColor: "#ffff",
    padding: 10,
    borderRadius: 500,
    width: "90%",
    marginHorizontal: 7,
  },
  Sitebar: {
    width: 50,
    height: 50,
  },
});
