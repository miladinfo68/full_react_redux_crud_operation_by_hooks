import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:7000/api/tutorials",
  headers: {
    "Content-type": "application/json"
  }
});
