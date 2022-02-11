import axios from "axios";
import { apiURL } from "../environment";

export async function AssessmentInput(data) {
  return await axios.post(`${apiURL}/AssessmentInput`, data);
}

export async function ShowDataAssessment(data) {
  return await axios.get(`${apiURL}/ShowDataAssessment`, data);
}
