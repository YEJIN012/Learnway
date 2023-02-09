import React from "react";
import styled from "styled-components";
import logo from './img/logo_skyblue.png'
const Bg = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-size: cover;
  background-image: linear-gradient(to right, #005aa7,#fffde4);
  
`;

const LoginBackground = styled.div`
  position: absolute;
  width:${props => props.width || '500px'};
  height:${props => props.height || null };
  
  top:${props => props.top || '21.19vh'};
  right:${props => props.right || '140px'};
  
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
  /* justify-content: ${props => props.justify_content || null } */
`;

const MentText = styled.div`
  font-size: ${props => props.fsize || '40px'};
  font-weight: 700;
  font-family: 'Poppins';
  font-style: normal;
  color: #4B4B4B;
  /* display: flex; */
`;

const LogoFrame = styled.div`
  position: absolute;
  right: 30.24px;
  top: 30.72px;
`;

const Logo = styled.img`
  width: 170px;
  height: 25.6px;
`;

const InputWrapper = styled.div`
  margin-left: ${props=>props.ml || "60px"};
  margin-right: ${props=>props.ml || "60px"};
`;


export default function BackgroundFrame ({bg, icon, ment1, ment2, width, height, left, top, right, bottom, fsize, mtop, mr, mb, ml, txttop, txtleft, align_items}) {
  return(
    <Bg >
      <LoginBackground width={width} height={height} left={left} top={top} right={right} bottom={bottom}>
        <LogoFrame>
          <Logo src={logo} />
        </LogoFrame>
        <MentFrame align_items={align_items}>
          <MentText>{ment1}</MentText>
          <MentText fsize={fsize}>{ment2}</MentText>
        </MentFrame>
        <InputWrapper mtop={mtop} mr={mr} mb={mb} ml={ml}>
        {bg}
        </InputWrapper>
      </LoginBackground>
    </Bg>
  )
}