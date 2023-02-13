import { TabUnselectedOutlined } from "@mui/icons-material";
import React, {useState} from "react";
import styled from "styled-components";
import TFBtnSet from "../CommonComponent/TFBtnSet";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import Button from "../../ui/Button"
import AllButton from "../../ui/AllButton";

const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:absolute;
    top:20vw;
    
`;
const Msg = styled.strong`
    font-family :  "Raleway", sans-serif;
    font-size:2vw;
    margin-bottom : 3vw;
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
                <Msg>Do  you want to leave random matching?</Msg>
                <AllButton  onClick={quit} id ="4" radius={"5px"} width={"5vw"} height={"2vw"} fontSize={"1vw"} textValue="OK"/>
                {/* <Button onClick={quit} id ="4" radius={"5px"} width={"5vw"} height={"2vw"} fontSize={"1vw"} textValue="OK"></Button> */}
                </Frame>
            }>
        </CommonFrame>

    );

};
export default Leave;
