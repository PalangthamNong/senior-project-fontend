import React from "react";
import { View ,Image,
    StyleSheet,
    ImageBackground,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    TouchableHighlight,
    Dimensions, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function CalenderTest({navigation}) {
  return (
    <SafeAreaView>
      <View style={styles.Narbar}>
        <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image
            style={styles.Narbarimg}
            source={require("../assets/picture/back-button.png")}
          />
        </TouchableOpacity>
      </View>
      {/* <View style={{}}>
        <Calendar style={{ width: "100%", height: "100%" }} />
        
      </View> */}
    </SafeAreaView>
  );
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
})
