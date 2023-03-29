import axios from "axios";
const authAxios = axios.create({
  baseURL: "https://localhost:7239/api",
  headers: {
    Authorization: `Token ${localStorage.getItem("token")}`,
  },
});
export default authAxios;
