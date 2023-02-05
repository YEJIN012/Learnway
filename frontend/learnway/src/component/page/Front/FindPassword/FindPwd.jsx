import React, { useState, useEffect } from 'react';
import BackgroundFrame from "../Background"
import InputBox from "../Input"
import Button from '../../../ui/Button';
import { request } from '../utils/axios';
import ChangePwd from './ChangePwd';

export default function FindPwd(){
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(false);
  const [authcode, setAuthcode] = useState("")
  const [changePwd, setchangePwd] = useState(false)

  const URL = '/users'


  
  const chkAuthcode = () => {
    // 프로필 조회 요청
    request("get", URL + `/profile/${email}` )
      .then ((rst) => {
        // 서버에 인증번호 요청 & 인증번호창 활성화
        request("get", URL + `/verify?user_email=${email}`, email)
        setAuth(true)                   
        console.log(rst)
      })
      .catch((err) => console.log)
  }

  // 인증번호 식별 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    request("post", URL + `/verify?code=${authcode}&user_email=${email}`, email)
      .then((res) => {
        const status = res.status;
        const msg = res.msg
        if(status === 200){ 
          setchangePwd(true)               
          alert(msg)
        } else {
          alert(msg)
        }
      })
      .catch((err) => console.log(err))
  }

  return(
    <BackgroundFrame
      bg = {
        changePwd === false
        ?
        <>
          <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={email} onChange={(e) => {setEmail(e.target.value)}}></InputBox>
          <Button id="0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue= "Send" onClick={chkAuthcode} />
          <form onSubmit={handleSubmit}>
            {
              auth === true
              ? (
                <>
                  <InputBox id="authcode" type="text" title="Verification code" placeholder="123456" value={authcode} onChange={(e) => {setAuthcode(e.target.value)}} />
                  <Button id="0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue= "confirm" />
                </>
              )
              : null
            }
          </form>
        </>
        : <ChangePwd email={email} />
      } ment1 = "Forgot"
        ment2 = "Your Password?"
    />
  )
}




// 1. 이메일을 받고 회원을 조회
// 2. 회원 조회가 잘 됐으면 이메일 인증 요청
// 3. 이메일 인증이 완료되면 비밀번호 변경 화면
// 4. 비밀번호 변경되면 로그인 화면으로
