import React from "react";
import styled from "styled-components";
import { useSelector } from 'react-redux';

const MyLang = styled.div`
    width:40%;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 600;
    font-size: 4vw;
    display: flex;
    justify-content:center;
    align-items: center;
    text-align: center;
`;

function MyLanguage(){
    //상태 저장소에서 나의 언어 가져온다.
    const stored  = useSelector(state => state.UserStore);

    return(
        //나의 언어를 MyLang 태그 내에 넣는다.
        <MyLang>{stored["languageId"]}</MyLang>
    );
};
export default MyLanguage;
