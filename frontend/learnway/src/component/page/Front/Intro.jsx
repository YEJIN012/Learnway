import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';

import '../../ui/Background.css';
import logo from '../Front/img/intro_logo.png';
import learnway from '../Front/img/learnway.png'
import subment from '../Front/img/subtitle.png';
import { interestLst, languageLst } from './actions/userAction';
import IntroAnimation from './IntroAnimation';
import BGIntro from './introbackground/BGIntro';
import Welcome from './Welcome';
import IntroButton from '../Front/button/IntroButton'

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
  border:1px solid black;
`;

const Picture = styled.img`
  width: 35vw;
  height: 65vh;
  margin-left: 11vw;
  margin-top: 22.7vh;
  position: absolute;
  
`;

const RightSide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  border:1px solid black;
`;


const Title = styled.div`
  width: 38.1vw;
  height: 6.3vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0vh 6.4vw 0vh 0vw;
`;

const Learnway = styled.img`
  width: 28vw;
  height: 6.3vh;
`;

const Logo = styled.img`
  width: 6vw;
  height: 6.3vh;
`;

const Subtitle = styled.img`
  width: 35vw;
  height: 8.9vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StartBtn = styled.button`
  border: none; 
  background-color: transparent;
  height: 5%;
  width: 40%;
  border-radius: 20px;
  // position:absolute;
  // top: 25%;
  border:1px solid black;
`;


export default function Intro () {
  return (
    <div>
      <Top />
      <Btn /> 
      <BGIntro/>
    </div>
  )
}

function Top(){
  const dispatch = useDispatch()

  // 홈페이지 시작시 언어정보와 취향설정 정보를 스토어에 저장해둔다.
  useEffect(() => {
    const langdata = languageLst()
    const interstdata = interestLst()
    langdata.payload.then((res) => dispatch({type: langdata.type, payload: res.language}))
    interstdata.payload.then((res) => dispatch({type: interstdata.type, payload: res.interests}))
  },[])

  return(
    <Top>
      <Welcome/>
      <IntroAnimation></IntroAnimation>
    </Top>
  )
}

// function RightBox(){
//   return(
//     <RightSide>
//         <Btn/>
//     </RightSide>
//   )
// }

function Btn(){
  let navigate = useNavigate()
  return (
    <StartBtn onClick={()=>{ navigate('/login') }}>
      <IntroButton/>
    </StartBtn>
  )
}
