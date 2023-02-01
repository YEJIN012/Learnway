import SignupForm from "./SingupForm";
import Interest from "./Interest";
import { useState } from "react";


export default function Signup () {
  const [userinfo, setUserinfo] = useState("")
  
  // 회원가입 페이지에서 next를 누르면 개인정보 갱신
  const getUserinfo = (userinfo) => {
    setUserinfo(userinfo)
    console.log(userinfo)
  }

  return (
    <>
      {
        userinfo === ""
        ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100vh",
            }}>
            <SignupForm getUserinfo={getUserinfo}></SignupForm>
          </div>
        )
        : (
          <Interest props={userinfo}></Interest>
        )
      }
    </>
  )
}
