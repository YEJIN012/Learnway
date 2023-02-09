// import styled from 'styled-components';
import React, { useState } from 'react';
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { request } from "../utils/axios";



export default function AuthEamil({getEmail}) {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(false);
  const [authcode, setAuthcode] = useState("")
  const [disabled, setDisabled] = useState("")
  

  const URL = '/users/verify'
  
  // 서버에 인증번호 요청이 되면 인증번호 입력 인풋창 보여주기
  const chkAuthcode = () => {
    request("get", URL + `?user_email=${email}`, email)
      .then ((res) => {
        const status = res.status;
        const msg = res.msg;
        if (status === 200) {
          setAuth(true)                  
        } else if (status === 202) {
          alert(msg)
        }
      })
      .catch((err) => console.log(err))
  }
  
  // 인증번호 식별 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    request("post", URL + `?code=${authcode}&user_email=${email}`, email)
      .then((res) => {
          const status = res.status;
          const msg = res.msg
          if(status === 200){ // 인증번호가 맞으면 email을 emit해주고 Next 버튼을 활성화
            getEmail(email)
            setDisabled(true)               // 이메일 인증이 완료되면 버튼과 인풋태그 비활성화
            alert(msg)
          }  else {
            alert(msg)
          }
        })
      .catch((err) => console.log(err))
  }

  return (
    <>
      <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={email} disabled={disabled} onChange={(e) => {setEmail(e.target.value)}}></InputBox>
      <Button id= "0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue="Send" disabled= {disabled} onClick={chkAuthcode} />
      <form onSubmit={handleSubmit}>
        {
          auth === true
          ? (
            <>
              <InputBox id="authcode" type="text" title="Verification code" placeholder="123456" value={authcode} disabled={disabled} onChange={(e) => {setAuthcode(e.target.value)}} />
              <Button id= "0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue="Confirm" disabled= {disabled} onClick={chkAuthcode} />

            </>
          )
          : null
        }
      </form>
    </>
  )
}





/*  흐름
  1. email 인증 버튼 클릭(o)
  2. axios 요청을 통해 email 정보를 보내고 code를 받아옴(o)
  3. 인증번호 요청이 성공하면 인증번호 input태그 보여줌(o)
  4-1. 입력된 인증번호와 받은 code가 일치하면 일치하면 email 정보 emit & 버튼 비활성화 (0)
  4-2. 인증번호가 실패하면 alert (o)

  => axios 요청만 받아오면 된다.
  -------------------------------------

  이메일 중복여부 검사해줘야해!!
*/