// import styled from 'styled-components';
import React, { useState } from 'react';
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { request } from "../utils/axios";

// const AuthNumber = styled(InputBox)`
// `;


const USER_URL = "/users";

export default function AuthEamil({getEmail}) {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(true);
  const [authnum, setAuthnum] = useState("")
  const [authcode, setAuthcode] = useState("")
  const [disabled, setDisabled] = useState("")

  // const test_func = () => {
  //   setAuthcode(code)
  //   setAuth(true)                 // 인증번호 입력태그 보여주기
  // }
  // test_func()
  // 인증번호 받아오기
  const getAuthcode = () => {
    console.log(request("post", USER_URL + "/verify", email))
  }
  // .then((res) =>{
  //   setAuthcode(res.statusCode)   // 인증번호 Code 받아오기
  //   setAuth(true)                 // 인증번호 입력태그 보여주기
  // })
  // .catch((err)=> {
  //   console.log(err)
  //   alert("요청실패")
  // })

  const handleSubmit = (e) => {
    e.preventDefault();

    if (authnum === authcode){
      getEmail(email)                 // 이메일 emit
      setDisabled(true)               // 이메일 인증이 완료되면 버튼과 인풋태그 비활성화
    } else{
      alert("인증번호가 일치하지 않습니다.")
    }
  }

  return (
    <>
      <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={email} disabled={disabled} onChange={(e) => {setEmail(e.target.value)}}></InputBox>
      <Btn id="0" txt="Send" func={getAuthcode} disabled={disabled} />
      <form onSubmit={handleSubmit}>
        {
          auth == true
          ? (
            <>
              <InputBox id="authnum" type="text" title="Authentication number" placeholder="123456" value={authnum} disabled={disabled} onChange={(e) => {setAuthnum(e.target.value)}} />
              <Btn id="0" txt="confirm" disabled={disabled} />
            </>
          )
          : null
        }
      </form>
    </>
  )
}


function Btn(props){
  const {id, txt, disabled, func} = props;
  return (
    <Button 
      id= {id} 
      width="13.16vw" 
      height="5vh" 
      fontSize="0.83vw" 
      textWeight="700" 
      radius="2vh" 
      textValue= {txt}
      disabled= {disabled}
      onClick={() => {
        func()
      }}
    >
    </Button>
  )
}



/*  흐름
  1. email 인증 버튼 클릭(o)
  2. axios 요청을 통해 email 정보를 보내고 code를 받아옴(o)
  3. 인증번호 요청이 성공하면 인증번호 input태그 보여줌(o)
  4-1. 입력된 인증번호와 받은 code가 일치하면 일치하면 email 정보 emit & 버튼 비활성화 (0)
  4-2. 인증번호가 실패하면 alert (o)

  => axios 요청만 받아오면 된다.
*/