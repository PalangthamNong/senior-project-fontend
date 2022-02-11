// import React from "react";
// import {
//   View,
//   Image,
//   StyleSheet,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   TouchableHighlight,
//   Dimensions,
// } from "react-native";
// import {
//   Table,
//   TableWrapper,
//   Row,
//   Rows,
//   Col,
//   Cols,
//   Cell,
// } from "react-native-table-component";
// import { SafeAreaView } from "react-native-safe-area-context";
// export default function CalenderTest({ navigation }) {
//   return (
//     <SafeAreaView>

//     </SafeAreaView>
//   );
// }
// const styles = StyleSheet.create({
//
// });

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
          <Text style={styles.DateText}> สถิติการปฎิบัติงานวันนี้</Text>
        </View>

        <View>
          <Table borderStyle={{ borderColor: "transparent" }}>
            <Row
              data={state.tableHead}
              style={styles.head}
              textStyle={styles.text}
            />
            {state.tableData.map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellIndex === 3 ? element(cellData, index) : cellData}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </View>
        <View>
          <Text style={styles.ShowDataText}>จำนวนพนักงานทั้งหมด  400  คน</Text>
          <Text style={styles.ShowDataText}>จำนวนพนักงานที่มาปฎิบัติงานทั้งหมด  390  คน</Text>
          <Text style={styles.ShowDataText}>จำนวนพนักงานที่ไม่มาปฎิบัติงานทั้งหมด  10  คน</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  head: { height: 40, backgroundColor: "#fff" ,borderWidth: 2, borderColor: "#00B4DB"  },
  text: { margin: 10, color: "#00B4DB", fontFamily: "MitrExtraLight", fontSize : 11 },
  row: { flexDirection: "row", backgroundColor: "#fff", },
  btn: { width: 58, height: 18, backgroundColor: "#78B7BB", borderRadius: 2 },
  btnText: { textAlign: "center", color: "#fff" },
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
    marginVertical: 10
  }
});
