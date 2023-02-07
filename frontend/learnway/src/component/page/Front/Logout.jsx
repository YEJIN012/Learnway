import { useSelect } from "@mui/base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteInfo, deleteToken } from "./actions/userAction";
import { getCookieToken, removeCookieToken } from "./utils/Cookie";

export default function Logout(params) {
  // 토큰 보유 확인
  // const accesstoken = useSelector(state => state.TokenReducer);
  // console.log(accesstoken)
  // const refreshToken = getCookieToken();
  // console.log(refreshToken)
  console.log(useSelector(state => state.AuthReducer))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function logout() {
    // access 토큰 삭제
    dispatch(deleteToken())
    
    // refresh 토큰 삭제
    removeCookieToken();

    // user Info 삭제
    dispatch(deleteInfo());

    // logout 시 login 창으로
    navigate('/intro');
  }
  useEffect( () => {
    logout();
  }, [])

  return (
    <div>
      <Link to='/login'/>
    </div>
  );
}
