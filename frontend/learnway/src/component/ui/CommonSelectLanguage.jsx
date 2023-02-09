import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const LangSelect = styled.select`
    width : ${props=>props.width || '20.3vw'};
    height : ${props=>props.height || '24px'};
    padding : 1px 2px;
    border-radius: ${props=>props.radius || null};
`;

const SelectTitle = styled.div`
    width: ${props=>props.selectWidth || '20vw'};
    height: ${props=>props.selectHeight || '20px'};
    font-size: ${props=>props.selectFontSize || '0.9vh'};
    opacity: ${props=>props.opacity || null};

`;

const InputFrame = styled.div`
  /* width: 300px; */
  /* height: 63px;  */
  margin: ${(props) => props.margin || "20px 0px 10px 0px"};
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const InputIcon = styled.div`
  width: 100%;
`;

// setLanguage: 상위컴포의 language state 바꾸는 함수호출
// 초기세팅 언어가 없으면 상위컴포 language 초기값을 "Choose" 로 
// BOX width, height 문자열로 지정 ex) "100px"
function SelectLanguage({margin, icon, title, language, setLanguage, width, height, selectWidth, selectHeight, selectFontSize, opacity, radius }){
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
        <InputFrame margin={margin}>
            {icon}
            <InputIcon>
                <SelectTitle opacity={opacity} selectWidth={selectWidth} selectHeight={selectHeight} selectFontSize={selectFontSize}>{title}</SelectTitle>
                <LangSelect onChange={(e)=>{setLanguage(e.currentTarget.value); setValue(e.currentTarget.value)}} value={value} width={width} height={height} radius={radius}>
                <option value="" hidden>
                {language}
                </option>
                {optionList}
                </LangSelect>
            </InputIcon>
        </InputFrame>
    );
};
export default SelectLanguage;