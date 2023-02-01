import React from 'react';
import InterestSelect from './InterestSelect';
// import { useDispatch } from "react-redux";
// import { registerUser } from '../actions/userAction';
export default function Interest(props) {
  // const dispatch = useDispatch();
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //  dispatch(registerUser(data))
  //       .then((res)=>{
  //         if(res.payload.success) {
  //           props.history.push("/login")
  //           alert("가입이 정상적으로 완료되었습니다.");
  //         } else {
  //           alert("Failed to sign up")
  //         }
  //       });
  //     } else {
  //       alert("비밀번호가 일치하지 않습니다.");
  // }
  console.log(props)
  return (
    <>
      <h1>나는 취향설정이야</h1>
      <InterestSelect></InterestSelect>
    </>
  )
}