import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import InputBox from '../Input';
import Button from '../../../ui/Button';
import SelectLanguage from '../../../ui/CommonSelectLanguage';
import { useSelector } from 'react-redux';
import Interest from '../SignupPage/Interest';
import BackgroundFrame from '../Background';
import { useLocation } from 'react-router-dom';

import CakeIcon from '@mui/icons-material/Cake';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const InputbtmFrame = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: flex-end;
  margin-bottom: 30px;
`;

const InputFrame = styled.div`
  width: 380px;
  margin-top: 20px;
`;

const Frame = styled.div`
  text-align : right;
  margin-right: 5px;
  margin-bottom: 20px;  
`;

export default function GoogleSignup() {
  const languageBox = useSelector(state => state.UserInfoReducer)

  const [birthday, setbirthday] = useState("");
  const [languageName, setLanguageName] = useState("KOREAN");  // 초기값 userInfo.languageId로 수정
  const [disabled, setDisabled] = useState(true);
  const [userinfo, setUserinfo] = useState("")
  const location = useLocation();
  
  const userEmail = location.state.userEmail
  const username = location.state.name
  const provider = location.state.provider
  const providerId = location.state.providerId
  

  useEffect(() => {
    if (birthday && languageName) {
      setDisabled(false)
    }
  },[birthday, languageName])

  // form에 값이 다 들어와서 Next Button을 누르면 부모 컴포넌트에 모든 값을 emit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 해당 언어 데이터를 정제하기
    const asyncFor =  () => {
      for (let i = 0; i < languageBox.language.length; i++) {
        if (languageBox.language[i].name === languageName){
          // console.log(languageBox.language[i])
          return languageBox.language[i]
        }
      }
    }
    const language = asyncFor()

    const data = {
      name: username,
      userEmail: userEmail,
      birthDay: birthday,
      language: language,       // 랭귀지 id  체크
      badUser: false,
      bio: "",
      imgUrl: "",
      providerId: providerId,
      provider: provider,
      userId: 0,
      userPwd: 0,
    };
    
    setUserinfo(data)
  }

  return (
    <BackgroundFrame left="35vw" right="35vw" width= {userinfo ? null : "470px"} top= {userinfo ? "5vh" : "13vh"} bottom="5vh" fsize="15px" mtop = "13vh"
      bg={
        userinfo === ""
        ? (
          <form onSubmit={handleSubmit}>
            <InputBox id="username" type="txt" title="User Name(ENG)" placeholder={username} value={username} disabled={true} inputWidth="300px" margin="20px 0px 10px 0px"
              icon= {<AccountCircleIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}} />} 
            />
            <InputbtmFrame>
              <InputBox 
                id="email" 
                type="email" 
                title="E-mail" 
                inputWidth="220px"
                placeholder={userEmail}
                value={userEmail}
                margin="20px 0px 0px 0px "
                disabled={true} 
                icon= {<EmailIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}}  />} 
              />
              <Button 
                id="0" 
                width="80px" 
                height="39px" 
                fontSize="12px" 
                textWeight="700" 
                radius="10px" 
                textValue= "Send" 
                margin= "20px 0px 0px 0px"
                disabled={true}
              />
            </InputbtmFrame>
            <InputFrame>
              <SelectLanguage radius="6px" opacity="0.5" selectWidth="300px" selectHeight="18.8416px" selectFontSize="13px" title = "Language" language = "Choose" setLanguage={setLanguageName} width="312px" height="37px" 
                icon= {<LanguageIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}} />} 
              />            
            </InputFrame>
            <InputBox id="birthday" type="date" title="Birthday" value={birthday} onFocus="(this.type='date')" inputWidth="300px" onChange={(e) => {setbirthday(e.target.value)}} 
              icon= {<CakeIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}} />} 
            />
            <Frame>
              <Button id= "0" width="185px" height="39px" fontSize="12px" textWeight="700" radius="10px" textValue="Next" margin="30px 0px 50px 0px" disabled= {disabled} />
            </Frame>
          </form>
        )
        : <Interest userinfo={userinfo}></Interest>
      }
      ment1="Sign Up"
      ment2="Already Member ?" 
      align_items="center"
      txttop="80px"
    />
  )
}