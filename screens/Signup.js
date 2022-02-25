import React, { Component } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  Button,
  pickImage,
  image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { SafeAreaView } from "react-native-safe-area-context";

import DateTimePicker from "react-native-modal-datetime-picker";
import RadioForm from "react-native-simple-radio-button";
import { Register } from "../services/auth.service";
import { UploadImage } from "../services/user.service";

var radio_props = [
  { label: "ชาย", value: "ชาย" },
  { label: "หญิง", value: "หญิง" },
];

// const radioButtonsData = [
//   {
//     id: "1",
//     label: "Male",
//     value: "option1",
//     color: "red",
//     selected: true,
//   },
//   {
//     id: "2",
//     label: "Female",
//     value: "option2",
//     color: "red",
//     selected: false,
//   },
// ];

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.navigation = props.navigation;

    this.state = {
      checked: "M",
      user_id: "",
      lang: "",
      firstname: "",
      position: "",
      dept: "",
      select_1: [],
      select_2: [],
      select_3: [],
      problem_type: "",
      course: "",
      course_id: "",
      showCourse: false,
      inputCourse: false,
      nameCourse: "",
      courseselect: "",
      lang_id: 1,
      expense: null,
      showinputExpense: true,
      showuninputExpense: false,
      startDate: "DD/MM/YYYY",
      endDate: "DD/MM/YYYY",
      currentDate: "DD/MM/YYYY",
      startdateeng: "",
      startdatethai: "",
      enddateeng: "",
      enddatethai: "",
      isStart: false,
      isDatePickerVisible: false,
      date: new Date(),
      startcul: "",
      endcul: "",
      total: "0",
      place: "",
      nameplace: "",
      nameplace_etc: "",
      courseItem: [],
      courseItem2: [],
      upload_file: null,
      profile: [],
      culMonths: "",
      courseComfrom: [],
      select_all: [],
      gender: "",
      userData: {
        FirstName: "",
        ID_User: "",
        LastName: "",
        Birthdate: "",
        Password: "",
        Gender: "",
        Email: "",
        Address: "",
        Posittions_ID: 0,
        Phone: "",
        ConfirmPassword: "",
      },
      imageUpload: null,
      urlImage: null,
    };
    this._BeforeSave = this._BeforeSave.bind(this);
  }

  // async componentDidMount() {
  //   this.setState({
  //     user_id: id,
  //     dateNow: this.formatDate(now()),
  //     dateTimeNow: this.formatDateTime(now()),
  //     dateThai: this.formatThai(now()),
  //     dateEng: this.formatEng(now()),
  //   });
  // }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      this.setState({ imageUpload: result });
      this.setState({ urlImage: result.uri });
    }
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };
  _BeforeSave() {
    if(!this.state.imageUpload){
      Alert.alert("กรุณาเลือกรูปภาพของตนเอง");
      return null;
    }
    if (this.state.userData.FirstName === "") {
      Alert.alert("กรุณากรอกชื่อให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.FirstName.length > 255) {
      Alert.alert("กรุณากรอกชื่อใหม่อีกครั้ง เนื่องจากมีจำนวนเกินจำกัด");
      return null;
    }
    if (this.state.userData.LastName === "") {
      Alert.alert("กรุณากรอกนามสกุลให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.LastName.length > 255) {
      Alert.alert("กรุณากรอกนามสกุลใหม่อีกครั้ง เนื่องจากมีจำนวนเกินจำกัด");
      return null;
    }
   
    if (this.state.userData.ID_User === "") {
      Alert.alert("กรุณากรอกข้อมูลรหัสประจำตัวให้ครบถ้วน");
      return null;
    }
    console.log("this.state.userData.ID_User",this.state.userData.ID_User.length);
    if (
      !/\d$/.test(this.state.userData.ID_User) ||
      this.state.userData.ID_User.length > 4 ||
      this.state.userData.ID_User.length < 4
    ) {
      Alert.alert(
        "กรุณากรอกรหัสประจำตัวใหม่โดยมีเงื่อนไขคือ *** เป็นตัวเลข 4 หลัก *** "
      );
      return null;
    }

    if (this.state.userData.Password === "") {
      Alert.alert("กรุณากรอกข้อมูลรหัสผ่านให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.ConfirmPassword === "") {
      Alert.alert("กรุณากรอกข้อมูลยืนยันรหัสผ่านให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.Password.length > 255) {
      Alert.alert("กรอกข้อมูลรหัสผ่านมากเกินกำหนดกรุณากรอกใหม่อีกครั้ง");
      return null;
    }
    if (this.state.userData.Gender === "") {
      Alert.alert("กรุณาเลือกเพศ");
      return null;
    }
    if (this.state.startDate === "DD/MM/YYYY") {
      Alert.alert("กรุณาเลือกวันเดือนปีเกิด");
      return null;
    }
    if (this.state.userData.Phone === "") {
      Alert.alert("กรุณากรอกหมายเลขโทรศัพท์");
      return null;
    }

    if (!/\d$/.test(this.state.userData.Phone)  || this.state.userData.Phone.length  > 10 || this.state.userData.Phone.length  < 10 ) {
      Alert.alert("กรุณากรอกหมายเลขโทรศัพท์ให้ครบ 10 หลัก");
      return null;
    }

    if (this.state.userData.Email === "") {
      Alert.alert("กรุณากรอกที่อยู่อีเมลล์ให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.Email > 255) {
      Alert.alert("กรุณากรอกที่อยู่อีเมลล์ใหม่อีกครั้ง เนื่องจากมีจำนวนเกินจำกัด");
      return null;
    }
    console.log("this.state.userData.Email",this.state.userData.Email);
    if (!/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(this.state.userData.Email) ) {
      Alert.alert("กรุณากรอกที่อยู่อีเมลล์ให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.Address === "") {
      Alert.alert("กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน");
      return null;
    }
    if (this.state.userData.Address.length > 255) {
      Alert.alert("กรุณากรอกข้อมูลที่อยู่เกินที่กำหนดไว้");
      return null;
    }
    if (this.state.userData.Password !== this.state.userData.ConfirmPassword) {
      Alert.alert("โปรดกรอกรหัสผ่านให้ตรงกัน");
      return null;
    }
    if (this.state.userData.pickImage) {
      Alert.alert("กรุณากรอกข้อมูลที่อยู่เกินที่กำหนดไว้");
      return null;
    }
    this._Save();
  }
  _Save() {
    // Alert.alert("ดีใจด้วยน้า กรอกครบสักทีไอสัส");

    Register(this.state.userData)
      .then((res) => {
        if (res.status === 200) {
          const uriArray = this.state.imageUpload.uri.split(".");
          const filetype = uriArray[uriArray.length - 1];
          UploadImage(this.state.userData.ID_User, {
            uri: this.state.imageUpload.uri,
            name: `${Date.now()}.${filetype}`,
            type: `image/${filetype}`,
          })
            .then(async (res) => {
              if (res.status === 200) {
                Alert.alert("ระบบได้ทำการส่งคำขอไปยังผู้ดูแลพนักงานเรียบร้อย");
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
              }
            })
            .catch((e) => {
              this.navigation.navigate("Login");
              // console.log(e.response);
            });
        }
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(this.state.userData);
  }
  handleConfirm = (dates) => {
    var date = this.formatDate(dates);
    var dates = this.formatDatetotal(dates);
    var datethai = this.formatThai(dates);
    var dateeng = this.formatEng(dates);

    if (this.state.isStart) {
      this.setState({
        startDate: date,
        startcul: dates,
        isStart: false,
        startdatethai: datethai,
        startdateeng: dateeng,
      });
      this.setState({ userData: { ...this.state.userData, BirthDate: date } });
      if (this.state.endcul != 0) {
        this.culDate(dates, this.state.endcul);
      }
    } else {
      this.setState({
        endDate: date,
        endcul: dates,
        enddatethai: datethai,
        enddateeng: dateeng,
      });

      if (this.state.startcul != 0) {
        this.culDate(this.state.startcul, dates);
      }
    }
    this.changPlace();
    this.hideDatePicker();
  };

  showDatePicker = (props) => {
    this.setState({ isDatePickerVisible: true });
    if (props == "start") {
      this.setState({ isStart: true });
    }
  };
  formatDate = (date) => {
    let d = new Date(date),
      month = d.getMonth() + 1 + "",
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
  };
  formatDateTime = (date) => {
    let d = new Date(date),
      month = "" + d.getMonth() + 1 + "",
      day = "" + d.getDate(),
      year = d.getFullYear(),
      H = d.getHours(),
      M = d.getMinutes(),
      S = d.getSeconds();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    if (M.length < 2) M = "0" + M;
    if (S.length < 2) S = "0" + S;
    let dates = [day, month, year].join("/") + " " + [H, M, S].join(":");

    return dates;
  };
  formatDatetotal = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("/");
  };
  formatThai = (date) => {
    var monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    let d = new Date(date),
      month = monthNamesThai[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear() + 543;
    return [day, month, year].join(" ");
  };
  formatEng = (date) => {
    var monthNamesEng = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date(date),
      month = monthNamesEng[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    return [day, month, year].join(" ");
  };
  formatThaiCountMonth = (date, m) => {
    var monthNamesThai = [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤษจิกายน",
      "ธันวาคม",
    ];
    let d = new Date(date);
    d.setDate(d.getDate() + 1);
    d.setMonth(d.getMonth() + Number(m));
    let month = monthNamesThai[d.getMonth()];
    let day = "" + d.getDate();
    let year = d.getFullYear() + 543;
    return [day, month, year].join(" ");
  };
  formatEngCountMonth = (date, m) => {
    var monthNamesEng = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let d = new Date(date);
    d.setDate(d.getDate() + 1);
    d.setMonth(d.getMonth() + Number(m));
    let month = monthNamesEng[d.getMonth()],
      day = "" + d.getDate(),
      year = d.getFullYear();
    return [day, month, year].join(" ");
  };
  changPlace = (text) => {
    this.setState({
      nameplace_etc: text,
      place: "",
      nameplace: "",
    });
    this.dateCount();
  };

  dateCount = () => {
    let countMonthEng = this.formatEngCountMonth(
      this.state.endcul,
      this.state.form_month
    );
    let countMonthThai = this.formatThaiCountMonth(
      this.state.endcul,
      this.state.form_month
    );
    this.setState({
      countMonthEng: countMonthEng,
      countMonthThai: countMonthThai,
    });
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/picture/BlueRaspberry.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <ScrollView>
            <Text style={[styles.Hd, { fontFamily: "MitrExtraLight" }]}>
              {" "}
              สมัครสมาชิก
            </Text>
            <View style={styles.container}>
              <View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {this.state.urlImage ? (
                    <Image
                      source={{ uri: this.state.urlImage }}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 200,
                        borderWidth: 1,
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/picture/user.png")}
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 200,
                        borderWidth: 1,
                      }}
                    />
                  )}
                  <Button
                    title="แก้ไขรูปภาพ"
                    onPress={() => this.pickImage()}
                  />
                </View>
              </View>
              <Image
                style={{
                  position: "absolute",
                  width: 600,
                  height: 600,
                  marginTop: 150,
                  opacity: 0.1,
                }}
                resizeMode="contain"
                source={require("../assets/picture/Logo.png")}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                value={this.state.userData.FirstName}
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      FirstName: text,
                    },
                  })
                }
                placeholder="ชื่อ"
              />
              <TextInput
                style={[styles.input]}
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      LastName: text,
                    },
                  })
                }
                value={this.state.userData.LastName}
                placeholderTextColor="#fff"
                placeholder="นามสกุล"
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      ID_User: text,
                    },
                  })
                }
                value={this.state.userData.ID_User}
                placeholder="รหัสประจำตัว"
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      Password: text,
                    },
                  })
                }
                value={this.state.userData.Password}
                placeholder="รหัสผ่าน"
                secureTextEntry={true}
              />
              <TextInput
                style={styles.input}
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      ConfirmPassword: text,
                    },
                  })
                }
                value={this.state.userData.ConfirmPassword}
                placeholderTextColor="#fff"
                placeholder="ยืนยันรหัสผ่าน"
                secureTextEntry={true}
              />
              <Text style={styles.rdbtn}>เพศ</Text>
              <View style={styles.rdbtn}>
                <RadioForm
                  formHorizontal={true}
                  buttonColor={"#fff"}
                  radio_props={radio_props}
                  initial={-1}
                  onPress={(value) => {
                    this.setState({
                      userData: {
                        ...this.state.userData,
                        Gender: value,
                      },
                    });
                  }}
                  labelStyle={{
                    fontSize: 18,
                    color: "#fff",
                    fontFamily: "MitrExtraLight",
                    margin: 8,
                  }}
                  selectedButtonColor={"#fff"}
                  buttonSize={15}
                  buttonOuterSize={30}
                />
              </View>

              <View style={styles.RowDate}>
                <Text
                  style={{
                    fontSize: 20,
                    color: "#fff",
                    fontFamily: "MitrExtraLight",
                  }}
                >
                  วัน/เดือน/ปีเกิด :
                </Text>
                <TouchableOpacity onPress={() => this.showDatePicker("start")}>
                  <View style={styles.inputDate}>
                    <Text
                      style={{ paddingLeft: 10, fontSize: 20, color: "#fff" }}
                    >
                      {this.state.startDate}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                locale="th_TH"
                isVisible={this.state.isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />

              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="หมายเลขโทรศัพท์"
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      Phone: text,
                    },
                  })
                }
                value={this.state.userData.Phone}
              />
              <TextInput
                style={styles.input}
                placeholderTextColor="#fff"
                placeholder="อีเมล์"
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      Email: text,
                    },
                  })
                }
                value={this.state.userData.Email}
              />
              <TextInput
                style={[styles.input, { height: 80 }]}
                placeholderTextColor="#fff"
                onChangeText={(text) =>
                  this.setState({
                    userData: {
                      ...this.state.userData,
                      Address: text,
                    },
                  })
                }
                value={this.state.userData.Address}
                placeholder="รายละเอียดที่อยู่"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.btn}>
                <TouchableOpacity
                  style={styles.button1}
                  onPress={this._BeforeSave}
                >
                  <Text
                    style={[styles.Titlebtn, { fontFamily: "MitrExtraLight" }]}
                  >
                    ยืนยัน
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={() => this.navigation.goBack()}
                >
                  <Text
                    style={[
                      styles.Titlebtn,
                      { color: "#00B4DB", fontFamily: "MitrExtraLight" },
                    ]}
                  >
                    ยกเลิก
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  Hd: {
    color: "#fff",
    fontSize: 40,
    margin: 10,
  },

  Logo: {
    width: 200,
    height: 200,
    margin: 20,
  },
  image: {
    flex: 1,
    flexDirection: "column",
  },
  input: {
    height: 40,
    width: 350,
    margin: 12,
    borderWidth: 0,
    borderColor: "#fff",
    borderBottomWidth: 1,
    color: "#fff",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
  },
  button1: {
    alignItems: "center",
    backgroundColor: "#0f9b0f",
    padding: 25,
    margin: 20,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 25,
    margin: 20,
    borderRadius: 10,
  },
  Titlebtn: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  TitleRs: {
    fontSize: 20,
    color: "#ffff",
    textDecorationLine: "underline",
  },
  Tcho: {
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    flexDirection: "row",
  },
  fieldSet: {
    margin: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: "center",
    borderColor: "#000",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 10,
    fontWeight: "bold",
  },
  rdbtn: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 350,
    alignItems: "center",
    margin: 6,
    fontSize: 20,
    color: "#fff",
    fontFamily: "MitrExtraLight",
    margin: 10,
  },

  inputDate: {
    fontSize: 20,
    color: "#fff",
  },

  RowDate: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 350,
    alignItems: "center",
    margin: 10,
  },
});
