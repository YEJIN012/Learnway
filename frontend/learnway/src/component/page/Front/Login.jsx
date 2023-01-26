import React, { useState } from 'react';
import styled from 'styled-components';
// import { useNavigate  } from "react-router-dom";

import '../../ui/Background.css';
import '../../ui/LoginSignup.css';

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

const Mentline = styled.div`
  position: absolute;
  padding: 7.9vh 1.8vw 40.2vh 5vw;
`;

const InputFrame = styled.div`
  position: absolute;
  padding: 19.9vh 5vw 18vh 4.5vw;
`;

const InputBox = styled.div`
  width: 27vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: 27vw;
  heght: 1.84vh;
`;



export default function Login () {
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });
  const { id, password } = inputs;
  const onChange = (e) => {
    const { id, value } = e.target;

    setInputs({
      ...inputs,
      [id]: value,
    });
  };

  const onReset = () => {
    setInputs({
      id: "",
      password: "",
    });
  };

  return (
    <body className="background">
        <LoginBackground>
          <div className='logoframe'>
            <img className='logo' />
          </div>
          <Mentline>
            <div className='ment'>Sign Into</div>
            <div className='ment'>Your Account</div>
          </Mentline>
          <InputFrame>
            <InputBox>
              <InputTitle>E-mail</InputTitle>
            </InputBox>
            <InputBox>
              <InputTitle>Password</InputTitle>
            </InputBox>
          </InputFrame>
        </LoginBackground>
    </body>
  )
}