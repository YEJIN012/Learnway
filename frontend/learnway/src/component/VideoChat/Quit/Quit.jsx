import { TabUnselectedOutlined } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import TFBtnSet from "../CommonComponent/TFBtnSet";

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
function quit(){
    alert("나가기 처리");
}
function cancel(){
    alert("나가기 취소 처리");
}

function Leave() {
    
    return (
        <Frame>
        <Msg>Do  you want to leave random matching?</Msg>
        <TFBtnSet function_ok={()=>{quit()}} function_cancel={()=>{cancel()}} radius="5px" width="5vw" height="2vw" fontSize="1vw"></TFBtnSet>
        </Frame>
    );

};
export default Leave;
