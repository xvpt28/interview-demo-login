import axios from "axios";

// Create an axios instance
const request = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000,
});

export default request;
