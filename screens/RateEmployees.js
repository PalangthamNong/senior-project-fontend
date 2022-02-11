import React, { useEffect, useState } from "react";
import {
  Text,
  Image,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AssessmentInput } from "../services/assessment.service";
export default function RateEmployees({ navigation, route }) {
  const [user, setUser] = useState({});
  const fetchUser = async () => {
    setUser(JSON.parse(await AsyncStorage.getItem("user")));
    console.log(route);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  function _Save() {
    // console.log(value);
    // if (value == null ) {
    //   Alert.alert("กรุณาเลือกช่วงเวลา");
    //   return null;
    // }
    AssessmentInput({
      Q1: gauage[0].rate,
      Q2: gauage[1].rate,
      Q3: gauage[2].rate,
      Q4: gauage[3].rate,
      Q5: gauage[4].rate,
      Q6: gauage[5].rate,

      Period: value,
      Customer_id: route.params.id,
      ID_User: user.ID_User,
    }).then(() => navigation.navigate("MainRateEmployees", {}));
  }
  const [gauage, setGauage] = useState([
    {
      question: "การแต่งกาย",
      rate: 0,
    },
    {
      question: "กิริยาท่าทาง",
      rate: 0,
    },
    {
      question: "การพูด",
      rate: 0,
    },
    {
      question: "การให้ข้อมูล",
      rate: 0,
    },
    {
      question: "การหยิบจับอุปกรณ์",
      rate: 0,
    },
    {
      question: "การขับรถกอล์ฟ",
      rate: 0,
    },
  ]);
  function _renderGauges({ rate, question }, idx) {
    return (
      <View
        key={idx}
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          width: "100%"
    
        }}
      >
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 15,
            flex: 1,
         
          }}
        >
          <Text
            style={{
              marginVertical: 20,
              fontSize: 16,
              color: "#00B4DB",
              fontFamily: "MitrExtraLight",
             

            }}
          >
            {question}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            color: "#00B4DB",
            marginVertical: 20,
            marginRight: 25,
            
            

          }}
        >
          {_renderStar(rate, idx)}
        </View>
      </View>
    );
  }
  function _renderStar(rate, _idx) {
    let idx = 0;
    let arr = [];
    const _addStar = (num) => {
      console.log(num);
      let temp = [...gauage];
      temp[_idx].rate = num + 1;
      setGauage([...temp]);
    };
    for (let i = 0; i < rate; i++) {
      arr.push(
        <TouchableOpacity key={idx++} onPress={() => _addStar(i)}>
          <AntDesign
            name="staro"
            size={24}
            color="#00B4DB"
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      );
    }
    for (let j = 0; j < 5 - rate; j++) {
      arr.push(
        <TouchableOpacity key={idx++} onPress={() => _addStar(j + rate)}>
          <AntDesign
            name="staro"
            size={24}
            color="#000"
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      );
    }
    return arr;
  }
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/Clouds.jpg")}
        resizeMode="cover"
        style={styles.Background}
      >
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
        </View>
        <View style={styles.Header}>
          <Image
            style={styles.Headerimg}
            source={require("../assets/picture/star.png")}
          />
          <Text style={styles.HeaderText}>การประเมินการปฎิบัติงานพนักงาน</Text>
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image style={styles.userimg} source={require("../assets/277.png")} />
          <View style={{width: '100%'}}>
          <ScrollView >
            {gauage.map((item, idx) => _renderGauges(item, idx))}
          </ScrollView>

          </View>
          
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent:"space-evenly",
              
              // marginHorizontal: 10 ,
              paddingHorizontal:80,
              width: 510,
              marginTop: 10

            }}
          >
            <Text style={styles.HeaderText1}>ช่วงเวลาที่ใช้บริการ :</Text>
    
            <DropDownPicker
              open={open}
              containerStyle={{ width: 150 ,height : 120  }}
              value={value}
              items={[
                { label: "ช่วงเช้า", value: "morning" },
                {
                  label: "ช่วงบ่าย",
                  value: "afternoon",
                },
              ]}
              dropDownContainerStyle={{ borderWidth: 0 }}
              style={{
                borderWidth: 0.8,
                backgroundColor: "transparent",
                borderColor: "#00B4DB",
              }}
              selectedItemLabelStyle={{
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
              placeholder="ช่วงเวลา"
              placeholderStyle={{ color: "#00B4DB" }}
              labelStyle={{ color: "#00B4DB" }}
              listItemLabelStyle={{ color: "#00B4DB" }}
              setOpen={setOpen}
              setValue={setValue}
              
            />
            
           
          </View> */}
          <View>
            <TouchableOpacity style={styles.button} onPress={() => _Save()}>
              <Text style={styles.Titlebtn}>บันทึกการประเมิน</Text>
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
    width: 170,
    height: 170,
    marginVertical: 10,
    borderRadius: 80,
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
});
