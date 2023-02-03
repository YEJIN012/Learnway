import React, { useState } from "react";
import interest from "../../../ui/Interest.json"
import SelectBtn from "./InterestIcon";
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { registerUser } from "../actions/userAction";

const SelectFrame = styled.div`
  width: 382px;
  height: 599px;
  display: flex;
  flex-wrap: wrap;
  margin: 138px 71px 0px 0px;
`;


export default function InterestSelect({userinfo}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const textdata = interest.interests
  let [lst, setLst] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let itobj = []
  const handleSubmit = (e) => {
    console.log(itobj)
    e.preventDefault();
    
    for (let i = 0; i < 16; i++) {
      if (lst[i]){
        const tmp = {
          "field": textdata[i].field,
          "interestId" : i
        }
        itobj.push(tmp)
      }
    }
    const realInfo = { ...userinfo, interest: itobj }

    dispatch(registerUser(realInfo)).payload
      .then((res) =>{
        const status = res.status
        const msg = res.msg
        if (status === 200) {

          // // 쿠키에 Refresh Token, store에 Access Token 저장
          // setRefreshToken(res.token.refreshToken);
          // dispatch(accessToken(res.token.accessToken));

          // // 성공했으면 메인 페이지로 이동
          // navigate(`/`)
          alert(msg);
        } else if (status === 202) {
          // 아이디 비밀번호가 틀린 경우,
          alert(msg)
        }
      });
    };

  return (
    <form onSubmit={handleSubmit}>
      <h4>선택창</h4>
      <SelectFrame >
        {
          textdata.map((e, idx) => {
            return (
              <SelectBtn
                key={idx}
                id={idx} 
                disabled="" 
                icon={textdata[idx].field} 
                chk={lst[idx]} 
                onClick= {() => {
                  const tmplst = [...lst]
                  tmplst[idx] = (lst[idx] + 1) % 2
                  setLst(tmplst)
                }}
              ></SelectBtn>
            )}
          ) 
        }
      </SelectFrame>
      <button>Next</button>
    </form>
  )
}


// chk = 1 : button 클릭
// chk = 0 : button 미클릭