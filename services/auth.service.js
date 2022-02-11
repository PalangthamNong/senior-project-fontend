import axios from "axios";
import { apiURL } from "../environment";
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function Register(user) {
  return await axios.post(`${apiURL}/post-users`, user);
}

export async function LoginAuth (ID_User,Password){
  return await axios.get(`${apiURL}/login?id=${ID_User}&password=${Password}`)
}

export async function UpdateUser (ID_User,user){
  return await axios.put(`${apiURL}/update/${ID_User}`, { ...user })
}