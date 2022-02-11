import axios from "axios";
import { apiURL } from "../environment";

export async function AssigntasksInput(data) {
  return await axios.post(`${apiURL}/AssigntasksInput`, data);
}
export async function AssigntasksAll(id) {
  console.log(id);
  return await axios.get(`${apiURL}/AssigntasksAll/` + id);
}
