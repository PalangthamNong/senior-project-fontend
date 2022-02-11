import React, { useState } from "react";
import axios from "axios";
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
import DateTimePicker from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShowStatistics } from "../services/statistics.service.js";
import { SearchBar } from "react-native-screens";
import { apiURL } from "../environment";
import {
  ChangeVerifyIdentity,
  VerifyIdentity,
} from "../services/customer.service";
export default function MainRateEmployees({ navigation }) {
  const [authData, seTauthData] = useState({ Fullname: "", Phone: "" });
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [data, setData] = useState({
    active: 0,
    inactive: 0,
    total: 0,
  });
  const [open, setOpen] = useState(false);
  const [StartDate, setStartDate] = useState("YYYY-MM-DD");
  const [value, setValue] = useState(null);
  const [date, setdate] = useState("YYYY-MM-DD");
  const handleConfirm = (dates) => {
    var date = formatDate(dates);
    console.log(date);
    setdate(date);
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

  function SearchStatistics() {
    if (!date) {
      Alert.alert("เลือกวันเวลาก่อน");
      return null;
    }
    axios
      .get(`${apiURL}/ShowStatistics`, { params: { id: date } })
      .then((result) => {
        if (result.status === 200) {
          setData(result.data);
        }
      });
  }

  function DetailStatic() {
    navigation.navigate("Statistics", {
      data,date
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/Clouds.jpg")}
        resizeMode="cover"
        style={styles.Background}
      >
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home2")} style={{width :'10%'}}>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/back-button.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.Header}>
          <Image
            style={styles.Headerimg}
            source={require("../assets/picture/pie-chart.png")}
          />
          <Text style={styles.HeaderText}>สถิติการปฏิบัติงาน</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginLeft: 35,
              marginTop: 20,
            }}
          >
            <Text style={styles.HeaderText}>ปี-เดือน-วัน </Text>
            <View>
              <View>
                <View style={styles.RowDate}>
                  <TouchableOpacity
                    onPress={() => showDatePicker()}
                    style={{
                      backgroundColor: "transparent",
                    }}
                  >
                    <View style={styles.inputDate}>
                      <Text
                        style={{
                          fontSize: 18,
                          color: "#00B4DB",
                          marginTop: 2,
                          borderColor: "#00B4DB",
                          borderBottomWidth: 2,

                          borderBottomWidth: 2,
                        }}
                      >
                        {date}
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
            </View>
            <View>
              <TouchableOpacity onPress={() => SearchStatistics()}>
                <Image
                  style={styles.Headerimg1}
                  source={require("../assets/picture/search.png")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 25,
            }}
          >
            <Text style={styles.HeaderText01}>{data.total}</Text>
            <Text style={styles.HeaderText}>จำนวนพนักงานทั้งหมด</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 25,
              }}
            >
              <View
                style={{
                  margin: 25,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.HeaderText2}>{data.active}</Text>
                </View>

                <View
                  style={{
                    width: 120,
                  }}
                >
                  <Text style={styles.HeaderText3}>
                    จำนวนพนักงานที่มาปฎิบัติงาน
                  </Text>
                </View>
              </View>

              <View
                style={{
                  margin: 25,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.HeaderText2}>{data.inactive}</Text>
                </View>
                <View
                  style={{
                    width: 150,
                  }}
                >
                  <Text style={styles.HeaderText3}>
                    จำนวนพนักงานที่ไม่มาปฎิบัติงาน
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View>
            <TouchableOpacity
              style={styles.button1}
              onPress={() => DetailStatic()}
            >
              <Text style={styles.Titlebtn}>ดูรายละเอียด</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
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
    width: "100%"
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
    width: '85%'
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
  Headerimg1: {
    width: 20,
    height: 20,
    marginTop: 5,

    marginLeft: 15,
  },

  HeaderText: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  HeaderText01: {
    fontSize: 75,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  HeaderText2: {
    fontSize: 55,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  HeaderText3: {
    flexWrap: "wrap-reverse",
    fontSize: 18,
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
  userimg1: {
    width: 300,
    height: 300,
    marginVertical: 30,
    padding: 10,
    marginTop: 200,
    marginLeft: 210,
    opacity: 0.2,
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
    width: 120,
    backgroundColor: "transparent",
    borderColor: "#00B4DB",
  },
  button1: {
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
