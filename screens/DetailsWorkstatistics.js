
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";

export default class ExampleFour extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ["หมายเลขประจำตัว", "ชื่อพนักงาน", "จำนวน", "สถานะการมาทำงาน","รายละเอียด"],
      tableData: [
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
        ["1", "2", "3", "4"],
        ["a", "b", "c", "d"],
      ],
    };
  }

  _alertIndex(index) {
    Alert.alert(`This is row ${index + 1}`);
  }

  render() {
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
       
           <Image
              style={styles.statisticsimg}
              source={require("../assets/picture/file.png")}
            />
        
      </TouchableOpacity>
    );

    return (
      <View style={styles.container}>
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
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
          <Text style={styles.HeaderText}>สถิติการปฎิบัติงาน</Text>
        </View>
        <View style={styles.DateTime}>
          <Text style={styles.DateText}> รายละเอียดสถิติการปฎิบัติงาน</Text>
        </View>
        <View style={styles.DateTime}>
        <Image
              style={styles.Logo}
              source={require("../assets/picture/userblue.png")}
            />
        </View>
        <View>
          <Text style={styles.ShowDataText}>รหัสประจำตัว  001</Text>
          <Text style={styles.ShowDataText}>นาย พลังธรรม จันทภา</Text>
          <Text style={styles.ShowDataText}>ออกปฎิบัติงาน  2 รอบ</Text>
          <Text style={styles.ShowDataText}>ผลการประเมินทั้งหมด</Text>
        </View>
      </View>
    );
  }
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
    margin: 20
  },
  statisticsimg: {
    width: 12,
    height : 12
  },
  ShowDataText: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginVertical: 10,
    marginLeft: 10
    
  },
  Logo: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
