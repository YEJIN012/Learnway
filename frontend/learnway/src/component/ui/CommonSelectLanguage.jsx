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
    console.log(value)
    //API에서 옵션 목록 가져오는 함수
    function dropdownBoxRenderer(){
        axios.get("https://80f27692-7e52-46ad-a320-53e24b5e4a28.mock.pstmn.io/users/language")
        .then(function(res){
            const data = res.data.language;
            console.log(data);
            
            const options=[];
            for(let i = 0; i < data.length; i++){
                    options.push(<option key={i} value={data[i]}>{data[i]}</option>);
                }
            setOptionList(options);
            }
        ).catch(function(err){
            alert("API 접속 에러");
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