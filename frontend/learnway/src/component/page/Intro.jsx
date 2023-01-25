import React from 'react';
import styled from 'styled-components';

import logo from '../../img/intro_logo.png';
import learnway from '../../img/learnway.png'
import picture from '../../img/intro_picture.png';

import backgroundImg from "../../img/backgroundImage.jpg"

const Background = styled.body`
  background-image: url(${backgroundImg});
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  background-attachment: fixed;
`;

const Wrapper = styled.div`
  position: relative;
  width: 1440px;
  height: 1024px;
`;

const LeftSide = styled.div`
  position: absolute;
  width: 832px;
  height: 1024px;
  left: 0px;
  top: 0px;
`;

const Picture = styled.img`
  position: absolute;
  width: 596px;
  height: 630px;
  left: 153px;
  top: 232px;
`;

const RightSide = styled.div`
  position: absolute;
  width: 608px;
  height: 1024px;
  left: 833px;
  top: 0px;
`;

const Side2Frame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 409px 121px 409px 30px;
`;

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 549px;
  height: 206px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 92px 0px 0px;
  width: 549px;
  height: 64px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Learnway = styled.img`
  width: 447px;
  height: 64px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Logo = styled.img`
  width: 102px;
  height: 64px;
  flex: none;
  order: 1;
`;

const Subtitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 20px;
  width: 549px;
  height: 91px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const SubtitleMent = styled.span`
  width: 521px;
  height: 63px;
  font-family: var(--font-googleKreon);
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  color: #F2F2F2;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const StartBtn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 10px;
  width: 243px;
  height: 50px;
  flex: none;
  order: 2;
  flex-grow: 0;
  background-color: #0971BC;
  font-family: 'Poppins';
  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #FFFFFF;
`;

export default function Intro () {
  return (
    <Background>
      <Wrapper>
        <RightBox />
        <LeftBox />
      </Wrapper>
    </Background>
  )
}

function LeftBox(){
  return(
    <LeftSide>
      <Picture src={picture} />
    </LeftSide>
  )
}

function RightBox(){
  return(
    <RightSide>
      <Side2Frame>
        <Frame>
          <Title>
            <Learnway src={learnway} />
            <Logo src={logo} />
          </Title>
          <Subtitle>
            <SubtitleMent>
              Fly over the runway with our Learnway
            </SubtitleMent>
          </Subtitle>
          <StartBtn>START</StartBtn>
        </Frame>
      </Side2Frame>
    </RightSide>
  )
}

