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
  width: 30vw;
  height: 65vh;
  left: 77.6vw;
  top: 21.2vh;

  left: 57vw;
  right: 8.32vw;
  top: 21.19vh;
  bottom: 21.19vh;
  
  filter: drop-shadow(0px 0.1vw 5vw rgba(0, 0, 0, 0.4));
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(1.5vw);

  border-radius: 2.5vh;
`;

const MentText = styled.div`
  position: absolute;
  padding: 7.9vh 1.8vw 40.2vh 5vw;
  font-size: 2.22vw;
  font-weight: 700;
  font-family: 'Poppins';
  font-style: normal;
  color: #4B4B4B;
  display: flex;
  align-items: center;
`;

const LogFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  padding: 3vh 2.1vw 52.7vh 18vw;
`;

const Logo = styled.img`
  width: 10vw;
  height: 2.5vh;
`
const InputWrapper = styled.div`
  width: 20vw;
  height: 20vh;
  position: absolute;
  padding: 19.9vh 5vw 18vh 4.5vw;
`;


export default function BackgroundFrame ({bg, ment1, ment2}) {
  return(
    <Bg >
      <LoginBackground>
        <LogFrame>
          <Logo src={logo} />
        </LogFrame>
        <MentText>{ment1}</MentText><br /><br />
        <MentText>{ment2}</MentText>
        <InputWrapper>
        {bg}
        </InputWrapper>
      </LoginBackground>
    </Bg>
  )
}