import axios from "axios";

const axiosInstance = axios.create({
  // local instance of firebase functions 
  // baseURL: "http://127.0.0.1:5001/e-clone-2025-8cefd/us-central1/api", 

  // deployed  version of amazone server on render.com
  baseURL: "https://amazone-api-deploy-0mqu.onrender.com/",
});

export { axiosInstance };
