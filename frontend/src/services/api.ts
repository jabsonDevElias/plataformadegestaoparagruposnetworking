import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("authToken");
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTc2MjYyODIyMywiZXhwIjoxNzYyNjMxODIzfQ.SX5-TF2WvpAgbHaG2g2mh9VT7Qlc0gU2vhhTz_Rrj5k";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;