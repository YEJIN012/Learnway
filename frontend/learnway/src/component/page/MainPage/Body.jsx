import React from "react";
import styled from "styled-components";
import MyLanguage from "./MyLanguage";
import SelectLanguage from "./SelectLanguage";
import langSelectImg from "./langSelectImg.png";
import camIcon from "./camIcon.png";

import Button from "../../ui/Button"

import { useSelector } from 'react-redux';

const Frame = styled.div`
    width: 50vmax;
    height: 38vmax;
    border:1px solid black;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
`;

const Component=styled.div`
    height:24vmax;
    border:1px solid black;
`;

const SelectSection=styled.div`
    display:flex;
    flex-direction:row;
    border:1px solid black;
    height:60%;
`;

const BtnSection = styled.div`
    border:1px solid black;
    height:40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Img = styled.div`
    width:20%;
    background-image: url(${langSelectImg});
    background-size:cover;
`;

const SelectFrame = styled.div`
    width:40%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const ChkCamera = styled.div`
    width:3vw;
    height:3vw;
    background-image:url(${camIcon});
    background-size:cover;
`;
function startMatching(lang1, lang2){
    alert(lang1.toString() + " " + lang2.toString() + " 매칭 페이지 처리");
}

function Body(){
    //상태 저장소에서 나의 언어 가져오기
    const mylang  = useSelector(state => state.UserStore);
    //상태 저장소에서 상대방 언어 가져오기
    const oppolang = useSelector(state => state.MainStore);
    
    console.log(mylang, oppolang)
    return(
        <Frame>
            <Component>
                <SelectSection>
                    <MyLanguage></MyLanguage>
                    <Img></Img>
                    <SelectFrame>
                        <SelectLanguage></SelectLanguage>
                    </SelectFrame>
                </SelectSection>
                <BtnSection>
                    <Button 
                        id="6" 
                        width="20vw" 
                        height="5vw" 
                        fontSize="2.5vw" 
                        radius="5px" 
                        textValue="GO TO CHAT" 
                        onClick={() => startMatching(mylang.languageId, oppolang)}/>
                    <ChkCamera></ChkCamera>
                </BtnSection>
            </Component>
        </Frame>
    );
};
export default Body;
