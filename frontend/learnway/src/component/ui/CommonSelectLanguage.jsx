import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

const LangSelect = styled.select`
    width : ${props=>props.width || '100px'};
    height : ${props=>props.height || '20px'};
`;

// setLanguage: 상위컴포의 language state 바꾸는 함수호출
// 초기세팅 언어가 없으면 상위컴포 language 초기값을 "Choose" 로 
// BOX width, height 문자열로 지정 ex) "100px"
function SelectLanguage({ language, setLanguage, width, height }){
    const [optionList, setOptionList] = useState([]);
    const [value, setValue] = useState(language);
    //API에서 옵션 목록 가져오는 함수
    function dropdownBoxRenderer(){
        axios.get("api/users/language")
        .then(function(res){
            const data = res.data.language;            
            const options=[];
            for(let i = 0; i < data.length; i++){
                    options.push(<option key={data[i].languageId} value={data[i].name}>{data[i].name}</option>);
                }
            setOptionList(options);
            }
        ).catch(function(err){
            console.log(err);
        });
    }

    useEffect(()=> {dropdownBoxRenderer()},[]);
    
    return(
        <LangSelect onChange={(e)=>{setLanguage(e.currentTarget.value); setValue(e.currentTarget.value)}} value={value} width={width} height={height}>
        <option value="" hidden>
        {language}
        </option>
        {optionList}
       </LangSelect>
    );
};
export default SelectLanguage;