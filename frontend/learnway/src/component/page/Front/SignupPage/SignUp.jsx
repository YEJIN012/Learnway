// import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
import SignupForm from "./SingupForm";
export default function Signup () {
 
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <SignupForm></SignupForm>
    </div>
  )
}

// 회원가입은  redux 이용해서 store 저장하면 끝
// 로그인은 