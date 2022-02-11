import axios from "axios";
import { apiURL } from "../environment";

export async function Number_ServicesInputs(data) {
  return await axios.post(`${apiURL}/Number_Services`, data);
}

export async function Number_ServicesShow() {
  return await axios.get(`${apiURL}/Number_ServicesShow` );
}

export async function InputQueueing(data) {
  return await axios.post(`${apiURL}/InputQueueing`, data);
}
export async function ShowQueueingNow(data) {
  return await axios.get(`${apiURL}/ShowQueueingNow`);
}


export async function DaleteUser(id) {
  return await axios.delete(`${apiURL}/ExitQueue/${id}`);
}

