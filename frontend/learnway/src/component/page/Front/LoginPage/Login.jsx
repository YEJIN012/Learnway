import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import LoginForm from './LoginForm';
import BackgroundFrame from '../Background';
import icon from '../img/googleIcon.jpg'
import { useDispatch } from "react-redux";
import GoogleSignupForm from "../LoginSocial/GoogleSignup";
import { setRefreshToken } from "../utils/Cookie";
import { useNavigate } from "react-router-dom";

/*
1. location.search : 쿼리스트링에서 ? 뒤에 있는 값을 가져옴
2. 즉 여기서는 url? 'token= "queryString" 에서 queryString을 가져온다는 말임
3. 따라서 queryString이 붙어서 온 경우는 그것을 catch 해서 로그인 시켜주기 => 토큰은 로컬스토리지에 저장하고 axios 요청해서 뭐든 하고 메인페이지로
4. queryString이 붙어서 오지 않은 경우는 회원이 아니므로 회원가입 폼으로 옮겨주자.
5. 
*/

// .queryParam("userEmail",userEmail)
// .queryParam("name",name)
// .queryParam("provider",provider )
// .queryParam("providerId",providerId)
// .queryParam("flag",0)

const GooIcon = styled.button`
  background-image: url(${icon});
  background-size: cover;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;


export default function Login () {
  const [tmp, setTmp] = useState(true)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  
  const OpenForm = () => {  
    window.location.href = "https://i8a408.p.ssafy.io/api/oauth2/authorization/google"
    
    const searchParams = new URLSearchParams(document.location.search);
    const flag = searchParams.get("flag");
    const userEmail = searchParams.get("userEmail");
  
    // 쿠키에 Refresh Token, store에 Access Token 저장
    if (flag === 0) {
        const name = searchParams.get("name");
        const provider = searchParams.get("provider");
        const providerId = searchParams.get("providerId");
        setTmp(false)
      } else {
          const accessToken = searchParams.get("accessToken");
          const refreshToken = searchParams.get("refreshToken");
          setRefreshToken(refreshToken);
      dispatch(accessToken(accessToken));
  
      // 성공했으면 메인 페이지로 이동
      navigate(`/`)
    }
  }
  
    // const flag = new URLSearchParams(document.location.search).get("flag");
    // const userEmail = new URLSearchParams(document.location.search).get("userEmail");
    // const name = new URLSearchParams(document.location.search).get("name");
    // const provider = new URLSearchParams(document.location.search).get("provider");
    // const providerId = new URLSearchParams(document.location.search).get("providerId");
    // const accessToken = new URLSearchParams(document.location.search).get("accessToken");
    // const refreshToken = new URLSearchParams(document.location.search).get("refreshToken");
    
    // // 쿠키에 Refresh Token, store에 Access Token 저장
    // if (flag === 0) {
    //   setTmp(false)
    // } else {
    //   const userEmail = new URLSearchParams(document.location.search).get("userEmail");
    //   setRefreshToken(refreshToken);
    //   dispatch(accessToken(accessToken));

    //   // 성공했으면 메인 페이지로 이동
    //   navigate(`/`)
    // }


    // // Params 없이 들어왔을 경우
    // if (token) {
    //   localStorage.setItem("accessToken", token);
    //   (async () => {
    //     await dispatch(getMemberId());
        // navigate("/");
    //   })();
    // } else {
    //   navigate("/intro");
    // }
    //   return <div>로그인 중입니다</div>;
  // }

  // useEffect(() => {
  //   const userEmail = new URLSearchParams(document.location.search).get("userEmail");
  //   const name = new URLSearchParams(document.location.search).get("name");
  //   const provider = new URLSearchParams(document.location.search).get("provider");
  //   const providerId = new URLSearchParams(document.location.search).get("providerId");
  //   const flag = new URLSearchParams(document.location.search).get("flag");
  //   const token = {
  //     userEmail: userEmail,
  //     name: name,
  //     provider: provider,
  //     providerId: providerId,
  //   }
  //   // Params 없이 들어왔을 경우
  //   if (token) {
  //     localStorage.setItem("accessToken", token);
  //     (async () => {
  //       await dispatch(getMemberId());
  //       navigate("/");
  //     })();
  //   } else {
  //     navigate("/intro");
  //   }
  // });

  // return <div>로그인 중입니다</div>;
// };

// export default Login;

  return (
    <>
      {
        tmp === true
        ?(
          <BackgroundFrame
          bg = {
            <>
              <LoginForm />
              {/* <GooIcon onClick={onGoogleSignIn} text="로그인"/> */}
              <GooIcon onClick={OpenForm} text="로그인"/>

            </>
            // : <GoogleSignupForm userEmail={userEmail} name={name} provider={provider} providerId={providerId} ></GoogleSignupForm>
            
          } ment1= "Sign Into"
          ment2 = "Your Account" />
        )
        : <GoogleSignupForm  ></GoogleSignupForm>
      }
    </>
  )
}
    
