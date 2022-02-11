import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import axios from "axios";
import RadioForm from "react-native-simple-radio-button";
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { apiURL } from "../environment";
import { SafeAreaView } from "react-native-safe-area-context";
import { AssigntasksInput } from "../services/assigntasks.service";
export default function RateEmployeesAdminDetails({ navigation, route }) {
  const [assesment, setAssesment] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [StartDate, setStartDate] = useState("YYYY-MM-DD");
  const [Radio, setRadio] = useState("");
  const [TimeJob, setTimeJob] = useState("");
  const [Details, setDetails] = useState("");

  console.log(route);
  useEffect(() => {
    DataAssessment();
  }, []);

  var radio_props = [
    { label: "เช้า", value: "เช้า" },
    { label: "บ่าย", value: "บ่าย" },
  ];

  const handleConfirm = (dates) => {
    var date = formatDate(dates);
    setStartDate(date);
    hideDatePicker();
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

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };
  function DataAssessment() {
    axios
      .get(`${apiURL}/ShowDataAssessmentDetails/${route.params.ID_User}`)
      .then((result) => {
        if (result.status === 200) {
          setAssesment(result.data[0]);
        }
      });
  }
  function ShowDataAssessmentDetails({
    ID_User,
    FullName,
    total_score,
    Q1,
    Q2,
    Q3,
    Q4,
    Q5,
    Q6,
  }) {}

  function _Save() {
    AssigntasksInput({
      ID_User: route.params.ID_User,
      Period: Radio,
      AssignTasks_Time: TimeJob,
      AssignTasks_Date: StartDate,
      AssignTasks_Details: Details,
    })
      .then(async (result) => {
        navigation.navigate("RateEmployeesAdmin");
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("โปรดใส่ข้อมูลอีกครั้ง");
      });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Narbar}>
        <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home2")}>
          <Image
            style={styles.Narbarimg}
            source={require("../assets/picture/back-button.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Header}>
        <Image
          style={styles.Headerimg}
          source={require("../assets/picture/statistic.png")}
        />
        <Image
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            marginTop: 150,
            opacity: 0.1,
          }}
          resizeMode="contain"
          source={require("../assets/picture/LogoBule.png")}
        />
        <Text style={styles.HeaderText}>แนะนำพนักงานแคดดี้(จัดอันดับ)</Text>
      </View>
      <ScrollView>
        <View>
          <View style={styles.DateTime}>
            <Text style={styles.DateText}>รายละเอียด</Text>
            <Text style={styles.RateScoreText}>{assesment.total_score}</Text>
            <Text style={styles.DateText2}>คะแนนการประเมินโดยรวม</Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text style={styles.DateText3}>{assesment.FullName}</Text>
            <Text style={styles.DateText3}>
              รหัสประจำตัว {assesment.ID_User}
            </Text>
            <Text style={styles.DateText3}>คะแนนแต่หล่ะด้าน</Text>

            <View
              style={{
                justifyContent: "space-between",
              }}
            >
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- การแต่งกาย</Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q1}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- กิริยาท่าทาง </Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q2}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- การพูด</Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q3}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- การให้ข้อมูล</Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q4}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- การหยิบจับอุปกรณ์</Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q5}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "48%" }}>
                  <Text style={styles.DateText3}>- การขับรถกอล์ฟ</Text>
                </View>
                <View style={{ width: "23%" }}>
                  <Text style={styles.DateText3}>{assesment.Q6}</Text>
                </View>
                <View style={{ width: "32%" }}>
                  <Text style={styles.DateText3}>คะแนน</Text>
                </View>
              </View>
            </View>
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
                      <Text style={styles.DateText3}>จองตัวพนักงาน</Text>
                      <View
                        style={{
                          flexDirection: "column",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "column",
                              marginTop: 5,
                            }}
                          >
                            <Text style={styles.DateText5}>
                              วัน-เดือน-ปี :{" "}
                            </Text>
                            <Text style={styles.DateText5}>ช่วงเวลา : </Text>
                            <Text style={styles.DateText5}>เวลา : </Text>
                            <Text style={styles.DateText5}>รายละเอียด  </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: "column",
                            }}
                          >
                            <View>
                              <View style={styles.RowDate}>
                                <TouchableOpacity
                                  onPress={() => showDatePicker()}
                                  style={{
                                    width: 170,
                                    backgroundColor: "transparent",
                                  }}
                                >
                                  <View style={styles.inputDate}>
                                    <Text
                                      style={{
                                        paddingLeft: 1,
                                        fontSize: 20,
                                        color: "#00B4DB",

                                        borderColor: "#00B4DB",
                                        borderBottomWidth: 2,
                                        width: 150,
                                        borderBottomWidth: 2,
                                        marginVertical: 17,
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
                            </View>

                            <View
                              style={{
                                marginVertical: 5,
                              }}
                            >
                              <RadioForm
                                formHorizontal={true}
                                buttonColor={"#00B4DB"}
                                radio_props={radio_props}
                                onPress={setRadio}
                                initial={-1}
                                labelStyle={{
                                  fontSize: 18,
                                  color: "#00B4DB",
                                  fontFamily: "MitrExtraLight",
                                  margin: 5,
                                }}
                                selectedButtonColor={"#00B4DB"}
                                buttonSize={15}
                                buttonOuterSize={30}
                              />
                            </View>
                            <View>
                              
                            </View>
                            <TextInput
                              style={styles.input}
                              placeholderTextColor="#00B4DB"
                              placeholder="00.00"
                              onChangeText={(text) => set}
                              value={TimeJob}
                              onChangeText={(text) => setTimeJob(text)}
                            />
                          </View>
                        </View>
                        <View style={{alignItems:'center'}}>
                        <TextInput
                          style={styles.input2}
                          placeholderTextColor="#00B4DB"
                          placeholder=""
                          onChangeText={(text) => set}
                          value={Details}
                          onChangeText={(text) => setDetails(text)}
                          multiline
                          numberOfLines={4}
                          textAlignVertical="center"
                        />
                        </View>
                      
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 10,
                        }}
                      >
                        <View>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() =>
                              _Save(route.params.ID_User.ID_User, route.params)
                            }
                          >
                            <Text style={styles.textStyle}>ตกลง</Text>
                          </Pressable>
                        </View>
                        <View>
                          <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                          >
                            <Text style={styles.textStyle}>ยกเลิก</Text>
                          </Pressable>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
              }}
            >
              <Pressable
                style={[styles.button1, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.txtbutton}>มอบหมายตัวพนักงาน</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
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

  DateTime: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  DateText: {
    fontSize: 25,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 5,
  },

  DateText2: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginVertical: 10,
  },

  DateText3: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 35,
    marginVertical: 10,
  },

  DateText5: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginVertical: 10,
    marginLeft: 15
  },
  DateText4: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 25,
    marginTop: 10,
    marginLeft: 45,
  },
  RateScoreText: {
    fontSize: 75,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    padding: 10,
    height: 60,
    width: 120,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00B4DB",
    marginVertical: 10,
    backgroundColor: "transparent",
    margin: 10,
  },
  button1: {
    alignItems: "center",
    padding: 10,
    height: 70,
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#00B4DB",
    marginVertical: 10,
    backgroundColor: "transparent",
    margin: 10
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginTop: 150,
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
    width: '90%',
    height: 480
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 23,
    width: 70,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    color: "#00B4DB",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
    marginTop: 10,
  },
  input2: {
    height: 80,
    width: 280,
    borderWidth: 1,
    borderColor: "#00B4DB",
    color: "#00B4DB",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
    marginTop: 10,
    
  },
  textStyle: {
    fontFamily: "MitrExtraLight",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
