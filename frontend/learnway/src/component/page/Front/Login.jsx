import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate, NavLink  } from "react-router-dom";
import Button from '../../ui/Button';

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
  width: 20vw;
  height: 20vh;
  position: absolute;
  padding: 19.9vh 5vw 18vh 4.5vw;
`;

const InputBox = styled.div`
  width: 20vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: 20vw;
  heght: 1.84vh;
  font-size: 0.9vw;
`;

const Input = styled.input`
  width: 20vw;
  heght: 8.1vh;
`;

const Owframe = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  
  width: 20vw;
  heght: 3vh;
`;

const CheckBoxFrame = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Checkboxlabel = styled.p`
  font-size: 0.5vw;
`;

const CheckBox = styled.input`
  display: flex;
  left: 0vw
`;

const BtnFrame = styled.div`
  width: 20vw;

  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  padding: 42.6vh 5vw 18vh 4.9vw;

`

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
  
  // const onReset = () => {
  //   setInputs({
  //     id: "",
  //     password: "",
  //   });
  // };
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
              <Input 
                id="id"
                placeholder="abcdefg@abcd.com"
                onChange={onChange}
                value={id}  
              />
            </InputBox>
            <InputBox>
              <InputTitle>Password</InputTitle>
              <Input 
                id="password"
                placeholder="********"
                onChange={onChange}
                value={password} 
              />
            </InputBox>
            <Owframe>
              <CheckBoxFrame >
                <CheckBox type='checkbox' />
                <Checkboxlabel>Remember Me</Checkboxlabel>
              </CheckBoxFrame>
              <NavLink to="/find_password">Forgot Password?</NavLink>
            </Owframe>
          </InputFrame>
          <BtnFrame>
            <Btn nexturl="/" name="0" txt="Login"></Btn>
            <Btn nexturl="/signup" name="1" txt="Sign Up"></Btn>
          </BtnFrame>
        </LoginBackground>
    </body>
  )
}

function Btn(props){
  let navigate = useNavigate();
  const {nexturl, name, txt} = props;
  return (
    <Button 
      id= {name} 
      width="189.5px" 
      height="38.93px" 
      fontSize="12px" 
      textWeight="700" 
      radius="2.5vh" 
      textValue= {txt}
      onClick={()=>{ navigate({nexturl}) }}>
    </Button>
  )
}