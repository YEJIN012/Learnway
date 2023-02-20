import { LOGIN_USER, LOGOUT_USER, SET_TOKEN, DELETE_TOKEN, GET_TOKEN } from "./types";
import { REGISTER_USER, GET_INTEREST, GET_LANGUAGE } from "./types";

import { request } from "../utils/axios";

const USER_URL = "/users";

// language 데이터 가져오기
export function languageLst() {
  const URL = USER_URL + '/language'
  const data = request("get", URL)
  return {
    type: GET_LANGUAGE,
    payload: data
  }
}

// Interst 데이터 가져오기
export function interestLst() {
  const URL = USER_URL + '/interest';
  const data = request("get", URL);
  return {
    type: GET_INTEREST,
    payload: data
  }
}

// 회원가입
export function registerUser(dataToSubmit) {
  // const json = JSON.stringify(dataToSubmit)
  const data = request("post", USER_URL + '/sign-up', dataToSubmit);
  return {
    type: REGISTER_USER,
    payload: data,
  };
}

// 로그인
export function loginUser(dataToSubmit) {
  const URL = USER_URL + `/login?userEmail=${dataToSubmit.userEmail}&userPwd=${dataToSubmit.userPwd}`;
  console.log(dataToSubmit)
  const data = request("get", URL , dataToSubmit);
  console.log(data)
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// 유저정보 조회
export function findUserInfo(dataToSubmit) {
  const URL = USER_URL + `/${dataToSubmit.userEmail}`;
  const data = request("get", URL , dataToSubmit);
  return {
    type: LOGIN_USER,
    payload: data,
  };
}

// 로그 아웃 (유저 데이터 초기화)
export function deleteInfo(dataToSubmit) {
  const URL = USER_URL + `/logout/${dataToSubmit}`;
  const data = request("get", URL);
  return {
    type: LOGOUT_USER,
    payload: data,
  };
}


// accessToken 저장
export function accessToken(token) {
  const expireTime = token.accessTokenExprireDate ? token.accessTokenExprireDate : 3600000 
  const data = {
    authenticated: true,
    accessToken: token.accessToken,
    expireTime: new Date().getTime() + expireTime
  }
  return {
    type: SET_TOKEN,
    payload: data
  }
}

// accessToken 토큰 삭제
export function deleteToken(data){
  return {
    type: DELETE_TOKEN,
    payload: data
  }
}

// Token 재발급
export function requestToken(token){
  const URL = USER_URL + '/refresh';
  const data = request("post", URL, token);
  return {
    type: GET_TOKEN,
    payload: data
  }
} 
