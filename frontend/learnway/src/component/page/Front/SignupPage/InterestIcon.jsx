import styled from 'styled-components';
import React from "react";

const CircleOFFBtn = styled.div`
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  opacity : ${props => props.disabled? "0.3": "0.7"};
  cursor : ${props => props.disabled? null :"pointer"};
`;

const CircleONBtn = styled.div`
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  opacity : ${props => props.disabled? "0.3": "0.7"};
  cursor : ${props => props.disabled? null :"pointer"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
`;


export default function SelectBtn ({disabled, id, icon, chk, onClick}) {

  // disabled 되면 투명도를 키우고 커서 포인터 none
  if (chk === 1){   // 클릭 시 : 그림자 생성
    return <CircleONBtn id={id} disabled={disabled} chk={chk} onClick={onClick}>{icon}</CircleONBtn>
  } else {          // 미클릭 시 : 그림자 없음
    return <CircleOFFBtn id={id} disabled={disabled} chk={chk} onClick={onClick}>{icon} </CircleOFFBtn>
  }
}