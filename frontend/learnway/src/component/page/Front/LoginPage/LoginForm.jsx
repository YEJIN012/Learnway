import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { useDispatch } from "react-redux";
import { loginUser, accessToken } from '../actions/userAction';
import { setRefreshToken } from '../utils/Cookie';

const Owframe = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;  
  width: 20vw;
  height: 3vh;
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

function LoginForm (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPwd] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      userEmail: email,
      userPwd: pw
    };
    dispatch(loginUser(body)).payload
      .then((res) =>{
        const status = res.status
        const msg = res.msg
        console.log(msg)
        if (status === 200) {

          // 쿠키에 Refresh Token, store에 Access Token 저장
          setRefreshToken(res.token.refreshToken);
          dispatch(accessToken(res.token.accessToken));

          // 성공했으면 메인 페이지로 이동
          navigate(`/`)
        } else if (status === 202) {
          // 아이디 비밀번호가 틀린 경우,
          alert(msg)
        }
      });
    };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputBox id="id" type="email" title="E-mail" placeholder="abcdef@dfd.com" onChange={(e) => {setEmail(e.target.value)}} value={email} />
        <InputBox id="password" type="password" itle="Password" placeholder="********" onChange={(e) => {setPwd(e.target.value)}} value={pw} />
        <Owframe>
          <CheckBoxFrame >
            <CheckBox type='checkbox' />
            <Checkboxlabel>Remember Me</Checkboxlabel>
          </CheckBoxFrame>
          <NavLink to="/find_password">Forgot Password?</NavLink>
        </Owframe>
        <Btn name="0" txt="Login"></Btn>  
      </form>
      <Btn clickbtn = { () => navigate('/signup') } name="1" txt="Sign Up" />
    </>
  )
}



function Btn(props){
  const {clickbtn, name, txt} = props;
  return (
    <Button 
      id= {name} 
      width="13.16vw" 
      height="5vh" 
      fontSize="0.83vw" 
      textWeight="700" 
      radius="2vh" 
      textValue= {txt}
      onClick={clickbtn}
      >
    </Button>
  )
}
export default LoginForm