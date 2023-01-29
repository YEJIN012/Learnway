// import styled from 'styled-components';
import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import InputBox from '../Input';
import { registerUser } from '../actions/userAction';



export default function SignupForm(props) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [pw, setPw] = useState("");
  const [confirmPw, setconfirmPw] = useState(""); 
  const [birthday, setbirthday] = useState("");
  const [lagnguae, setlagnguae] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pw === confirmPw) {
      const data = {
          username: username,
          email: email,
          pw: pw,
          confirmPw: confirmPw,
          birthday: birthday,
          lagnguae: lagnguae,
        };


      dispatch(registerUser(data))
        .then((res)=>{
          if(res.payload.success) {
            props.history.push("/login")
            alert("가입이 정상적으로 완료되었습니다.");
          } else {
            alert("Failed to sign up")
          }
        });
      } else {
        alert("비밀번호가 일치하지 않습니다.");
      }
    // console.log(data);
    // console.log(username, email, pw, confirmPw, birthday, lagnguae)
    // setUsername("");
    // setemail("");           // 이메일 인증처리 필요 (버튼 누르면 인증 번호 입력창 추가)
    // setPw("");
    // setconfirmPw("");
    // setbirthday("");        // 날짜 string으로 들어옴 yyyy-mm-dd
    // setlagnguae("");        // 언어도 지정된 언어만 받을 수 있게 해야함
    // setSuccess(true);
  };

  return(
    <form onSubmit={handleSubmit}>
      <InputBox id="username" type="txt" title="User Name(ENG)" placeholder="hanbin" value={username} onChange={(e) => {setUsername(e.target.value)}}></InputBox>
      <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={email} onChange={(e) => {setemail(e.target.value)}}></InputBox>
      <InputBox id="password" type="password" title="Password" placeholder="********" value={pw} onChange={(e) => {setPw(e.target.value)}}></InputBox>
      <InputBox id="confirmPw" type="password" title="Confirm Password" placeholder="********" value={confirmPw} onChange={(e) => {setconfirmPw(e.target.value)}}></InputBox>
      <InputBox id="birthday" type="date" title="Birthday" value={birthday} onFocus="(this.type='date')" onChange={(e) => {setbirthday(e.target.value)}}></InputBox>
      <InputBox id="lagnguae" type="text" title="Lagnguae" placeholder="Korean" value={lagnguae} onChange={(e) => {setlagnguae(e.target.value)}}></InputBox>
      <button>Next</button>
    </form>
  )
}
