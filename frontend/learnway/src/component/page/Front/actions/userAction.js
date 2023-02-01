import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";
import { request } from "../utils/axios";

// const USER_URL = "/api/user";
const USER_URL = "/users";

export function loginUser(dataToSubmit) {
  // const request = axios
  //   .post("http://localhost:9000/api/user/login", dataToSubmit, {
  //     withCredentials: true,
  //   })
  // .then((res) => res.data);
  // const request = user.loginUser();
  const data = request("get", USER_URL + "/login", dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// export function registerUser(dataToSubmit) {
//   const data = request("post", USER_URL + "/signup", dataToSubmit);

//   return {
//     type: REGISTER_USER,
//     payload: data,
//   };
// }

// export function auth() {
//   const data = request("post", USER_URL + "/auth");

//   return {
//     type: AUTH_USER,
//     payload: data,
//   };
// }