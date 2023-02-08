import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LangSelect = styled.select`
    width : ${props=>props.width || '100px'};
    height : ${props=>props.height || '20px'};
`;
const InputTitle = styled.div`
  width: 20vw;
  height: 1.84vh;
  font-size: 0.9vw;
`;

// setLanguage: 상위컴포의 language state 바꾸는 함수호출
// 초기세팅 언어가 없으면 상위컴포 language 초기값을 "Choose" 로 
// BOX width, height 문자열로 지정 ex) "100px"
function SelectLanguage({ title, language, setLanguage, width, height }){
    const [optionList, setOptionList] = useState([]);
    const [value, setValue] = useState(language);
    
    // redux store에서 언어 정보를 가져온다.
    const data = useSelector(state => state.UserInfoReducer.language)

    function dropdownBoxRenderer(){
        const options=[];
        for(let i = 0; i < data.length; i++){
            options.push(<option key={data[i].languageId} value={data[i].name}>{data[i].name}</option>);
        }
        setOptionList(options);
    }

    useEffect(()=> {dropdownBoxRenderer()},[]);
    useEffect(() => {setValue(language)},[language])
    
    return(
        <>
        <InputTitle>{title}</InputTitle>
        <LangSelect onChange={(e)=>{setLanguage(e.currentTarget.value); setValue(e.currentTarget.value)}} value={value} width={width} height={height}>
        <option value="" hidden>
        {language}
        </option>
        {optionList}
       </LangSelect>
        </>
    );
};
export default SelectLanguage;