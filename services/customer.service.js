import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { apiURL } from "../environment";


export async function  VerifyIdentity(name,PhoneNumber){
    return await axios.get(`${apiURL}/VerifyIdentity?FullName_c=${name}&PhoneNumber=${PhoneNumber}`)
  }

  export async function  ChangeVerifyIdentity(id){
    return await axios.put(`${apiURL}/VerifyIdentityCheck/${id}`, { Check_Pass: 1})
  }