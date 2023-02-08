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
  width:${props => props.width || '30vw'};
  height:${props => props.height || '65vh'};
  left:${props => props.left || '57vw'};
  top:${props => props.top || '21.19vh'};

  right:${props => props.right || '8.32vw'};
  bottom:${props => props.bottom || '21.19vh'};
  
  filter: drop-shadow(0px 0.1vw 5vw rgba(0, 0, 0, 0.4));
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.5vw);
  border-radius: 2.5vh;
`;

const MentText = styled.div`
  position: absolute;
  margin: 7.9vh 1.8vw 0vh 5vw;
  font-size: ${props => props.fsize || '2.22vw'};
  font-weight: 700;
  font-family: 'Poppins';
  font-style: normal;
  color: #4B4B4B;
  display: flex;
`;

const LogoFrame = styled.div`
  position: absolute;
  margin: 3vh 2.1vw 0vh 18vw;
`;

const Logo = styled.img`
  width: 10vw;
  height: 2.5vh;
`
const InputWrapper = styled.div`
  width: 20vw;
  height: 20vh;
  margin-top: ${props=>props.mtop || "19.9vh"};
  margin-right: ${props=>props.mr || "5vw"};
  margin-bottom: ${props=>props.mb || "18vh"};
  margin-left: ${props=>props.ml || "4.5vw"};
`;


export default function BackgroundFrame ({bg, ment1, ment2, width, height, left, top, right, bottom, fsize, mtop, mr, mb, ml}) {
  return(
    <Bg >
      <LoginBackground width={width} height={height} left={left} top={top} right={right} bottom={bottom}>
        <LogoFrame>
          <Logo src={logo} />
        </LogoFrame>
        <MentText>{ment1}</MentText><br /><br />
        <MentText fsize={fsize}>{ment2}</MentText>
        <InputWrapper mtop={mtop} mr={mr} mb={mb} ml={ml}>
        {bg}
        </InputWrapper>
      </LoginBackground>
    </Bg>
  )
}