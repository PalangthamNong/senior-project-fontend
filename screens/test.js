import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Test({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Narbar}>
        <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserMain")}>
          <Image
            style={styles.Narbarimg}
            source={require("../assets/picture/back-button.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>เลือกชุดข้อมูล</Text>
        <Image
          style={{ position: "absolute", width: 650, height: 650 ,marginTop: 50, opacity:0.1 ,marginRight : 100}}
          resizeMode="contain"
          source={require("../assets/picture/LogoBule.png")}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Carouselwoods")}>
          <View
            style={{
              margin: 10,
            }}
          >
            <Image
              style={styles.ImgData}
              source={require("../assets/picture/birdie.png")}
            />
            <Text style={styles.TextData}>ข้อมูลเกี่ยวกับสนามกอล์ฟ</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Carouselwood")}>
          <View
            style={{
              margin: 10,
            }}
          >
            <Image
              style={styles.ImgData}
              source={require("../assets/picture/golf-bag.png")}
            />
            <Text style={styles.TextData}>ข้อมูลเกี่ยวกับอุปกรณ์กอล์ฟ</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
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
  image: {
    flex: 1,
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
  HeaderText: {
    fontSize: 25,
    marginVertical: 15,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
  },
  ImgData: {
    width: 200,
    height: 200,
  },
  TextData: {
    marginVertical: 10,
    fontSize: 16,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
  },
});
