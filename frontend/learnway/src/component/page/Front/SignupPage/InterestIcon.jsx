import styled from 'styled-components';
import React from "react";

const CircleOFFBtn = styled.div`
  width: 110px;
  height: 110px;
  line-height: ${props => props.opacity === "0.3" ? "110px" : "220px" };
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor : ${props => props.disabled? null :"pointer"};
  opacity : ${props => props.opacity || "0.6"};
  background-image: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
  &:hover {
    opacity : ${props => props.opacity || "0.3"};
    background-color: rgb(0, 0, 0, 0.5);
    color: rgb(255, 255, 255, 100);
  }
`;

const CircleONBtn = styled.div`
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor : ${props => props.opacity === "0" ? null :"pointer"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
  background-image: url(${props => props.url});
  background-size: contain;
  background-repeat: no-repeat;
`;


export default function SelectBtn ({disabled, id, icontxt, chk, onClick, url, opacity}) {

  // disabled 되면 투명도를 키우고 커서 포인터 none
  if (chk === 1){   // 클릭 시 : 그림자 생성
    return (
      <CircleONBtn id={id} disabled={disabled} chk={chk} onClick={onClick} url={url}>
      </CircleONBtn>
    )
  } else {          // 미클릭 시 : 그림자 없음
    return (
      opacity===0.3 
      ?
      <CircleOFFBtn id={id} disabled={disabled} chk={chk} onClick={onClick} url={url}>
      </CircleOFFBtn>
      :
      <CircleOFFBtn id={id} disabled={disabled} chk={chk} onClick={onClick} url={url}>
      {icontxt} 
      </CircleOFFBtn>
  )}
}