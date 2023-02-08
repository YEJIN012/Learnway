import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputBox from "../Input";
import Button from "../../../ui/Button";
import { useDispatch } from "react-redux";
import { loginUser, accessToken } from "../actions/userAction";
import { setRefreshToken } from "../utils/Cookie";

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




export default function LoginForm () {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPwd] = useState("");
  

  // 제출하면 이메일과 패스워드를 보내서 로그인 가능 여부 확인
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
          console.log(res)
          /* console.log(refreshToken) */
          // 쿠키에 Refresh Token 과 email 저장, store에 Access Token 저장
          /* const refreshToken = { refreshToken: res.token.refreshToken , userEmail: res.user.userEmail } */
          /* setRefreshToken(refreshToken); */
          setRefreshToken(res.token.refreshToke);          
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
    <div>
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
        <Button id="0" textValue="Login" width="8vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" />
        <Button id="1" textValue="Sign Up" width="8vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" onClick={() => navigate('/signup')} />        
        </form>
    </div>
  )
}
      
