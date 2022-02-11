import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CalenderTestcopy from "./CalenderTestcopy";
export default function Test({navigation}) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CalenderTestcopy/>
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
