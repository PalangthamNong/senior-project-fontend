// import * as React from "react";
import React, { useState } from "react";
import {
  Pressable,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  useWindowDimensions,
  Dimensions,
  ScrollView,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { ShowStatisticsOne } from "../services/statistics.service.js";
import axios from "axios";
import { apiURL } from "../environment";

export default function TabViewExample({ navigation, route }) {
  const layout = useWindowDimensions();
  const [userInactive, setUserInactive] = React.useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setmodalData] = useState([]);

  const { data, date } = route.params;
  React.useEffect(() => {
    Getinactive();
  }, []);
  function Getinactive() {
    const userId = data?.users?.map((item) => item?.user?.ID_User);
    axios
      .get(`${apiURL}/StatisticsInactive`, { params: { id: userId } })
      .then((result) => {
        if (result.status === 200) {
          setUserInactive(result.data.userin);
          // console.log(userInactive);
        }
      });
  }
  const _mapLisrStatstic = (item, index) => {
    return (
      <View
        key={index}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 3,
          width: "100%",
        }}
      >
        <Text style={styles.HeaderText8}>{index + 1}</Text>
        <Text style={styles.HeaderText8}>{item.Typequeue || "ไม่มี"}</Text>
      </View>
    );
  };
  function openDetailModal(item, date) {
    axios
      .get(`${apiURL}/StatisticsAllone/${item}/${date.users[0].Sts_date}`)
      .then((result) => {
        if (result.status === 200) {
          setmodalData(result.data);
          console.log(result.data);
          setModalVisible(true);
        }
      });
  }

  // function openDetailModals() {
  //   const userIds = data?.users?.map((item) => item?.user?.ID_User);
  //   axios
  //     .get(`${apiURL}/StatisticsInactive`, { params: { id: userIds } })
  //     .then((result) => {
  //       if (result.status === 200) {
  //         setUserInactive(result.data.userin);
  //         // console.log(userInactive);
  //       }
  //     });
  // }

  const _mapName = (item, index) => {
    const { user } = item;
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
        key={index}
        // key={user.ID_User}
      >
        <View style={{ width: "24%" }}>
          <Text style={styles.HeaderText7}>{user?.ID_User}</Text>
        </View>
        <View style={{ width: "60%" }}>
          <Text style={styles.HeaderText7}>
            {user?.FirstName} {user?.LastName}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
          }}
        >
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
                    <Text style={styles.HeaderText8}>รายละเอียด</Text>
                    <Text style={styles.HeaderText8}>
                      หมายเลขประจำตัว : {modalData[0]?.Sts_ID_User}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 3,
                        width: "100%",
                      }}
                    >
                      <Text style={styles.HeaderText8}>ครั้งที่</Text>
                      <Text style={styles.HeaderText8}>
                        รูปแบบที่ออกปฎิบัติงาน
                      </Text>
                    </View>
                    <View style={{ height: 150 }}>
                      <ScrollView>{modalData.map(_mapLisrStatstic)}</ScrollView>
                    </View>
                    <Pressable
                      style={[styles.button, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}
                    >
                      <Text style={styles.textStyle}>ย้อนกลับ</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
        <View style={{ width: "25%" }}>
          <Pressable onPress={() => openDetailModal(user?.ID_User, data)}>
            <Image
              style={styles.img1}
              source={require("../assets/picture/document.png")}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  const _mapName2 = (item, index) => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
        key={index}
      >
        <View style={{ width: "50%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.HeaderText7}>{item?.ID_User}</Text>
          </View>
        </View>
        <View style={{ width: "50%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.HeaderText7}>
              {item?.FirstName} {item?.LastName}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  const FirstRoute = () => (
    <ScrollView
      style={{
        flexDirection: "column",
        flex: 1,
        borderWidth: 2,
        borderColor: "#00B4DB",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ width: "25%" }}>
          <Text style={styles.HeaderText7}>หมายเลขประจำตัว</Text>
        </View>
        <View style={{ width: "55%" }}>
          <Text style={styles.HeaderText7}>ชื่อพนักงาน - นามสกุล</Text>
        </View>
        <View style={{ width: "22%" }}>
          <Text style={styles.HeaderText7}>ละเอียด</Text>
        </View>
      </View>
      {data.users?.map(_mapName)}
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView
      style={{
        flexDirection: "column",
        flex: 1,
        borderWidth: 2,
        borderColor: "#00B4DB",
        borderRadius: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <View style={{ width: "50%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.HeaderText7}>หมายเลขประจำตัว</Text>
          </View>
        </View>
        <View style={{ width: "50%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.HeaderText7}>ชื่อพนักงาน - นามสกุล</Text>
          </View>
        </View>
      </View>
      {userInactive.map(_mapName2)}
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "ปฎิบัติงาน" },
    { key: "second", title: "ไม่ปฎิบัติงาน" },
  ]);
  const width = Dimensions.get("screen").width;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Home2")}>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/back-button.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.Header}>
          <Image
            style={styles.Headerimg}
            source={require("../assets/picture/pie-chart.png")}
          />
          <Text style={styles.HeaderText}>สถิติการปฏิบัติงาน</Text>
        </View>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={styles.HeaderText}>{date}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <View style={{ height: 500, width: width * 0.8 }}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </View>
      <View
        style={{
          marginVertical: 10,
          marginLeft: 25,
        }}
      >
        <Text style={styles.HeaderText1}>
          จำนวนพนักงานทั้งหมด {data.total} คน
        </Text>
        <Text style={styles.HeaderText1}>
          พนักงานทั้งหมดทีมาปฎิบัติงาน {data.active} คน
        </Text>
        <Text style={styles.HeaderText1}>
          พนักงานทั้งหมดทีไม่มาปฎิบัติงาน {data.inactive} คน
        </Text>
      </View>
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
    width: '100%'
  },
  Narbarimg: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,

  },
  img1: {
    width: 20,
    height: 20,
    marginTop: 10,
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
  HeaderText7: {
    flexWrap: "wrap-reverse",
    fontSize: 14,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 10,
    marginTop: 10,
  },
  HeaderText8: {
    flexWrap: "wrap-reverse",
    fontSize: 24,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 10,
    marginTop: 10,
  },
  HeaderText8: {
    flexWrap: "wrap-reverse",
    fontSize: 14,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginHorizontal: 10,
    marginTop: 10,
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
    fontSize: 16,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: 350,
    // height: 300,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    width: 150,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
