import axios from "axios";
// axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
// const DOMAIN = "https://i8a408.p.ssafy.io";
const DOMAIN = "/api";
axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해
export const request = (method, url, data) => {
  console.log('axios')
  return axios({
    method,
    url: DOMAIN + url+`?userEmail=${data.userEmail}&userPwd=${data.userPwd}`,
  })
    .then((res) =>res.data)
    .catch((err) => console.log(err));
};