import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../ui/Background.css';
import logo from '../../Front/img/intro_global.png';
import BGIntro from '../introbackground/BGIntro';
import Welcome from './Welcome';
import AllButton from '../../../ui/AllButton';


const Picture = styled.img`
  width: 45vw;
  height: 27vw;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index : -1;
`;

const StartBtn = styled.div`
  border: none; 
  background-color: transparent;
  height: 30px;
  width: 25%;
  border-radius: 20px;
  position: absolute;
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5vw;
    left : 1vw;
    font-size:0.3vw;
    color:#DCD6D6;
    text-decoration-line: none;
`;

export default function Intro() {
  return (
    <>
      <Welcome />
      <Picture src={logo}></Picture>
      <Btn />
      <BGIntro />
      <Ref href="https://kr.freepik.com/">Designed by Freepik</Ref>
    </>
  )
}

function Btn() {
  let navigate = useNavigate()

  const { t } = useTranslation();
  
  return (
    <StartBtn onClick={() => { navigate('/login') }}>
      <AllButton
        textValue={t('MEETUP')}
        width="100%"
        height="45px"
        fontSize="1.3vw"
        textWeight="900"
        radius="20px"
        margin="0px"
        onClick={() => navigate("/login")} />
    </StartBtn>
  )
}
