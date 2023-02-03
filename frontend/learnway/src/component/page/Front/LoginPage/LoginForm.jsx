import styled from 'styled-components';
import React, { useState } from 'react';
import { useNavigate, NavLink } from "react-router-dom";
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { useDispatch } from "react-redux";
import { loginUser } from '../actions/userAction';

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
  margin: 45vh 5vw 18vh 4.9vw;
`
// email : A4081004@ssafy.com
// password : 1234


function LoginForm (props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEamil] = useState("");
  const [pw, setPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userEamil: email,
      userPwd: pw
    };
    dispatch(loginUser(data)).payload
      .then((res) =>{
        // console.log(res)
        if ( typeof(res) === "undefined"){
          alert("이메일 혹은 비밀번호가 틀렸습니다.")
        } else {
          navigate(`/`)
          alert("가입이 정상적으로 완료되었습니다");
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
            onChange={(e) => {setEamil(e.target.value)}}
            value={email}
            // ref={userRef}
            // onKeyUp={changeButton}
          ></InputBox>
          <InputBox              
            id="password"
            type="password"
            title="Password"
            placeholder="********"
            onChange={(e) => {setPw(e.target.value)}}
            value={pw}
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