import { TabUnselectedOutlined } from "@mui/icons-material";
import React, {useState} from "react";
import styled from "styled-components";
import TFBtnSet from "../CommonComponent/TFBtnSet";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import Button from "../../ui/Button"

const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:absolute;
    top:20vw;
    
`;
const Msg = styled.span`
    font-family : system-ui;
    font-size:2vw;
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
                
                <Button onClick={quit} id ="4" radius={"5px"} width={"5vw"} height={"2vw"} fontSize={"1vw"} textValue="OK"></Button>
                </Frame>
            }>
        </CommonFrame>

    );

};
export default Leave;
