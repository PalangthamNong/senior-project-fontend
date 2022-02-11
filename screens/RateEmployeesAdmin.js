

import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  
} from "react-native";
import { apiURL } from "../environment";
import { AssessmentInput } from "../services/assessment.service";

function ShowDataAssessment({ID_User,FullName, total_score},indx ,{navigation}) {
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 10,
        justifyContent: "space-between",
        width:'100%'
      }}
      key={indx}
    >
      <Text style={[styles.ShowDataText,{width:'5%'}]}>{indx+1}</Text>
      <Text style={[styles.ShowDataText,{width:'20%'}]}>{ID_User}</Text>
      <Text style={[styles.ShowDataText,{width:'40%'}]}>{FullName}</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent:'flex-end',
          width:'18%',
          
        }}
      >
        <Text style={styles.ShowRateText}>{total_score}</Text>
        <Image
          style={styles.ShowDataimg}
          source={require("../assets/picture/star.png")}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("RateEmployeesAdminDetails",{ID_User})}

        >
          <Image
            style={styles.ShowRateimg}
            source={require("../assets/picture/go-to-location.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RateEmployeesAdmin({navigation}) {
  const [assesment, setAssesment] = useState([]);
  useEffect(() => {
    DataAssessment();
  }, []);
  function DataAssessment() {
    axios.get(`${apiURL}/ShowDataAssessment`).then((result) => {
      if (result.status === 200) {
        setAssesment(result.data);
      }
    });
  }
  return (
    <View style={styles.container}>
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
        <Text style={styles.HeaderText}>แนะนำพนักงานแคดดี้(จัดอันดับ)</Text>
      </View>
      <Image
              style={{
                position: "absolute",
                width: 600,
                height: 600,
                marginTop: 150,
                opacity: 0.05,
              }}
              resizeMode="contain"
              source={require("../assets/picture/LogoBule.png")}
            />
      <View style={styles.DateTime}>
        <Text style={styles.DateText}> อันดับพนักงาน</Text>
      </View>

      <View
        style={{
          flexDirection: "column",
        }}
      >
        {assesment.map((item, indx) => ShowDataAssessment(item, indx,{navigation}))}

        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            justifyContent: "space-between",
          }}
        ></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
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
  },
  DateText: {
    fontSize: 25,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    margin: 20,
  },
  statisticsimg: {
    width: 12,
    height: 12,
  },
  ShowDataText: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
 
  },
  ShowDataimg: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
  ShowRateText: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    margin: 2,
  },
  ShowRateimg: {
    width: 22,
    height: 22,
    marginTop: 5,
  },
});
