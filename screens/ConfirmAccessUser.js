import React, { useState, useEffect } from "react";
import { apiURL } from "../environment";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import axios from "axios";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { SafeAreaView } from "react-native-safe-area-context";
import { DaleteUser, GetUserID, UpdateUser } from "../services/user.service";
export default function ConfirmAccessUser({ navigation }) {
  const [userData, setUserData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalVisible1, setModalVisible1] = useState(false);

  useEffect(() => {
    ShowDataUser();
  }, []);

  function ShowDataUser() {
    axios.get(`${apiURL}/confirm-rights/`).then((result) => {
      //console.log(result.data);

      //console.log(apiURL);
      if (result.status === 200) {
        setUserData(result.data);
      }
    });
  }

  function updateUser(id, user) {
    let updateData = {
      ...user,
      StatusPass: 1,
    };
    UpdateUser(id, updateData).then(async (result) => {
      //console.log("data ", result.data);
      await ShowDataUser();
    });
    setModalVisible(false);
  }
  function _UpdateUser(id) {
    setModalVisible(true);
    GetUserID(id).then((result) => {
      // //console.log(result.data);
      setModalData({
        ID_User: id,
        FirstName: result.data.FirstName,
        LastName: result.data.LastName,
      });
    });
  }

  function _DaleteUser(id) {
    setModalVisible1(false);
    DaleteUser(id).then(async (result) => {
      console.log(id, result.data);
      await ShowDataUser();
    });
  }
  function setDelete(id) {
    setModalVisible1(true);
    setModalData({
      ID_User: id,
    });
  }

  function _renderUserTable({ ID_User, FirstName, LastName }) {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 10,
          width: "100%",
        }}
        key={ID_User}
      >
        <View style={{ width: "33%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.AcHeaderText}>{ID_User}</Text>
          </View>
        </View>
        <View style={{ width: "33%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.AcText}>
              {FirstName} {LastName}
            </Text>
          </View>
        </View>
        <View style={{ width: "33%" }}>
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => _UpdateUser(ID_User)}>
                <Image
                  style={styles.btnimg1}
                  source={require("../assets/picture/tick-inside-circle.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setDelete(ID_User)}>
                <Image
                  style={styles.btnimg1}
                  source={require("../assets/picture/x-mark.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
  // const element = (data, index) => (
  //   <TouchableOpacity onPress={() => this._alertIndex(index)}>
  //     <Image
  //       style={styles.statisticsimg}
  //       source={require("../assets/picture/file.png")}
  //     />
  //   </TouchableOpacity>
  // );
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/back-button.png")}
            />
          </TouchableOpacity>
        </View>
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
        <View style={styles.Header}>
          <Image
            style={styles.Headerimg}
            source={require("../assets/picture/approval-symbol-in-badge.png")}
          />
          <Text style={styles.HeaderText}>ยืนยันสิทธิการเข้าใช้งานระบบ</Text>
        </View>
        <View style={styles.DateTime}>
          <Text style={styles.DateText}>รายชื่อผู้สมัครเข้าใช้งานระบบ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ width: "33%" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Ac1HeaderText}>รหัสประจำตัว</Text>
            </View>
          </View>
          <View style={{ width: "33%" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Ac1HeaderText}>ชื่อ-นามสกุล</Text>
            </View>
          </View>
          <View style={{ width: "33%" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.Ac1HeaderText}>จัดการสิทธิ</Text>
            </View>
          </View>
        </View>
        <ScrollView>
          {userData
            .filter((item) => item.StatusPass != 1)
            .map(_renderUserTable)}
        </ScrollView>

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
              <View styles={{ flexDirection: "row" }}>
                <Text style={styles.modalHDText}>
                  ยืนยันสิทธิการเข้าใช้งานระบบ
                </Text>
                <Text style={styles.modalText}>
                  รหัสประจำตัว : {modalData.ID_User}
                </Text>
                <Text style={styles.modalText}>
                  {modalData.FirstName} {modalData.LastName}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.buttons2, styles.buttonClose]}
                  onPress={() => updateUser(modalData.ID_User, modalData)}
                >
                  <Text style={styles.textStyle}>ยืนยัน</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttons2, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
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
          visible={modalVisible1}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible1(!modalVisible1);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View styles={{ flexDirection: "row" }}>
                <Text style={styles.modalHDText}>
                  ยืนยันสิทธิการลบข้อมูลพนักงาน
                </Text>
                <Text style={styles.modalText}>
                  รหัสประจำตัว : {modalData.ID_User}
                </Text>
                <Text style={styles.modalText}>
                  {modalData.FirstName} {modalData.LastName}
                </Text>
              </View>
              <View style={{ flexDirection: "row" }}>
                <Pressable
                  style={[styles.buttons2, styles.buttonClose]}
                  onPress={() => _DaleteUser(modalData.ID_User)}
                >
                  <Text style={styles.textStyle}>ยืนยัน</Text>
                </Pressable>
                <Pressable
                  style={[styles.buttons2, styles.buttonClose]}
                  onPress={() => setModalVisible1(!modalVisible1)}
                >
                  <Text style={styles.textStyle}>ยกเลิก</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Narbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 15,
  },
  Narbarimg: {
    width: 25,
    height: 25,
  },
  btnimg1: {
    width: 20,
    height: 20,
    margin: 5,
  },
  btnimg3: {
    width: 50,
    height: 50,
  },

  Narbartext: {
    fontSize: 25,
    fontFamily: "MitrExtraLight",
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
  Ac1HeaderText: {
    fontSize: 16,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  AcHeaderText: {
    fontSize: 14,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
   
  },
  AcText: {
    fontSize: 14,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  
  },

  DateTime: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  DateText: {
    fontSize: 25,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    margin: 20,
  },

  DateText1: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 20,
  },
  input: {
    height: 25,
    width: 75,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",

    marginTop: 20,
  },
  Sselectimg: {
    height: 20,
    width: 20,
    marginTop: 25,
  },
  TextAllQueue: {
    fontSize: 100,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 20,
  },
  TextAllQueue1: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  TextAllQueues1: {
    fontSize: 60,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  TextAllQueues2: {
    fontSize: 16,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 5,
    height: 60,
    width: 150,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00B4DB",
    marginVertical: 40,
  },
  txtbutton: {
    alignItems: "center",
    padding: 10,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    fontSize: 16,
  },
  countContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    width: 300,
    height: 280,
  },
  buttons: {
    width: 20,
    height: 20,
  },
  buttonOpen: {
    backgroundColor: "transparent",
  },
  buttonClose: {
    backgroundColor: "#00B4DB",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
  modalHDText: {
    marginBottom: 17,
    textAlign: "center",
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    fontWeight: "bold",
  },
  buttons2: {
    width: 100,
    height: 60,
    margin: 10,
    borderRadius: 10,
  },
});
