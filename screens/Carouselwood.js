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
export default function Carouselwood({navigation}) {
  const screenWidth = Dimensions.get("screen").width;

  const [activeIndex, setActiveIndex] = useState(0);
  const [carousel, setCarousel] = useState(null);

  const carouselItems = [
    {
      title: "หลุมที่ 1",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE%201-1.jpg",
      Par: "PAR  4",
      HCP: "HCP 18",
      Red: "304",
      Yellow: "336",
      White: "357",
      Blue: "389",
    },
    {
      title: "หลุมที่ 2",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole2.jpg",
      Par: "PAR  5",
      HCP: "HCP 11",
      Red: "446",
      Yellow: "501",
      White: "528",
      Blue: "552",
    },
    {
      title: "หลุมที่ 3",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-3.jpg",
      Par: "PAR  4",
      HCP: "HCP 3",
      Red: "338",
      Yellow: "377",
      White: "402",
      Blue: "442",
    },
    {
      title: "หลุมที่ 4",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-4.jpg",
      Par: "PAR  3",
      HCP: "HCP 13",
      Red: "126",
      Yellow: "148",
      White: "170",
      Blue: "207",
    },
    {
      title: "หลุมที่ 5",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-5.jpg",
      Par: "PAR  5",
      HCP: "HCP 5",
      Red: "466",
      Yellow: "506",
      White: "528",
      Blue: "556",
    },

    {
      title: "หลุมที่ 6",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-6.jpg",
      Par: "PAR  4",
      HCP: "HCP 1",
      Red: "351",
      Yellow: "369",
      White: "408",
      Blue: "432",
    },
    {
      title: "หลุมที่ 7",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-7.jpg",
      Par: "PAR  3",
      HCP: "HCP 15",
      Red: "122",
      Yellow: "137",
      White: "165",
      Blue: "176",
    },
    {
      title: "หลุมที่ 8",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-8.jpg",
      Par: "PAR  4",
      HCP: "HCP 17",
      Red: "302",
      Yellow: "339",
      White: "363",
      Blue: "387",
    },
    {
      title: "หลุมที่ 9",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/HOLE-9.jpg",
      Par: "PAR  4",
      HCP: "HCP 2",
      Red: "334",
      Yellow: "361",
      White: "420",
      Blue: "474",
    },
    {
      title: "หลุมที่ 10",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole10.jpg",
      Par: "PAR  4",
      HCP: "HCP 7",
      Red: "229",
      Yellow: "330",
      White: "359",
      Blue: "386",
    },
    {
      title: "หลุมที่ 11",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole11.jpg",
      Par: "PAR  5",
      HCP: "HCP 12",
      Red: "340",
      Yellow: "468",
      White: "487",
      Blue: "528",
    },
    {
      title: "หลุมที่ 12",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole13.jpg",
      Par: "PAR  4",
      HCP: "HCP 6",
      Red: "340",
      Yellow: "468",
      White: "487",
      Blue: "528",
    },
    {
      title: "หลุมที่ 13",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole13-1.jpg",
      Par: "PAR  3",
      HCP: "HCP 8",
      Red: "149",
      Yellow: "159",
      White: "177",
      Blue: "203",
    },
    {
      title: "หลุมที่ 14",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole14.jpg",
      Par: "PAR  5",
      HCP: "HCP 4",
      Red: "462",
      Yellow: "534",
      White: "549",
      Blue: "573",
    },
    {
      title: "หลุมที่ 15",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole15.jpg",
      Par: "PAR  4",
      HCP: "HCP 16",
      Red: "327",
      Yellow: "351",
      White: "376",
      Blue: "400",
    },
    {
      title: "หลุมที่ 16",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole16.jpg",
      Par: "PAR  4",
      HCP: "HCP 10",
      Red: "327",
      Yellow: "356",
      White: "388",
      Blue: "416",
    },
    {
      title: "หลุมที่ 17",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole17.jpg",
      Par: "PAR  4",
      HCP: "HCP 10",
      Red: "107",
      Yellow: "150",
      White: "170",
      Blue: "212",
    },
    {
      title: "หลุมที่ 18",
      Image: "https://rtafgolf.net/wp-content/uploads/2021/07/hole18.jpg",
      Par: "PAR  4",
      HCP: "HCP 14",
      Red: "308",
      Yellow: "349",
      White: "370",
      Blue: "397",
    },
  ];
  const arr = Array.from({ length: carouselItems.length }, (_, item) => item);
  const _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          borderRadius: 5,
          // height: 400,
          padding: 5,
          marginHorizontal: 20,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              width: 210,
              height: 340,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
              margin: 10,
            }}
            source={{
              uri: item.Image,
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                fontSize: 25,
                margin: 5,
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 25,
                margin: 5,
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
            >
              {item.Par}
            </Text>
            <Text
              style={{
                fontSize: 25,
                margin: 5,
                fontFamily: "MitrExtraLight",
                color: "#00B4DB",
              }}
            >
              {item.HCP}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 5,
                  backgroundColor: "red",
                  flex: 0.5,
                  paddingTop: 7,
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 25,
                  margin: 5,
                  fontFamily: "MitrExtraLight",
                  color: "red",
                }}
              >
                {item.Red}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 5,
                  backgroundColor: "#FFC629",
                  flex: 0.5,
                  paddingTop: 7,
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 25,
                  margin: 5,
                  fontFamily: "MitrExtraLight",
                  color: "#FFC629",
                }}
              >
                {item.Yellow}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 5,
                  backgroundColor: "#CCCBC7",
                  flex: 0.5,
                  paddingTop: 7,
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 25,
                  margin: 5,
                  fontFamily: "MitrExtraLight",
                  color: "#CCCBC7",
                }}
              >
                {item.White}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{
                  margin: 5,
                  backgroundColor: "#4FA2F5",
                  flex: 0.5,
                  paddingTop: 7,
                }}
              ></Text>
              <Text
                style={{
                  fontSize: 25,
                  margin: 5,
                  fontFamily: "MitrExtraLight",
                  color: "#4FA2F5",
                }}
              >
                {item.Blue}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, }}>
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
            <Text style={styles.HeaderText}>ข้อมูลแต่หล่ะหลุมของสนามกอล์ฟ</Text>
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
          <View style={{flexDirection:'row' , flexWrap : "wrap" , justifyContent: "center"}}>
          {arr.map((id) => (
            <TouchableOpacity style={{borderWidth: 5  , margin : 10 ,width : 60 ,alignItems: "center", borderRadius: 15 ,borderColor: "#00B4DB" }} key={id} onPress={() => carousel._snapToItem(id)}>
              <Text style={{fontSize: 20 ,color : "#00B4DB"  }}>{id+1}</Text>
            </TouchableOpacity>
          ))}
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
