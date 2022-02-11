import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { AssigntasksAll } from "../services/assigntasks.service";

export default function CalenderTestcopy({ navigation }) {
  const [assignTask, setAssignTask] = useState({});
  const _fetchAssignTasks = async () => {
    const user = JSON.parse(await AsyncStorage.getItem("user"));
    AssigntasksAll(user.ID_User)
      .then((res) => {
        if (res.status === 200) {
          _mapAssignTask(res.data);
        }
        // console.log(items);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const _mapAssignTask = (data) => {
    let items = {};
    data.forEach((item) => {
      if (!items[item.AssignTasks_Date]) items[item.AssignTasks_Date] = [];
      if (!items[item.AssignTasks_Date].dots)
        items[item.AssignTasks_Date].dots = [];

      if (item.Period == "เช้า") {
        items[item.AssignTasks_Date].dots.push(morning);
      } else if (item.Period == "บ่าย") {
        items[item.AssignTasks_Date].dots.push(afternoon);
      }
      items[item.AssignTasks_Date].push({
        name: item.AssignTasks_Time,
        detail: item.AssignTasks_Details,
      });
    });
    setAssignTask(items);
  };
  useEffect(() => {
    _fetchAssignTasks();
  }, []);
  const morning = {
    key: "morning",
    color: "violet",
    selectedDotColor: "violet",
  };
  const afternoon = {
    key: "afternoon",
    color: "orange",
    selectedDotColor: "orange",
  };
  return (
    <View>
      <View style={{ width: "100%", height: "100%", padding: 10 }}>
        <View style={styles.Narbar}>
          <Text style={styles.Narbartext}>ระบบจัดการพนักงานแคดดี้</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={styles.Narbarimg}
              source={require("../assets/picture/back-button.png")}
            />
          </TouchableOpacity>
        </View>
        <Agenda
          items={assignTask}
          markingType={"multi-dot"}
          markedDates={assignTask}
          onCalendarToggled={(calendarOpened) => {
            console.log(calendarOpened);
          }}
          renderItem={(item, firstItemInDay) => {
            return (
              <TouchableOpacity
                style={[styles.AgendaItem, { height: item.height }]}
                onPress={() => {}}
              >
                <Text style={{ fontFamily: "MitrExtraLight", color: "black" }}>
                  ข้อมูลการนัดหมาย
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "MitrExtraLight",
                      color: "black",
                      marginTop: 10,
                    }}
                  >
                    ระยะเวลา :
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MitrExtraLight",
                      color: "black",
                      marginTop: 11,
                      fontSize: 13,
                    }}
                  >
                    {" "}
                    {item.name}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontFamily: "MitrExtraLight",
                      color: "black",
                      marginTop: 10,
                    }}
                  >
                    รายละเอียด : 
                  </Text>
                  <Text
                    style={{
                      fontFamily: "MitrExtraLight",
                      color: "black",
                      marginTop: 10,
                      marginLeft: 5
                    }}
                  >
                      {item.detail}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          style={{ height: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  AgendaItem: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  AgendaEmptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  Narbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 20,
    backgroundColor: "#fff",
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
});
