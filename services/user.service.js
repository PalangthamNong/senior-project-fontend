import axios from "axios";
import { apiURL } from "../environment";

export async function GetUserID(id) {
  return await axios.get(`${apiURL}/confirm-rights/${id}`);
}
export async function UpdateUser(id, user) {
  return await axios.put(`${apiURL}/confirm-rights/${id}`, { user });
}
export async function DaleteUser(id, user) {
  return await axios.delete(`${apiURL}/confirm-rights/${id}`);
}

export async function FindUser(id) {
  return await axios.get(`${apiURL}/find-users`, { params: {id} });
}

export async function UploadImage(id, image) {
  var formData = new FormData();
  formData.append("image", image);
  console.log(`${apiURL}/userProfile/${id}`);
  console.log(image);
  return await axios.put(`${apiURL}/userProfile/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
