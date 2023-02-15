import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

const CircleOFFBtn = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor : ${props => props.disabled? null :"pointer"};
  opacity : ${props => props.opacity || "0.7"};
`;

const CircleONBtn = styled.div`
  width: 110px;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  cursor : ${props => props.opacity === "0" ? null :"pointer"};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 1);
`;

const Icon = styled.img`
    width: 70px;
    height: 70px;
    border: none;
    opacity : ${props => props.opacity || "0.6"};
`;

const IconText = styled.div`
  font-size: inherit;
  white-space : pre-wrap;
`;

export default function SelectBtn ({disabled, id, icontxt, chk, onClick, url, opacity}) {
  const { t } = useTranslation();
  const [a, setA] = useState(1);

  // disabled 되면 투명도를 키우고 커서 포인터 none
  if (chk === 1){   // 클릭 시 : 그림자 생성
    return (
      <CircleONBtn id={id} disabled={disabled} chk={chk} onClick={onClick} >
        <Icon src={url} />
      </CircleONBtn>
    )
  } else {          // 미클릭 시 : 그림자 없음
   
    return (
      // opacity===0.3 
      // ?
      <CircleOFFBtn id={id} disabled={disabled} chk={chk} onClick={onClick} onMouseOver={() => setA(0)} onMouseOut={() => setA(1)}>
       {a === 0 ? <IconText>{t(icontxt)}</IconText>: <Icon src={url} />}
      </CircleOFFBtn>
  )}
}