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
        axios.get("api/users/language")
        .then(function(res){
            const data = res.data.language;
            console.log(data);
            
            const options=[];
            for(let i = 0; i < data.length; i++){
                options.push(<option key={data[i].languageId} value={data[i].name}>{data[i].name}</option>);
            }
            setOptionList(options);
        }).catch(function(err){
            console.log(err);
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