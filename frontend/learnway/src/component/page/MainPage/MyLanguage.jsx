import React from "react";
import styled from "styled-components";

const MyLang = styled.div`
    width:40%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 100px;
    line-height: 150px;
    display: flex;
    align-items: center;
    text-align: center;
`;

function MyLanguage(){
    //상태 저장소에서 나의 언어 가져온다.
    return(
        //나의 언어를 MyLang 태그 내에 넣는다.
        <MyLang>{}</MyLang>
    );
};
export default MyLanguage;
