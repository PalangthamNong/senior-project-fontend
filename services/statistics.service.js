import axios from "axios";
import { apiURL } from "../environment";

export async function ShowStatisticsOne(id) {
  return await axios.get(`${apiURL}/StatisticsAllone/${id}`);
}

export async function ShowStatistics() {
  return await axios.get(`${apiURL}/ShowStatistics` );
}

export async function StatisticsInput(data) {
  console.log(`${apiURL}/StatisticsInput`);
  return await axios.post(`${apiURL}/StatisticsInput`,data);
}

export async function Update(id,numberService) {
  console.log(numberService)
  return await axios.put(`${apiURL}/UpdateNumber_Services/${id}`,  {numberService} );
}