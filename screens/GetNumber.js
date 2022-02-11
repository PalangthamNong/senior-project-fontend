import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import io from "socket.io-client";
import { appIP } from "../environment";
export default function GetNumber() {
  const [queue, setQueue] = useState("");
  const [message, setMessage] = useState("");

  //required
  const ws = useRef(io(`ws://${appIP}:5000`)).current;
  useEffect(() => {
    ws.on("queueUpdate", (msg) => {
    });
  }, []);
  const _sendMessage = () => {
    ws.emit("queueUpdate", message);
  };
  //--------------------------------
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        style={{ width: "100%", height: 50, borderWidth: 1, padding: 10 }}
        onChangeText={setMessage}
      />
      <TouchableOpacity
        onPress={_sendMessage}
        style={{
          width: 100,
          backgroundColor: "#ff22aa",
          borderRadius: 7,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Send</Text>
      </TouchableOpacity>
      <Text>{queue}</Text>
    </View>
  );
}
