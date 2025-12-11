import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:3000", // change to deployed backend URL later
});
