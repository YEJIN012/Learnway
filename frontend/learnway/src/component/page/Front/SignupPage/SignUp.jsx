import styled from 'styled-components';
import SignupForm from "./SignupForm";
import Interest from "./Interest";
import { useState } from "react";
import BackgroundFrame from "../Background";
import { NavLink } from 'react-router-dom';

const Frame = styled.div`
  text-align : right;
  margin-right: 5px;
  margin-bottom: 20px;  
`;

export default function Signup () {
  const [userinfo, setUserinfo] = useState("")
  
  // 회원가입 페이지에서 next를 누르면 개인정보 갱신
  const getUserinfo = (userinfo) => {
    setUserinfo(userinfo)
    console.log(userinfo)
  }

  return (
    <BackgroundFrame left="35vw" right="35vw" width="470px"  top="13vh" bottom="5vh" fsize="15px" mtop = "13vh"
      bg={
          userinfo === ""
          ? (
            <div>
              <Frame>
                <NavLink to = "/login">Login</NavLink>
              </Frame>
              <SignupForm getUserinfo={getUserinfo}></SignupForm>
            </div>
            )
            : <Interest userinfo={userinfo} />
      }
      ment1 = {userinfo ? "Selection" : "Sign Up"}
      ment2 = {userinfo ? "What do you do in your free time?" : "Already Member ?"}
      align_items = "center"
      txttop="60px"
    />
  )
}
