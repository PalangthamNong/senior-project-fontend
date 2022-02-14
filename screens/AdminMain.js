import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Number_ServicesInputs,
  DaleteUser,
  Number_ServicesShow,
} from "../services/queue.service.js";
import { InputQueueing, ShowQueueingNow } from "../services/queue.service.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
export default function AdminMain({ navigation }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [user, setUser] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [Number_ServicesInput, setNumber_ServicesInput] = useState("");
  const [Number_Services, setNumber_Services] = useState("");
  const [ExitQueue, setExitQueue] = useState("");
  const [myqueue, setMyQueue] = useState(0);
  const [nqueue, setNQueue] = useState(0);
  const [allqueue, setallqueue] = useState(0);
  const [queue, setQueue] = useState([]);
  const [dataqueue, setdataqueue] = useState([]);

  const fetchUser = async () => {
    let data = await AsyncStorage.getItem("user");
    setUser(JSON.parse(data));
    return JSON.parse(data);
  };

  function _Save() {
    Number_ServicesInputs({
      Number_Services: Number_ServicesInput,
    }).then((res) => {
      if (res.status === 200) {
        Alert.alert(res.data.message);
        fetchNumber_Services();
        fetchQueue();
      } else {
        Alert.alert("บันทึกไม่สำเร็จ!");
      }
    });
  }

  const fetchNumber_Services = () => {
    Number_ServicesShow().then((result) => {
      setNumber_Services(result.data?.Number_Services || 0);
    });
  };

  const fetchQueue = async () => {
    ShowQueueingNow().then(async ({ data }) => {
      setQueue(data);
      console.log(data);
      setdataqueue(data);
      const user_ = await fetchUser();
      setallqueue(data.length);
      getQueue(data, user_?.ID_User);
    });
  };

  function Showdataqueue(item, index) {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          width: 335,
          margin: 5,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            width: "85%",
          }}
        >
          <View>
            <Text style={styles.Narbartext3}>
              คิวที่ {index + 1} {item.Queue_Now} {item.user.FirstName}{" "}
              {item.user.LastName}
            </Text>
          </View>
          <View>
            <Text style={styles.Narbartext3}></Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
          }}
        >
          <View style={{ justifyContent: "flex-end" }}>
            <Pressable onPress={() => _DaleteUser(item.Queue_Now, true)}>
              <Image
                style={styles.Narbarimg3}
                source={require("../assets/picture/incorrect.png")}
              />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  const getQueue = (queuedata, userId) => {
    let q = queuedata.findIndex((item) => item.Queue_Now == userId);
    setNQueue(queuedata[0]?.Queue_Now || 0);
    setMyQueue(q);
  };

  async function _DaleteUser(id, button = false) {
   
    let exitQueue;
    
    if (button) {
      exitQueue = id;
    } else {
      exitQueue = ExitQueue;
    }
    
    DaleteUser(exitQueue).then(async (result) => {
      if (result.status === 200) {
        Alert.alert("แก้ไขสำเร็จ");
        fetchNumber_Services();
        fetchQueue();
      } else {
        Alert.alert("แก้ไขไม่สำเร็จ!");
      }
    });
  }
  useEffect(() => {
    fetchNumber_Services();
    fetchQueue();
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
          {/* <TouchableOpacity>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/calendar.png")}
            />
          </TouchableOpacity> */}
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
        <View style={styles.QueueNow}>
          <Text style={styles.NumQueueNow}>{nqueue}</Text>
          <Text style={styles.TextQueueNow}>คิวปัจจุบัน</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ margin: 10, marginTop: 10 }}>
            <View style={styles.QueueNow1}>
              <Text style={styles.NumQueueBefore}>{allqueue}</Text>
              <Text style={styles.TextQueueBefore}>จำนวนการต่อคิวทั้งหมด</Text>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <View style={styles.QueueNow}>
              <Text style={styles.NumQueueAfter}>
                {Number_Services <= -1 ? 0 : Number_Services}
              </Text>
              <Text style={styles.TextQueueAfter}>จำนวนนักกอล์ฟ</Text>
            </View>
          </View>
        </View>

        {/* <View style={styles.DropDown}>
          <View style={{ width: "65%" }}>
            <DropDownPicker
              open={open}
              value={value}
              items={[
                { label: "ตามจำนวนการจอง", value: "NormalQueue" },
                {
                  label: "มากกว่าจำนวนการจอง",
                  value: "WorkOutByAppointment",
                },
                {
                  label: "น้อยกว่าจำนวนการจอง",
                  value: "WorkOutAsAppointment",
                },
              ]}
              dropDownContainerStyle={{ borderWidth: 0 }}
              style={{ borderWidth: 0 }}
              selectedItemLabelStyle={{
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
              placeholder="สถานะการณ์การจอง"
              placeholderStyle={{ color: "#00B4DB" }}
              labelStyle={{ color: "#00B4DB" }}
              listItemLabelStyle={{ color: "#00B4DB" }}
              setOpen={setOpen}
              setValue={setValue}
            />
          </View>
        </View> */}
        <View>
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.Narbartext1}>นำข้อมูลการต่อคิวออก</Text>
                  <View>
                    <View style={{ alignItems: "center" }}>
                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: 20,
                         
                        }}
                      >
                        <Text style={styles.Narbartext1}>
                          รหัสประจำตัวพนักงาน :
                        </Text>
                        <View style={{ marginRight: 10 }}>
                          <TextInput
                            style={[styles.input1]}
                            placeholderTextColor="#00B4DB"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={ExitQueue}
                            onChangeText={setExitQueue}
                          />
                        </View>
                        <View>
                        <Pressable onPress={() => _DaleteUser()}>
                          <Image
                            style={styles.Narbarimg3}
                            source={require("../assets/picture/incorrect.png")}
                          />
                        </Pressable>
                      </View>
                      </View>

                     
                    </View>
                    <View style={{ alignItems: "center", margin: 10 }}>
                      <Text style={styles.Narbartext2}>ลำดับการต่อคิว</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        borderWidth: 1,
                        margin: 5,
                        borderColor: "#00B4DB",
                      }}
                    >
                      <ScrollView style={{ height: 100 }}>
                        {dataqueue.map(Showdataqueue)}
                      </ScrollView>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row", marginTop: 20 }}>
                    <View style={{ marginHorizontal: 35 }}>
                      <TouchableOpacity
                        style={styles.button1}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Text style={styles.Titlebtn1}>เสร็จสิ้น</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>แก้ไขข้อมูลการคิว</Text>
            </Pressable>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 5,
            justifyContent: "space-between",
            marginHorizontal: 12,
            marginVertical: 50,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", marginVertical: 5 }}>
              <Text style={styles.TextInput}>จำนวนนักกีฬากอล์ฟ</Text>
              <TextInput
                style={[styles.input]}
                placeholderTextColor="#fff"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={Number_ServicesInput}
                onChangeText={setNumber_ServicesInput}
              />
              <TouchableOpacity
                onPress={() => {
                  _Save();
                }}
              >
                <Image
                  style={styles.Sselectimg}
                  source={require("../assets/picture/select.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{}}>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Image
                style={styles.Sitebar}
                source={require("../assets/menu.png")}
              />
            </TouchableOpacity>
          </View>
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
    marginVertical: 10,
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
  Narbarimg1: {
    width: 30,
    height: 30,
  },
  Narbarimg3: {
    width: 25,
    height: 25,
  },
  Narbarimg2: {
    width: 36,
    height: 36,
  },
  Sselectimg: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  Narbartext: {
    fontSize: 25,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
  Narbartext1: {
    fontSize: 19,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
  Narbartext3: {
    fontSize: 16,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
  Narbartext2: {
    fontSize: 19,
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
    fontSize: 100,
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

  Sitebar: {
    width: 50,
    height: 50,
  },
  TextInput: {
    fontFamily: "MitrExtraLight",
    color: "#fff",
    fontSize: 20,
  },

  input: {
    height: 25,
    width: 30,
    borderWidth: 0,
    borderColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 10,
    fontSize: 20,
  },
  input1: {
    height: 25,
    width: 70,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: 360,
    width: "95%",
  },
  button: {
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 45,
    width: 200,
  },
  buttonOpen: {
    backgroundColor: "#fff",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "#00B4DB",
    textAlign: "center",
    fontFamily: "MitrExtraLight",
  },
  textStyle1: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "MitrExtraLight",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#00B4DB",
    padding: 15,
    borderRadius: 10,
    width: 150,
    height: 50,
  },
  Titlebtn1: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "MitrExtraLight",
  },
});
