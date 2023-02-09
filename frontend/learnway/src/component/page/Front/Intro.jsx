import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate  } from "react-router-dom";
import { useDispatch } from 'react-redux';

import '../../ui/Background.css';
import logo from '../Front/img/intro_logo.png';
import learnway from '../Front/img/learnway.png'
import picture from '../Front/img/intro_picture.png';
import subment from '../Front/img/subtitle.png';
import { interestLst, languageLst } from './actions/userAction';


const LeftSide = styled.div`
  width: 58vw;
  height: 100vh;
  left: 0vw;
  position: absolute;
`;

const Picture = styled.img`
  width: 35vw;
  height: 65vh;
  margin-left: 11vw;
  margin-top: 22.7vh;
  position: absolute;
`;

const RightSide = styled.div`
  width: 42vw;
  height: 100vh;
  margin-left: 50vw;
  position: absolute;
`;

const Frame = styled.div`
  padding: 40vh 8.4vw 40vh 2.1vw;
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 14vw;
  height: 4.9vh;
  background-color: #0971BC;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 3.5vh;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
  border: none; 
  border-radius: 1.02vh;
  cursor: pointer;
`;


export default function Intro () {
  return (
    <div className="background">
      <LeftBox />
      <RightBox />
    </div>
  )
}

function LeftBox(){
  const dispatch = useDispatch()

  // 홈페이지 시작시 언어정보와 취향설정 정보를 스토어에 저장해둔다.
  useEffect(() => {
    const langdata = languageLst()
    const interstdata = interestLst()
    langdata.payload.then((res) => dispatch({type: langdata.type, payload: res.language}))
    interstdata.payload.then((res) => dispatch({type: interstdata.type, payload: res.interests}))
  },[])

  return(
    <LeftSide>
      <Picture src={picture} />
    </LeftSide>
  )
}

function RightBox(){
  return(
    <RightSide>
      <Frame>
        <Title>
          <Learnway src={learnway} />
          <Logo src={logo} />
        </Title>
        <Subtitle src={subment}>
        </Subtitle>
        <Btn/>
      </Frame>
    </RightSide>
  )
}

function Btn(){
  let navigate = useNavigate()
  return (
    <StartBtn onClick={()=>{ navigate('/login') }}>
      START
    </StartBtn>
  )
}
