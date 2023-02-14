import { TabUnselectedOutlined } from "@mui/icons-material";
import React, {useState} from "react";
import styled from "styled-components";
import TFBtnSet from "../CommonComponent/TFBtnSet";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import Button from "../../ui/Button"
import AllButton from "../../ui/AllButton";
import ImgBye from "./quitImg.png";

const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:absolute;
    
    
`;
const Msg = styled.strong`
    font-family :  "Raleway", sans-serif;
    font-size:1.5vw;
    margin-bottom : 3vw;
`;

const Picture = styled.img`
    height: 23vmax;
    // border:1px solid black;
    display: flex;
    flex-direction: column-reverse;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5%;
    left : 1%;
    font-size:0.3vw;
    color:#DCD6D6;
    text-decoration-line: none;
`;

function Leave({getQuitFlag}) {
    const [quitFlag, setQuitFlag] = useState(0);
    function quit(){
        setQuitFlag(1);
        console.log(quitFlag)

    }
    getQuitFlag(quitFlag);
    return (
        <CommonFrame 
            header={<Title title={"Quit"}></Title>} 
            body={
                <Frame>
                    <Picture src={ImgBye}></Picture>
                    <Ref href="https://kr.freepik.com/">Designed by Freepik</Ref>
                    
                <Msg>Do  you want to leave random matching?</Msg>
                <AllButton  onClick={quit} id ="4" radius={"30px"} width={"8vw"} height={"2.5vw"} fontSize={"1vw"} textValue="OK"/>
                {/* <Button onClick={quit} id ="4" radius={"5px"} width={"5vw"} height={"2vw"} fontSize={"1vw"} textValue="OK"></Button> */}
                </Frame>
            }>
        </CommonFrame>

    );

};
export default Leave;
