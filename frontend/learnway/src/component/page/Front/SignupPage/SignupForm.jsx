import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import InputBox from '../Input';
import AuthEamil from './AuthEamil';
import Button from '../../../ui/Button';
import SelectLanguage from '../../../ui/CommonSelectLanguage';
import { useSelector } from 'react-redux';
import { request } from '../utils/axios';

import Alert from '@mui/joy/Alert';
import Stack from '@mui/material/Stack';
import CakeIcon from '@mui/icons-material/Cake';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AllButton from '../../../ui/AllButton';

const InputFrame = styled.div`
  width: 380px;
  margin-top: 20px;
`;

const Frame = styled.div`
  text-align : right;
  margin-right: 0px;
  margin-bottom: 30px;
`;

export default function SignupForm({getUserinfo}) {

  // 언어정보 받아오기
  const languageBox = useSelector(state => state.UserInfoReducer)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [pw, setPw] = useState("");
  const [confirmPw, setconfirmPw] = useState(""); 
  const [birthday, setbirthday] = useState("");
  const [languageName, setLanguageName] = useState("KOREAN");  // 초기값 userInfo.languageId로 수정
  const [disabled, setDisabled] = useState(true);
  const [msg, setMsg] = useState("");

  // 이메일 인증이 되면 email 갱신
  const getEmail = (email) => {
    setEmail(email)
  }


  // 닉네임이 중복되지 않으면 들어오면 Next button 활성화
  useEffect(() => {
    if (msg === "사용가능한 닉네임입니다.") {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
  }, [msg])
  
  // 닉네임이 변경되면 중복여부 체크
  request("get",`/users/dupName?name=${username}`).then((res) => setMsg(res.msg) )
  

  // form에 값이 다 들어와서 Next Button을 누르면 부모 컴포넌트에 모든 값을 emit
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(languageBox)
    
    // 해당 언어 데이터를 정제하기
    const asyncFor =  () => {
      for (let i = 0; i < languageBox.language.length; i++) {
        console.log(i)
        if (languageBox.language[i].name === languageName){
          // console.log(languageBox.language[i])
          return languageBox.language[i]
        }
      }
    }
    const language = asyncFor()

    if (pw === confirmPw) {
      const data = {
        name: username,
        userEmail: email,
        userPwd: pw,
        birthDay: birthday,
        language: language,       // 랭귀지 id  체크
        badUser: false,
        bio: "",
        imgUrl: "",
        providerId: "",
        provider: "",
        userId: 0,
      };
      console.log(data)
      getUserinfo(data)           // 정제된 데이터를 부모 컴포넌트에 보내준다.
        
    }
    else {
      alert("비밀번호가 다릅니다.")
    }
  };

  return(
      <div>
        <AuthEamil getEmail = {getEmail}></AuthEamil>
        <form onSubmit={handleSubmit}>
          <InputBox id="username" type="txt" title="User Name(ENG)" placeholder={username} value={username} inputWidth="300px" inputHeight="25px" margin="10px 0px 10px 0px" onChange={(e) => {setUsername(e.target.value)}}
            icon= {<AccountCircleIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}} />} 
          />
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert sx={{ fontSize: "5px", opacity: "0.7", justifyContent: "right", padding: "0px" ,margin: "0px 8px 0px 0px" }} severity="warning">{msg}</Alert>
          </Stack>
          <InputBox id="password" type="password" title="Password" placeholder="********" value={pw} onChange={(e) => {setPw(e.target.value)}} margin="0px 0px 10px 0px" inputWidth="300px" inputHeight="25px"
            icon= {<LockOpenIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}} />} 
          />
          <InputBox id="confirmPw" type="password" title="Confirm Password" placeholder="********" value={confirmPw} margin="10px 0px 10px 0px" onChange={(e) => {setconfirmPw(e.target.value)}} inputWidth="300px" inputHeight="25px"
            icon= {<LockOpenIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}} />} 
          />
          <InputFrame >
            <SelectLanguage radius="6px" opacity="0.5" selectWidth="300px" selectHeight="18.8416px" selectFontSize="13px" title = "Language" language = "Choose" setLanguage={setLanguageName} width="312px" height="30px" 
              icon= {<LanguageIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}} />} 
            />            
          </InputFrame>
          <InputBox id="birthday" type="date" title="Birthday" value={birthday} onFocus="(this.type='date')" inputWidth="300px" margin="10px 0px 10px 0px" onChange={(e) => {setbirthday(e.target.value)}} inputHeight="30px"
            icon= {<CakeIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}} />} 
          />
          <Frame>
            <Button id= "0" width="185px" height="35px" fontSize="12px" textWeight="700" radius="10px" textValue="Next" margin="20px 0px 0px 0px" disabled= {disabled} />
          </Frame>
        </form>
      </div>
  )
}