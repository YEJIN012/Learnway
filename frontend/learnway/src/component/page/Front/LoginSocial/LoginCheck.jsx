import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setRefreshToken } from "../utils/Cookie";
import { accessToken, findUserInfo } from "../actions/userAction";

export default function LoginCheck()  {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()

  const flag = searchParams.get("flag");
  
  useEffect (() => {
    
    const userEmail = searchParams.get("userEmail");
    
    // 구글 로그인 가입자가 아니면 정보를 가지고 회원가입하러
    if (flag === "0") {
        const name = searchParams.get("name");
        const provider = searchParams.get("provider");
        const providerId = searchParams.get("providerId");
        const data = {
          userEmail: userEmail,
          name: name,
          provider: provider,
          providerId: providerId,
        }
        navigate('/googlesignup', {state: data});
    } else { 
    // 구글 로그인 가입자면 토큰을 받아오고
        const catchaccessToken = searchParams.get("accessToken");
        const catchrefreshToken = searchParams.get("refreshToken");
        
        // 회원 정보를 조회하여 스토어에 회원 정보를 넣고 토큰을 저장
        const userInfo = findUserInfo({userEmail: userEmail})
        userInfo.payload
          .then((res) => dispatch({type: userInfo.type, payload: res.user}))
        setRefreshToken(catchrefreshToken);
        const getaccessToken = accessToken({accessToken: catchaccessToken});
        dispatch({type: getaccessToken.type, payload: getaccessToken.payload});

        // 성공했으면 메인 페이지로 이동
        navigate(`/`)
      }
  },[])

  return <div>로그인 중입니다</div>;
};