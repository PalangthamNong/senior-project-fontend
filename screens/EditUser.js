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
  Alert,
  Modal,
  Pressable,
  Platform,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "react-native-modal-datetime-picker";
import ConfirmDialog from "../components/ConfirmDialog";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UpdateUser } from "../services/auth.service";
import { UploadImage } from "../services/user.service";

export default function EditUser({ navigation }) {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  // const [Birthdate, setBirthdate] = useState("");
  const [Image, setImage] = useState(null);
  // const [Gender, setGender] = useState("");
  const [Email, setEmail] = useState("");
  // const [Address, setAddress] = useState("");
  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Phone, setPhone] = useState("");
  const [StartDate, setStartDate] = useState("YYYY-MM-DD");
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [user, setUser] = useState({});
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const fetchUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    setFirstName(user.FirstName);
    console.log(user);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function _BeforeSave() {
    if (Password !== ConfirmPassword) {
      Alert.alert("ไอสัสฟลุ็ค");
      return null;
    }
    _Save();
  }

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS !== "web") {
  //       const { status } =
  //         await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== "granted") {
  //         alert("Sorry, we need camera roll permissions to make this work!");
  //       }
  //     }
  //   })();
  // }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    UploadImage('0025',result).then(res=>{
      console.log(res.data);
    }).catch(e=>{
      console.log(e.response);
    })
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  function _Save() {
    // UploadImage(user.ID_User,Image).then( res =>{
    //   console.log(res);
    // }).catch(e=>{
    //   console.log(e.response);
    // })
    UpdateUser(user.ID_User, {
      FirstName,
      LastName,
      Email,
      Birthdate: StartDate,
      Phone,
    })
      .then(async (result) => {
        await AsyncStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
        navigation.navigate("ShowEditUser");
      })
      .catch((e) => {
        Alert.alert("โปรดใส่ข้อมูลอีกครั้ง");
      });
  }

  const handleConfirm = (dates) => {
    var date = formatDate(dates);
    setStartDate(date);
    hideDatePicker();
  };
  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  const showDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  const formatDate = (date) => {
    let d = new Date(date),
      month = d.getMonth() + 1 + "",
      day = "" + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <ImageBackground
          source={require("../assets/picture/Clouds.jpg")}
          resizeMode="cover"
          style={styles.Background}
        >
          <View></View>

          <View style={styles.Narbar}>
            <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          </View>
          <View style={styles.Header}>
            <Image
              style={styles.Headerimg}
              source={require("../assets/picture/Editprofile.png")}
            />
            <Text style={styles.HeaderText}>แก้ไขข้อมูลส่วนตัว</Text>
          </View>
          <Image
            style={{
              position: "absolute",
              width: 650,
              height: 650,
              marginTop: 150,
              opacity: 0.05,
            }}
            resizeMode="contain"
            source={require("../assets/picture/LogoBule.png")}
          />

          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 200,
                    height: 200,
                    borderRadius: 200,
                    borderWidth: 1,
                  }}
                />
              )}
              {Image ? (
                <Image
                  source={{ uri: Image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 200,
                    borderWidth: 1,
                  }}
                />
              ) : (
                <Image
                  source={require("../assets/picture/user1.png")}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 200,
                    borderWidth: 1,
                  }}
                />
              )}

              <Button
                title="แก้ไขรูปภาพส่วนตัว"
                onPress={pickImage}
                style={styles.Datauserbtn}
              />
            </View>

            <View style={{ flexDirection: "column" }}>
              <View style={styles.Datauser}>
                <View>
                  <Text style={styles.DatauserText}>ชื่อ :</Text>
                  <Text style={styles.DatauserText}>นามสกุล :</Text>
                  <Text style={styles.DatauserText}>วันเกิด :</Text>
                  {/* 
                  <Text style={styles.DatauserText}>รหัสผ่านใหม่ :</Text>
                  <Text style={styles.DatauserText}>ยืนยันรหัสผ่าน :</Text> */}
                  <Text style={styles.DatauserText}>เบอร์โทรศัพท์ :</Text>
                  <Text style={styles.DatauserText}>อีเมลล์ :</Text>
                </View>
                <View style={{}}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#a4deea"
                    // placeholder={user.FirstName}
                    value={FirstName}
                    onChangeText={(text) => setFirstName(text)}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#a4deea"
                    // placeholder={user.LastName}
                    onChangeText={(text) => set}
                    value={LastName}
                    onChangeText={(text) => setLastName(text)}
                  />
                  <View style={styles.RowDate}>
                    <TouchableOpacity
                      onPress={() => showDatePicker()}
                      style={{
                        width: 150,
                        backgroundColor: "transparent",
                      }}
                    >
                      <View style={styles.inputDate}>
                        <Text
                          style={{
                            paddingLeft: 1,
                            fontSize: 20,
                            color: "#00B4DB",
                            marginTop: 15,
                            borderColor: "#00B4DB",
                            borderBottomWidth: 2,
                            marginLeft: 10,
                            width: 200,
                            borderBottomWidth: 2,
                          }}
                        >
                          {StartDate}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    locale="th_TH"
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                  />
                  /{" "}
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#a4deea"
                    placeholder="*******"
                    secureTextEntry={true}
                    value={Password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#a4deea"
                    placeholder="*******"
                    secureTextEntry={true}
                    value={ConfirmPassword}
                    onChangeText={(text) => setConfirmPassword(text)}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#a4deea"
                    // placeholder={user.Email}
                    onChangeText={(text) => set}
                    value={Phone}
                    onChangeText={(text) => setPhone(text)}
                  />
                  <TextInput
                    style={[styles.input]}
                    placeholderTextColor="#a4deea"
                    // placeholder={user.Email}
                    onChangeText={(text) => set}
                    value={Email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.centeredView}>
                <ConfirmDialog
                  visible={modalVisible1}
                  onClose={setModalVisible1}
                  onConfirm={() => {
                    _Save();
                  }}
                  title="ยืนยันการแก้ไขข้อมูล"
                />
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible1(true)}
                >
                  <Text style={styles.textStyle}>ยืนยันการแก้ไขข้อมูล</Text>
                </Pressable>
              </View>

              <View style={styles.centeredView}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible2}
                  onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible2(!modalVisible2);
                  }}
                >
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <Text style={styles.modalText}>ยกเลิกการแก้ไขข้อมูล</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Pressable
                          style={[styles.button_ps, styles.buttonClose]}
                        >
                          <Text style={styles.textStyle}>ยืนยัน</Text>
                        </Pressable>
                        <Pressable
                          style={[styles.button_ps, styles.buttonClose]}
                          onPress={() => setModalVisible2(!modalVisible2)}
                        >
                          <Text style={styles.textStyle}>ย้อนกลับ</Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <Pressable
                  style={[styles.button, styles.buttonOpen]}
                  onPress={() => setModalVisible2(true)}
                >
                  <Text style={styles.textStyle}>ยกเลิกการแก้ไขข้อมูล</Text>
                </Pressable>
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
  },
  Narbarimg: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
    marginLeft: 65,
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
    width: 100,
    height: 100,
    marginVertical: 30,
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
    width: 170,
    backgroundColor: "transparent",
    borderColor: "#00B4DB",
  },
  button_ps: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 100,
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
    margin: 10,
  },
  DatauserText: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    margin: 18,
  },
  DatauserShow: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    marginLeft: 45,
    margin: 15,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    color: "#00B4DB",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
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
  },

  buttonOpen: {
    backgroundColor: "#00B4DB",
  },
  buttonClose: {
    backgroundColor: "#00B4DB",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "MitrExtraLight",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MitrExtraLight",
    fontSize: 20,
    color: "#00B4DB",
  },
  Datauserbtn: {
    color: "red",
  },
});
function test() {
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => setShowSaveDialog(true)}>
        <Text>ยืนยัน</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
