import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
export default function Carouselwoods({ navigation }) {
  const screenWidth = Dimensions.get("screen").width;
  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState(null);
  const carouselItems = [
    {
      title: "หัวไม้หนึ่ง (DRIVER)",
      Image:
        "https://cdn.shopify.com/s/files/1/1381/7155/products/XXIO-10-DRIVER-BLUE_grande.jpg?v=1611121657",
      Long: "ระยะโดยเฉลี่ย",
      Long1: "220-270 หลา",
      text: "เป็นหัวไม้ที่มีขนาดใหญ่ที่สุด",
    },
    {
      title: "หัวไม้แฟร์เวย์           (FAIRWAY WOOD)",
      Image:
        "https://cdn.shopify.com/s/files/1/1381/7155/products/Srixon_Z_355_Fairway_grande.jpg?v=1526467322",
      Long: "ระยะโดยเฉลี่ย",
      Long1:
        "#3 180-210 หลา\n#5 160-190 หลา\n#7 140-160 หลา\n#9 120-140 หลา\n#11 100-120 หลา",
      text: "มีขนาดเล็กกว่าหัว ไม้หนึ่ง",
    },
    {
      title: "หัวไม้ไฮบริด (HYBRID)",
      Image:
        "https://image.globalgolf.com/dynamic/1033036/aan/sole-view/titleist-816-h1-hybrid.jpg?s=1240",
      Long: "ระยะโดยเฉลี่ย",
      Long1:
        "#1 220-200 หลา\n#2 180-200 หลา\n#3 160-180 หลา\n#4 140-160 หลา\n#5 120-140 หลา",
      text: "เป็นหัวไม้ที่เพิ่งเกิด ขึ้นมาใหม่",
    },
    {
      title: "ชุดเหล็ก (IRON SET)",
      Image:
        "https://hotgolfclub.com/hotgolfshop/wp-content/uploads/2021/01/TM21IRN_TA170_SIM-2-Max-OS_3Q_v2.jpg",
      Long: "ระยะโดยเฉลี่ย",
      Long1:
        "#2 180-200 หลา\n#3 170-190 หลา\n#4 160-180 หลา\n#5 150-170 หลา\n#6 140-160 หลา\n#7 130-150 หลา\n#8 120-140 หลา\n#9 110-130  หลา",
      text: "ชุดเหล็กจะประกอบด้วย เหล็กจำนวน 6-8 ชิ้น ซึ่งเหล็กแต่ละเบอร์จะมีขนาด ขององศาหน้าไม้และความยาว ที่ต่างกัน",
    },
    {
      title: "ชุดเหล็ก (IRON SET)",
      Image:
        "https://hotgolfclub.com/hotgolfshop/wp-content/uploads/2021/01/TM21IRN_TA170_SIM-2-Max-OS_3Q_v2.jpg",
      Long: "ระยะโดยเฉลี่ย",
      Long1: "PW 100-120 หลา\nAW 90-110 หลา\nSW 80-100 หลา\nLW 70-90 หลา",
      text: "  เวดจ์เป็นอุปกรณ์ที่ใช้ สำหรับการเล่นลูกใน ระยะสั้นรอบๆกรีน",
    },
    {
      title: "พัตเตอร์ (PUTTER) ",
      Image:
        "https://th-test-11.slatic.net/p/f835723dc86851adc1500540b2ff2619.jpg",
      Long: "ระยะโดยเฉลี่ย",
      Long1: "(บนกรีนเท่านั้น)",
      text: "  พัตเตอร์เป็นอุปกรณ์ที่ จำเป็นและใช้มากที่สุด จากบรรดาไม้กอล์ฟทั้ง 14 อันภายในถุงกอล์ฟ เพราะเป็นไม้กอล์ฟที่ต้องใช้ พัตต์เพื่อให้ลูกกอล์ฟลงหลุม",
    },
  ];

  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          height: 900,
          padding: 5,
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 30,
            margin: 10,
            fontFamily: "MitrExtraLight",
            color: "#00B4DB",
            paddingHorizontal: 0,
          }}
        >
          {item.title}
        </Text>
        <Image
          style={{
            width: 200,
            height: 250,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={{
            uri: item.Image,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            margin: 10,
            flexWrap: "wrap",
            fontFamily: "MitrExtraLight",
            color: "#00B4DB",
          }}
        >
          {item.Long}
        </Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            
          }}
        >
          <Text
            style={{
              fontSize: 20,
              flexWrap: "wrap-reverse",
              fontFamily: "MitrExtraLight",
              color: "#00B4DB",
              alignItems: "center",
            
              
            }}
          >
            {item.Long1}
          </Text>
        </View>
        <View>
          <Text
            style={{
              flexWrap: "wrap-reverse",
              fontSize: 20,
              margin: 10,
              flexWrap: "wrap",
              fontFamily: "MitrExtraLight",
              color: "#00B4DB",
              paddingHorizontal: 55,
              alignItems: "center",
            }}
          >
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/picture/Clouds.jpg")}
        resizeMode="cover"
        style={styles.image}
      >
        <ScrollView>
          <View style={styles.Narbar}>
            <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Test")}>
              <Image
                style={styles.Narbarimg}
                source={require("../assets/picture/back-button.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.Header}>
            <Image
              style={styles.Headerimg}
              source={require("../assets/picture/information.png")}
            />
            <Text style={styles.HeaderText}>ประเภทของไม้กอล์ฟ</Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Carousel
              layout={"default"}
              ref={(ref) => setCarousel(ref)}
              data={carouselItems}
              sliderWidth={300}
              itemWidth={screenWidth}
              renderItem={_renderItem}
              onSnapToItem={setActiveIndex}
            />
          </View>
        </ScrollView>
      </ImageBackground>
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
  Carousel: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  CarouselMain: {
    flexDirection: "row",
  },
});
