import React from "react";
import { View, StyleSheet, Modal, Text, Pressable } from "react-native";
export default function ConfirmDialog({ visible, onClose, onConfirm, title }) {
    // console.
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={visible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Pressable
                style={[styles.button_ps, styles.buttonClose]}
                onPress={() => {
                  onConfirm();
                  onClose(false);
                }}
              >
                <Text style={styles.textStyle}>ยืนยัน</Text>
              </Pressable>
              <Pressable
                style={[styles.button_ps, styles.buttonClose]}
                onPress={() => onClose(false)}
              >
                <Text style={styles.textStyle}>ย้อนกลับ</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
  },
  Narbarimg: {
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "flex-end",
    marginTop: 20,
    marginLeft: 65,
  },
  Narbartext: {
    fontSize: 25,
    fontFamily: "MitrExtraLight",
    marginLeft: 10,
    margin: 10,
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
  userimg: {
    width: 100,
    height: 100,
    marginVertical: 30,
  },
  HeaderText1: {
    fontSize: 20,
    color: "#00B4DB",
    fontFamily: "MitrExtraLight",
    marginTop: 20,
  },
  button: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 170,
    backgroundColor: "transparent",
    borderColor: "#00B4DB",
  },
  button_ps: {
    alignItems: "center",
    padding: 8,
    margin: 20,
    borderWidth: 4,
    borderRadius: 50,
    width: 100,
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
  Datauser: {
    flexDirection: "row",
    margin: 10,
  },
  DatauserText: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    margin: 18,
  },
  DatauserShow: {
    fontSize: 18,
    fontFamily: "MitrExtraLight",
    color: "#00B4DB",
    marginLeft: 45,
    margin: 15,
  },
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 0,
    borderColor: "#00B4DB",
    borderBottomWidth: 1,
    color: "#00B4DB",
    fontSize: 20,
    fontFamily: "MitrExtraLight",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
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
    fontFamily: "MitrExtraLight",
    fontSize: 16,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "MitrExtraLight",
    fontSize: 20,
    color: "#00B4DB",
  },
});
