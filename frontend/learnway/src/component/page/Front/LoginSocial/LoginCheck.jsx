import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setRefreshToken } from "../utils/Cookie";
export default function LoginCheck()  {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  useEffect (() => {
    console.log(location)
    navigate('/')
    // const searchParams = new URLSearchParams(document.location.search);
    // const flag = searchParams.get("flag");
    // const userEmail = searchParams.get("userEmail");
    // console.log(searchParams)
    // navigate('/')
    // 쿠키에 Refresh Token, store에 Access Token 저장
    // if (flag === 0) {
    //     const name = searchParams.get("name");
    //     const provider = searchParams.get("provider");
    //     const providerId = searchParams.get("providerId");
    //     const data = {
    //       name: name,
    //       provider: provider,
    //       providerId: providerId,
    //     }
    //     navigate('/googlesignup', {state: data});
    //   } else {
    //       const accessToken = searchParams.get("accessToken");
    //       const refreshToken = searchParams.get("refreshToken");
    //       setRefreshToken(refreshToken);
    //       dispatch(accessToken(accessToken));
      
    //       // 성공했으면 메인 페이지로 이동
    //       navigate(`/`)
    //   }
  })
  // }
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  //   // useLocation() 호출
  //   const location = useLocation();
  //   console.log(location);
  //   // {pathname: '/query', search: '?id=10&count=2022', hash: '', state: null, key: 'default'}
  
  //   // search 부분을 URLSearchParams 객체로 생성
  //   const searchParams = new URLSearchParams(location.search);
  //   // const searchParams = new URLSearchParams(useLocation().search); // 이것도 가능
  
  //   // 쿼리 취득
  //   const id = searchParams.get('id'); // id 취득
  //   const count = searchParams.get('count'); // count 취득
  //   console.log('id: ', id); // id: 10
  //   console.log('count: ', count); // count: 2022
    
  // // useEffect(() => {
  // //   const token = new URLSearchParams(document.location.search).get("token");
  // //   // Params 없이 들어왔을 경우
  // //   if (token) {
  // //     localStorage.setItem("accessToken", token);
  // //     (async () => {
  // //       await dispatch(getMemberId());
  // //       navigate("/");
  // //     })();
  // //   } else {
  // //     navigate("/intro");
  // //   }
  // // });

  return <div>로그인 중입니다</div>;
};