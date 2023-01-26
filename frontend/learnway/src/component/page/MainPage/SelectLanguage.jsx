import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import axios from 'axios';

const LangSelect = styled.select`
    width:60%;
    height:40%
`;

function SelectLanguage(){
    const [optionList, setOptionList] = useState([]);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    
    //API에서 옵션 목록 가져오는 함수
    function dropdownBoxRenderer(){
        axios.get("https://80f27692-7e52-46ad-a320-53e24b5e4a28.mock.pstmn.io/users/language")
        .then(function(res){
            const data = res.data.language;
            console.log(data);
            
            const options=[];
            for(let i = 0; i < data.length; i++){
                options.push(<option key={i} value={i}>{data[i]}</option>);
            }
            setOptionList(options);
        }).catch(function(err){
            alert("API 접속 에러");
        });
    }

    //드롭다운 박스에서 선택한 요소로 redux 상태 업데이트하는 함수
    function updateSelectedValue(val){
        //드롭다운 박스 state업데이트
        setValue(val);
        //redux state 업데이트
        dispatch({type:"matchLangUpdate", payload:val})
    }

    useEffect(()=> {dropdownBoxRenderer()},[]);
    
    return(
        <LangSelect onChange={(e)=>{updateSelectedValue(e.currentTarget.value)}} value={value}>
        <option value="" hidden>
          Choose
        </option>
        {optionList}
       </LangSelect>
    );
};
export default SelectLanguage;