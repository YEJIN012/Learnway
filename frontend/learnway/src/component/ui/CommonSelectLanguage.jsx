import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { languageLst } from "../page/Front/actions/userAction";

const LangSelect = styled.select`
    width : ${props=>props.width || '20.3vw'};
    height : ${props=>props.height || '24px'};
    padding : 1px 2px;
`;
const SelectTitle = styled.div`
  width: ${props=>props.selectWidth || '20vw'};
  height: ${props=>props.selectHeight || '20px'};
  font-size: ${props=>props.selectFontSize || '0.9vh'};
`;

// setLanguage: 상위컴포의 language state 바꾸는 함수호출
// 초기세팅 언어가 없으면 상위컴포 language 초기값을 "Choose" 로 
// BOX width, height 문자열로 지정 ex) "100px"
function SelectLanguage({ title, language, setLanguage, width, height, selectWidth, selectHeight, selectFontSize }){
    const [optionList, setOptionList] = useState([]);
    const [value, setValue] = useState(language);
    const dispatch = useDispatch();
    //API에서 옵션 목록 가져오는 함수
    function dropdownBoxRenderer(){
        dispatch(languageLst()).payload
            .then((res) => {
                const msg = res.msg
                console.log(msg)
                const data = res.language;
                
                const options=[];
                for(let i = 0; i < data.length; i++){
                    options.push(<option key={data[i].languageId} value={data[i].name}>{data[i].name}</option>);
                }
                setOptionList(options);
                }
            ).catch((err) => {
                console.log(err)
                alert("API 접속 에러");
            });
    }

    useEffect(()=> {dropdownBoxRenderer()},[]);
    useEffect(() => {setValue(language)},[language])
    
    return(
        <div>
        <SelectTitle selectWidth={selectWidth} selectHeight={selectHeight} selectFontSize={selectFontSize}>{title}</SelectTitle>
        <LangSelect onChange={(e)=>{setLanguage(e.currentTarget.value); setValue(e.currentTarget.value)}} value={value} width={width} height={height}>
        <option value="" hidden>
        {language}
        </option>
        {optionList}
       </LangSelect>
        </div>
    );
};
export default SelectLanguage;