import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputBox from "../Input";
import { useDispatch } from "react-redux";
import { loginUser, accessToken } from "../actions/userAction";
import { setRefreshToken } from "../utils/Cookie";
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AllButton from "../../../ui/AllButton";

const CheckBoxFrame = styled.div`
  text-align : right;
  margin-top: 15px;
`;

const BtnFrame = styled.div`
  width: 350px;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  justify-content: space-between;
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
    const userInfo = loginUser(body)
    userInfo.payload
      .then((res) =>{
        const status = res.status
        const msg = res.msg
        console.log(msg)
        if (status === 200) {
          
          // 스토어에 유저정보 넣기
          dispatch({type: userInfo.type, payload: res.user});

          // 쿠키에 Refresh Token 과 email 저장, store에 Access Token 저장
          setRefreshToken(res.token.refreshToken);
          const getaccessToken = accessToken(res.token);
          dispatch({type: getaccessToken.type, payload: getaccessToken.payload});
          alert("🤗🤗Good to see you again🤗🤗")

          // 성공했으면 메인 페이지로 이동
          navigate('/');
        } else if (status === 202) {
          // 아이디 비밀번호가 틀린 경우,
          alert("🚨Please double check your email and password!!🚨")
        }
      })
      .catch((err) => alert("A network error has occurred. The request has failed."));
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputBox
                id="id"
                type="email"
                title="E-mail"
                placeholder="abcdef@dfd.com"
                color="primary"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
                value={email}
                icon= {<EmailIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}}  />}
            />
            <InputBox
                id="password"
                type="password"
                title="Password"
                placeholder="********"
                color="primary"
                onChange={(e) => {
                    setPwd(e.target.value);
                }}
                value={pw}
                icon= {<LockOpenIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}}  />}
            />
            <CheckBoxFrame>
                <NavLink style={{ fontSize: "13px", marginRight: "5px", opacity: "0.5"}} to="/find_password">Forgot Password?</NavLink>
            </CheckBoxFrame>
            <BtnFrame>
                <AllButton
                    id="0"
                    textValue="Login"
                    width="150px"
                    height="39px"
                    fontSize="12px"
                    textWeight="900"
                    radius="15px"
                    margin= "0px"
                />
                <AllButton
                    // id="1"
                    textValue="SignUp"
                    width="150px"
                    height="39px"
                    fontSize="12px"
                    textWeight="900"
                    radius="15px"
                    margin= "0px"
                    onClick={() => navigate("/signup")}
                />
            </BtnFrame>
        </form>
    );
}
