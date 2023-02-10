import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import BackgroundFrame from "../Background"
import InputBox from "../Input"
import Button from '../../../ui/Button';
import { request } from '../utils/axios';
import ChangePwd from './ChangePwd';
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';


const InputbtmFrame = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: flex-end;
  margin-bottom: 30px;
`;

const BtnFrame = styled.div`
  text-align : right;
  margin-right: 0px;
  margin-bottom: 20px;  
`;


export default function FindPwd(){
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(false);
  const [authcode, setAuthcode] = useState("")
  const [changePwd, setchangePwd] = useState(true)

  const URL = '/users'
  
  const chkAuthcode = () => {
    // 회원 조회 요청
    request("get", URL + `/${email}` )
      .then ((rst) => {
        console.log(rst)
        if (rst.status === 200){
          // 서버에 인증번호 요청 & 인증번호창 활성화
          console.log(rst)
          // console.log(request("get", URL + `/verify?user_email=${email}`, email))
          request("get", URL + `/verify?user_email=${email}&find_code=0`, email)
          // request("get", URL + `/verify?user_email=${email}`, email)
          setAuth(true)                   
        } else {
          alert(rst.msg)
        }
      })
      .catch((err) => console.log(err))
  }

  // 인증번호 식별 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    request("post", URL + `/verify?code=${authcode}&user_email=${email}`, email)
      .then((res) => {
        const status = res.status;
        const msg = res.msg
        if(status === 200){ 
          setchangePwd(false)               
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
        changePwd === true
        ?
        <>
          <InputbtmFrame>
            <InputBox 
              id="email" 
              type="email" 
              title="E-mail" 
              inputWidth="250px"
              placeholder="abcdef@dfd.com" 
              value={email} 
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              icon= {<EmailIcon sx={{margin: "0px 5px 8px 5px", color: "white", opacity: "0.5"}}  />} 
            />
            <Button 
              id="0" 
              width="80px" 
              height="39px" 
              fontSize="12px" 
              textWeight="700" 
              radius="10px" 
              textValue= "Send" 
              margin= "0px 0px 10px 0px"
              onClick={chkAuthcode}
             />
          </InputbtmFrame>
          <form onSubmit={handleSubmit}>
            {
              auth === true
              ? (
                <>
                  <InputBox 
                    id="authcode" 
                    type="text"
                    title="Verification code" 
                    placeholder="123456" 
                    value={authcode} 
                    onChange={(e) => {
                      setAuthcode(e.target.value)
                      }}
                    icon= {<LockOpenIcon sx={{margin: "0px 5px 8px 5px", color: "white", opacity: "0.5"}}  />}
 
                    />
                  <BtnFrame>
                    <Button
                      id = "0"
                      width="185px"
                      height="39px"
                      fontSize="12px"
                      textWeight="700"
                      radius="10px"
                      textValue="Search"
                      margin="40px 0px 0px 0px"
                    />
                  </BtnFrame>                
                </>
              )
              : null
            }
          </form>
        </>
        : <ChangePwd email={email} />
      } height = {"550px"}
        ment1 = {changePwd ? "Forgot" : "Change"}
        ment2 = {changePwd ? "Your Password ?" : "Your Password !"}
    />
  )
}




// 1. 이메일을 받고 회원을 조회
// 2. 회원 조회가 잘 됐으면 이메일 인증 요청
// 3. 이메일 인증이 완료되면 비밀번호 변경 화면
// 4. 비밀번호 변경되면 로그인 화면으로
