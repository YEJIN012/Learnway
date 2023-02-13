import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import '../../ui/Background.css';
import logo from '../Front/img/intro_global.png';
import { interestLst, languageLst } from './actions/userAction';
import BGIntro from './introbackground/BGIntro';
import Welcome from './Welcome';
import AllButton from '../../ui/AllButton';
const LeftSide = styled.div`
  width: 100%;
  height: 100%;
  left: 0vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index : -1;
  // border:1px solid black;
`;

const Picture = styled.img`
  width: 45vw;
  height: 27vw;
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index : -1;
`;

// const RightSide = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   border:1px solid black;
// `;


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
  // border:1px solid black;
  margin: auto;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5%;
    left : 1%;
    font-size:02.vw;
    color:#C5BEBE;
    text-decoration-line: none;
`;

export default function Intro() {
  return (
    <div>
      <LeftBox></LeftBox>
      <Welcome />
      <Picture src={logo}></Picture>
      <Btn />
      <BGIntro />
      <Ref href="https://kr.freepik.com/">Freepik</Ref>
    </div>
  )
}

function LeftBox() {
  const dispatch = useDispatch()

  // 홈페이지 시작시 언어정보와 취향설정 정보를 스토어에 저장해둔다.
  useEffect(() => {
    const langdata = languageLst()
    const interstdata = interestLst()
    langdata.payload.then((res) => dispatch({ type: langdata.type, payload: res.language }))
    interstdata.payload.then((res) => dispatch({ type: interstdata.type, payload: res.interests }))
  }, [])

  return (
    <LeftSide>
    </LeftSide>
  )
}

// function RightBox(){
//   return(
//     <RightSide>
//         <Btn/>
//     </RightSide>
//   )
// }

function Btn() {
  let navigate = useNavigate()
  return (
    <StartBtn onClick={() => { navigate('/login') }}>
      <AllButton
        textValue="MEETUP"
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
