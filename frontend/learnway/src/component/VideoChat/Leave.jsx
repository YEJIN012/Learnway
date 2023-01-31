import React from "react";
import styled from "styled-components";
import TFBtnSet from "./TFBtnSet";

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


function Leave() {
    return (
        <Frame>
        <Msg>Do  you want to leave random matching?</Msg>
        <TFBtnSet radius="5px" width="5vw" height="2vw" fontSize="1vw"></TFBtnSet>
        </Frame>
    );

};
export default Leave;
