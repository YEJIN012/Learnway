import styled from 'styled-components';
import SignupForm from "./SignupForm";
import Interest from "./Interest";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import BackgroundFrame from "../Background";
import { NavLink } from 'react-router-dom';

const Frame = styled.div`
  text-align : right;
  margin-right: 5px;
  margin-bottom: 20px;  
`;


export default function Signup () {
  const [userinfo, setUserinfo] = useState("")
  
  // 회원가입 페이지에서 next를 누르면 개인정보 갱신
  const getUserinfo = (userinfo) => {
    setUserinfo(userinfo)
    console.log(userinfo)
  };

  const { t } = useTranslation();

  return (
    <BackgroundFrame left="35vw" right="35vw" width= {userinfo ? null : "470px"}  top= {userinfo ? "10vh" : "15vh"} fsize="15px" mtop = "13vh" opacity= {userinfo ? 0.5 : null}
      bg={
            userinfo === ""
          ? (  
              <>
              <Frame><NavLink to = "/login">{t('Login')}</NavLink></Frame>
              <SignupForm getUserinfo={getUserinfo}></SignupForm>
              </>
            )
            : <Interest userinfo={userinfo} />
          }
      ment1 = {userinfo ? t('Selection') : t('SignUp')}
      ment2 = {userinfo ? t('What do you do in your free time?') : t('Already Member?')}
      align_items = "center"
      txttop="60px"
    />
  )
}
