import { LOGIN_USER, LOGOUT_USER, REGISTER_USER, AUTH_USER, SET_TOKEN, DELETE_TOKEN } from "./types";
import { request } from "../utils/axios";

// const USER_URL = "/api/user";
const USER_URL = "/users";

// 로그인 데이터 저장
export function loginUser(dataToSubmit) {
  const URL = USER_URL + `/login?userEmail=${dataToSubmit.userEmail}&userPwd=${dataToSubmit.userPwd}`;
  const data = request("get", URL , dataToSubmit);
  console.log(data)
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// 유저 데이터 초기화
export function deleteInfo(data) {
  return {
    type: LOGOUT_USER,
    payload: data,
  };
}

// 토큰 저장
export function accessToken(data) {
  return {
    type: SET_TOKEN,
    payload: data
  }
}

// 토큰 삭제
export function deleteToken(data){
  return {
    type: DELETE_TOKEN,
    payload: data
  }
}

export function registerUser(dataToSubmit) {
  const data = request("post", USER_URL + '/sign-up', dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: data,
  };
}

// export function auth() {
//   const data = request("post", USER_URL + "/auth");

//   return {
//     type: AUTH_USER,
//     payload: data,
//   };
// }