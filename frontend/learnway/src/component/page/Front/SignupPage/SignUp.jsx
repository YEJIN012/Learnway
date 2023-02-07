import SignupForm from "./SingupForm";
import Interest from "./Interest";
import { useState } from "react";
import BackgroundFrame from "../Background";

export default function Signup () {
  const [userinfo, setUserinfo] = useState("")
  
  // 회원가입 페이지에서 next를 누르면 개인정보 갱신
  const getUserinfo = (userinfo) => {
    setUserinfo(userinfo)
    console.log(userinfo)
  }

  return (
    <BackgroundFrame
      bg={
          userinfo === ""
          ? <SignupForm getUserinfo={getUserinfo}></SignupForm>
          : <Interest userinfo={userinfo}></Interest>
      }
      ment1="Sign Up">
    </BackgroundFrame>
  )
}
