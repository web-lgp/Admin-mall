import axios from 'axios'

const service = axios.create({
    baseURL:"http://localhost:8080",
    timeout:5000
});
service.interceptors.request.use(config=>{
    console.log(config);
    config.headers.Authorization=window.sessionStorage.getItem("Mall-Token");
    return config;
  })
export default service;