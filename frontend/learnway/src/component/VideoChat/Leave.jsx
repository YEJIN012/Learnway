import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";

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

const BtnBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

function Leave() {
    return (
        <Frame>
        <Msg>Do  you want to leave random matching?</Msg>
        <BtnBox>
            <Button id ="5" radius="10px" width="10vw" height="3vw" fontSize="2vw" textValue="Cancel"></Button>
            <Button id = "6" radius="10px" width="10vw" height="3vw" fontSize="2vw" textValue="OK"></Button>
        </BtnBox>
        </Frame>
    );

};
export default Leave;
