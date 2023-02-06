import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

import InputBox from '../Input';
import Button from '../../../ui/Button';
import SelectLanguage from '../../../ui/CommonSelectLanguage';
import { useSelector } from 'react-redux';
import Interest from '../SignupPage/Interest';
import BackgroundFrame from '../Background';


const InputFrame = styled.div`
  width: 20vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: 20vw;
  height: 1.84vh;
  font-size: 0.9vw;
`;

export default function GoogleSignupForm({userEmail, username, provider, providerId }) {
  const languageBox = useSelector(state => state.UserInfoReducer)

  const [birthday, setbirthday] = useState("");
  const [languageName, setLanguageName] = useState("KOREAN");  // 초기값 userInfo.languageId로 수정
  const [disabled, setDisabled] = useState(true);
  
  const [userinfo, setUserinfo] = useState("")

  useEffect(() => {
    if (birthday && languageName) {
      setDisabled(false)
    }
  },[birthday, languageName])

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
    };
    
    setUserinfo(data)
  }

  return (
    <BackgroundFrame left="35vw" right="30vw" height="90vh" top="5vh" bottom="5vh" fsize="1.3vw" mtop = "13vh"
      bg={
        userinfo === ""
        ? (
          <form onSubmit={handleSubmit}>
            <InputBox id="username" type="txt" title="User Name(ENG)" placeholder="hanbin" value={username} disabled="true"></InputBox>
            <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={userEmail} disabled="true" ></InputBox>
            <Button id= "0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue="Send" disabled="true" />
            <InputFrame>
              <InputTitle>Language</InputTitle>
              <SelectLanguage language = {languageName} setLanguage={setLanguageName} width={"21vw"} height={"20px"} />
            </InputFrame>
            <InputBox id="birthday" type="date" title="Birthday" value={birthday} onFocus="(this.type='date')" onChange={(e) => {setbirthday(e.target.value)}}></InputBox>
            <Button id= "0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue="Next" disabled= {disabled} />
          </form>
        )
        : <Interest userinfo={userinfo}></Interest>
      }
      ment1="Sign Up"
      ment2="Already Member ?" />
  )
}