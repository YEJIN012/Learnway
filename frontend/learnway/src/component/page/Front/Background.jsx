import React from "react";
import styled from "styled-components";
import logo from './img/logo_skyblue.png'
import BGAll from "./introbackground/BGAll";
import LanguageBar from "../../ui/LanguageBar";


const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: ${ props => props.frame_justify || 'center' };
  align-items: center;
  background-size: cover;
`;

const LoginBackground = styled.div`
  position: absolute;
  width:${props => props.width || '500px'};
  height:${props => props.height || null };
  
  top:${props => props.top || '21vh'};
  right:${props => props.right || props.frame_justify === "center" ? null : '8vw'};

  filter: drop-shadow(0px 0.1vw 5vw rgba(0, 0, 0, 0.4));
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.5vw);
  border-radius: 2.5vh;
`;

const MentFrame = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${props => props.txttop || '90px'};
  margin-left: ${props => props.txtleft || props.align_items ? null : '60px'};
  align-items: ${props => props.align_items || null }
`;

const MentText = styled.div`
  font-size: ${props => props.fsize || '30px'};
  font-weight: 700;
  font-family: 'Poppins';
  font-style: normal;
  color: #4B4B4B;
  opacity: ${props=>props.opacity || null };
  /* display: flex; */
`;

const LogoFrame = styled.div`
  position: absolute;
  right: 30.24px;
  top: 30.72px;
`;

const Logo = styled.img`
  width: 100%;
  height: 20px;
`;

const InputWrapper = styled.div`
  margin-left: ${props=>props.ml || "60px"};
  margin-right: ${props=>props.ml || "60px"};
`;

const Frame = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 20px;
  right: 20px;
`;


export default function BackgroundFrame ({bg, ment1, ment2, width, height, top, right, fsize, mtop, mr, mb, ml, txttop, txtleft, align_items, frame_justify, opacity}) {

  return(
    <Bg frame_justify={frame_justify}>
      <Frame>
        <LanguageBar />
      </Frame>
      <LoginBackground  width={width} height={height} top={top} right={right} >
        <LogoFrame>
          <Logo src={logo} />
        </LogoFrame>
        <MentFrame txttop={txttop} txtleft={txtleft} align_items={align_items}>
          <MentText>{ment1}</MentText>
          <MentText fsize={fsize} opacity={opacity} >{ment2}</MentText>
        </MentFrame>
        <InputWrapper mtop={mtop} mr={mr} mb={mb} ml={ml}>
        {bg}
        </InputWrapper>
      </LoginBackground>
      <BGAll></BGAll>
    </Bg>
  )
}