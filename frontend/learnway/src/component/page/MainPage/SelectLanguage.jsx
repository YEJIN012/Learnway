import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import flagData from "./img/flagList.json";

const LangSelect = styled.div`
    // width: 60%;
    // height: 40%;
    text-align : center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const Language = styled.div`
    width :10%;
    // height: 100%;
    padding : 2vw 4vw;
    float:left;
    text-align: center;
    margin: 0 auto;

    font-family: "Raleway", sans-serif;
    font-size: 1vw;
    font-style: normal;

    // font-weight: 300;
    // font-size: 2vw;

    &:hover {
        // background: linear-gradient(to right,  #DAAAA9, #DAAAA9);
        color: #DAAAA9;
        border-radius: 50%;
        font-weight:bolder;
    }
    
`;

const LangImg = styled.img`
    width: 3.5vw;
    height: 2vw;
`;

const SelectLanguage = (props) => {
    const [optionList, setOptionList] = useState([]);
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    // redux store에서 언어 정보를 가져온다.
    const data = useSelector(state => state.UserInfoReducer.language)

    // const TokenReducer = useSelector((state) => state.TokenReducer);

    //API에서 옵션 목록 가져오는 함수
    function dropdownBoxRenderer() {
        // axios
        //     .get("api/users/language", 
        //     // {headers : TokenReducer.accessToken}
        //     )
        //     .then(function (res) {
        //         const data = res.data.language;
                const flag = flagData.data; //국기 이미지 json으로 한번에

                const options = [];
                for (let i = 0; i < data.length; i++) {
                    options.push(
                        <Language key={data[i].languageId} value={data[i].name}
                            onClick={(e) => {
                            updateSelectedValue(data[i].languageId, data[i].name);
                        }}
                        >
                            <LangImg src={flag[i].url}></LangImg><br></br>
                            {flag[i].name}
                        </Language>
                    );
                }
                setOptionList(options);
            }
    

    //드롭다운 박스에서 선택한 요소로 redux 상태 업데이트하는 함수
    function updateSelectedValue(id, val) {
        setValue(val);
        console.log(val);
        //redux state 업데이트
        dispatch({ type: "matchLangUpdate", payload: {languageId:id, languageName:val }});
    }

    useEffect(() => {
        dropdownBoxRenderer();
    }, []);

    return (
        <LangSelect>
            {optionList}
        </LangSelect>
    );
}
export default SelectLanguage;
