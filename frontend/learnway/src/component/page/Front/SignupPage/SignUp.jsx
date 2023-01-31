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
