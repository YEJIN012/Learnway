import React, { useState } from "react";
import SelectBtn from "./InterestIcon";
import styled from 'styled-components';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { accessToken, loginUser, registerUser } from "../actions/userAction";
import { setRefreshToken } from "../utils/Cookie";

const SelectFrame = styled.div`
  width: 382px;
  height: 599px;
  display: flex;
  flex-wrap: wrap;
  margin: 138px 71px 0px 0px;
`;


export default function InterestSelect({userinfo, itdata}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [lst, setLst] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let itobj = []

  console.log(itdata)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(itobj)
    
    for (let i = 0; i < itdata.length; i++) {
      if (lst[i]){
        const tmp = {
          "field": itdata[i].field,
          "interestId" : i + 1
        }
        itobj.push(tmp)
      }
    }
    
    function add(key, value) {
      return { ...userinfo, [key]: value }
    }

    const userDto = add('interests', itobj)
    console.log(userDto)
    dispatch(registerUser(userDto)).payload
      .then((res) =>{
        const status = res.status
        const msg = res.msg
        if (status === 200) {
          console.log(msg)
          dispatch(loginUser({userEmail: userinfo.userEmail, userPwd: userinfo.userPwd})).payload
            .then((res) =>{
              const status = res.status
              const msg = res.msg
              if (status === 200) {
      
                // 쿠키에 Refresh Token, store에 Access Token 저장
                setRefreshToken(res.token.refreshToken);
                dispatch(accessToken(res.token.accessToken));
      
                // 성공했으면 메인 페이지로 이동
                navigate(`/`)
                alert("환영쓰");
              } else if (status === 202) {
                // 아이디 비밀번호가 틀린 경우,
                alert(msg)
              }
            });
        }
      })
      .catch((err) => alert("서버 연결 실패"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>선택창</h4>
      <SelectFrame >
        {
          itdata !== ''
          ? (
          itdata.map((e, idx) => {
            if (itdata[idx].field === 'random'){}
            else {
              return (
                <SelectBtn key={idx} id={idx} disabled="" icon={itdata[idx].field} chk={lst[idx]} 
                onClick= {() => {
                  const tmplst = [...lst]
                  tmplst[idx] = (lst[idx] + 1) % 2
                  setLst(tmplst)
                }}
                ></SelectBtn>
                )
              }
          })
          )
          : null
        }
      </SelectFrame>
      <button>Next</button>
    </form>
  )
}



// chk = 1 : button 클릭
// chk = 0 : button 미클릭