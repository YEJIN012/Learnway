import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { useDispatch, useSelector } from "react-redux";
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

const BtnFrame = styled.div`
  width: 20vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  margin: 45vh 5vw 18vh 4.9vw;
`
// email : A4081004@ssafy.com
// password : 1234

function LoginForm (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [userPwd, setUserPwd] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      userEmail: userEmail,
      userPwd: userPwd
    };
    console.log(body)
    dispatch(loginUser(body)).payload
      .then((res) =>{
        console.log(res)
        const status = res.status
        const msg = res.msg
        if (status === 200) {

          // 쿠키에 Refresh Token, store에 Access Token 저장
          setRefreshToken(res.token.refreshToken);
          dispatch(accessToken(res.token.accessToken));

          // 성공했으면 메인 페이지로 이동
          navigate(`/`)
          alert(msg);
        } else if (status === 202) {
          // 아이디 비밀번호가 틀린 경우,
          alert(msg)
        }
      });
    };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <InputBox 
            id="id"
            type="email"
            title="E-mail"
            placeholder="abcdef@dfd.com"
            onChange={(e) => {setUserEmail(e.target.value)}}
            value={userEmail}
            // ref={userRef}
            // onKeyUp={changeButton}
          ></InputBox>
          <InputBox              
            id="password"
            type="password"
            title="Password"
            placeholder="********"
            onChange={(e) => {setUserPwd(e.target.value)}}
            value={userPwd}
            // onKeyUp={changeButton}
          ></InputBox>
          <Owframe>
            <CheckBoxFrame >
              <CheckBox type='checkbox' />
              <Checkboxlabel>Remember Me</Checkboxlabel>
            </CheckBoxFrame>
            <NavLink to="/find_password">Forgot Password?</NavLink>
          </Owframe>
          <button type='submit'> 버튼 </button>
          {/* <BtnFrame>
            <Btn name="0" txt="Login"></Btn>  
            <Btn nexturl='/signup' name="1" txt="Sign Up"></Btn>
          </BtnFrame> */}
        </form>
      </section>
    </>
  )
}



function Btn(props){
  let navigate = useNavigate();
  const {nexturl, name, txt} = props;
  return (
    <Button 
      id= {name} 
      width="13.16vw" 
      height="5vh" 
      fontSize="0.83vw" 
      textWeight="700" 
      radius="2vh" 
      textValue= {txt}
      // onClick={()=>{ navigate(`${nexturl}`) }}
      >
    </Button>
  )
}
export default LoginForm