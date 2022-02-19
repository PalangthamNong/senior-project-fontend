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
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { DaleteUser, UpdateUser } from "../services/user.service";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function ShowEditUser({ navigation, route }) {
  const data = route.params.data;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [user, setUser] = useState({});
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalData, setModalData] = useState({});

  // const fetchUser = async () => {
  //   setUser(JSON.parse(await AsyncStorage.getItem("user")));

  //   console.log(user);
  // };

  // useEffect(() => {
  //   fetchUser();
  // }, []);

  function _DaleteUser(id) {
    setModalVisible1(false);
    DaleteUser(id).then(async (result) => {
      console.log(id, result.data);
      if (result.data == 1) {
        navigation.navigate("SearchEditUserAdmin");
      }
    });
  }

  function _UpdateUser() {
    console.log(value);
    UpdateUser(data.ID_User, {
      Posittions_ID: value,
    })
      .then(async (result) => {
        await AsyncStorage.setItem("user", JSON.stringify(result.data));
        setUser(result.data);
        navigation.navigate("SearchEditUserAdmin");
      })
      .catch((e) => {
        navigation.navigate("SearchEditUserAdmin");
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView> */}
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
            opacity: 0.1,
            marginRight: 100,
          }}
          resizeMode="contain"
          source={require("../assets/picture/LogoBule.png")}
        />
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
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
          <Image style={styles.userimg} source={require("../assets/277.png")} />
          <View style={{ flexDirection: "column" }}>
            <View style={styles.Datauser}>
              <View>
                <Text style={styles.DatauserText}>ชื่อ - นามสกุล :</Text>
                <Text style={styles.DatauserText}>เพศ :</Text>
                <Text style={styles.DatauserText}>วันเกิด :</Text>
                <Text style={styles.DatauserText}>เลขประจำตัว :</Text>

                <Text style={styles.DatauserText}>อีเมลล์ :</Text>
              </View>
              <View>
                <Text style={styles.DatauserShow}>{`${data?.FirstName || "-"} ${
                  data?.LastName
                }`}</Text>
                <Text style={styles.DatauserShow}>{`${
                  data?.Gender || "-"
                }`}</Text>
                <Text style={styles.DatauserShow}>{`${
                  data?.Birthdate || "-"
                }`}</Text>
                <Text style={styles.DatauserShow}>{`${
                  data?.ID_User || "-"
                }`}</Text>

                <Text style={styles.DatauserShow}>{`${
                  data?.Email || "-"
                }`}</Text>
              </View>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              style={[styles.button, styles.buttonOpen1]}
              onPress={() => setModalVisible1(true)}
            >
              <Text style={styles.textStyle1}>ตกลง</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonOpen2]}
              onPress={() => setModalVisible2(true)}
            >
              <Text style={styles.textStyle2}>ลบผู้ใช้</Text>
            </Pressable>
          </View>
          <View>
            {/* <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginHorizontal: 125,
                  marginLeft: 155

                }}
              >
                <Text style={styles.DatauserText1}>ตำแหน่ง :</Text>
                <View style={styles.DropDown}>
                  <View style={{ width: 150 ,height : 150 , marginLeft : 10}}>
                    <DropDownPicker
                      open={open}
                      value={value}
                      zIndex={100}
                      items={[
                        {
                          label: "พนักงานปกติ",
                          value: "0",
                        },
                        {
                          label: "พนักงานณูปแบบพิเศษ",
                          value: "1",
                        },
                      ]}
                      dropDownContainerStyle={{ borderWidth: 0 }}
                      style={{ borderWidth: 0 }}
                      selectedItemLabelStyle={{
                        fontFamily: "MitrExtraLight",
                        color: "#00B4DB",
                      }}
                      placeholder="ตำแหน่งพนักงาน"
                      placeholderStyle={{ color: "#00B4DB" }}
                      labelStyle={{ color: "#00B4DB" }}
                      listItemLabelStyle={{ color: "#00B4DB" }}
                      setOpen={setOpen}
                      setValue={setValue}
                    />
                  </View>
                </View>
              </View> */}
          </View>

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible1}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible1(!modalVisible1);
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 300,
                }}
              >
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>ยืนยันการแก้ไขข้อมูล</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      padding: 10,
                    }}
                  >
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => navigation.navigate("SearchEditUserAdmin")}
                    >
                      <Text style={styles.textStyle}>ยืนยัน</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible1(!modalVisible1)}
                    >
                      <Text style={styles.textStyle}>ยกเลิก</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible2}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible2(!modalVisible2);
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 200,
                }}
              >
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>ยืนยันลบข้อมูลพนักงาน</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 15,
                      padding: 10,
                    }}
                  >
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => _DaleteUser(data.ID_User)}
                    >
                      <Text style={styles.textStyle}>ยืนยัน</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible2(!modalVisible2)}
                    >
                      <Text style={styles.textStyle}>ยกเลิก</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>

        
        </View>
      </ImageBackground>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Background: {},
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
    width: 120,
    height: 120,
    marginVertical: 20,
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

  Datauser: {
    flexDirection: "row",
    margin: 10,
  },
  DatauserText: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    margin: 15,
  },
  DatauserText1: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    marginRight: 80,
  },
  DatauserShow: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    marginLeft: 45,
    margin: 15,
  },
  DropDown: {
    zIndex: 100,
  },
  centeredView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 150,
  },
  modalView: {
    margin: 20,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

    zIndex: 0,
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 350,
    height: 270,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonOpen1: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 90,
    backgroundColor: "transparent",
    borderColor: "#0f9b0f",
  },
  buttonOpen2: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 90,
    backgroundColor: "transparent",
    borderColor: "#F7971E",
  },
  buttonOpen3: {
    alignItems: "center",
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 100,
    height: 50,
    backgroundColor: "transparent",
    borderColor: "#ED213A",
    zIndex: 0,
  },

  buttonClose: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 110,
    backgroundColor: "transparent",
    borderColor: "#00B4DB",
  },
  textStyle: {
    fontSize: 16,
    color: "#00B4DB",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
  textStyle1: {
    fontSize: 16,
    color: "#0f9b0f",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
  textStyle2: {
    fontSize: 16,
    color: "#F7971E",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
  textStyle3: {
    fontSize: 16,
    color: "#ED213A",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
  modalText: {
    fontSize: 20,
    color: "#00B4DB",
    fontWeight: "bold",
    fontFamily: "MitrExtraLight",
  },
});
