import React from "react";
import styled from "styled-components";
import InputGroup from "../ui/InputGroup";
const Frame = styled.div`
    display:flex;
    flex-direction:column;
`;

const PreInput = styled.input`
    width:${props=>props.inputWidth || '2vw'};
    height:${props=>props.inputheight || 'inherit'};
    font-size:1.5vw;
    
    border:none;
    border-radius:5px;
    background:#D9D9D9;
    color:#9B8383
`;

const PreInputGroup = styled.div`
width:22vw;
height:inherit;
display:flex;
flex-direction:row;
justify-content:space-between;
`;
const ChkBoxGroup = styled.div`
    width:inherit;
    height:inherit;
    border:solid 1px #C5C5C5;
    border-radius:5px;
`;

const LargeInput = styled.textarea`
    width:inherit;
    height:inherit;
`;
function Report(){
    return(
        <Frame>
            <InputGroup 
                flex="row" 
                textValue="subtitle" 
                fontSize="1.7vw" 
                fontColor="#000000" 
                inputWidth="inherit" 
                inputHeight="2vw" 
                obj={
                    <PreInputGroup>
                    <PreInput inputWidth="8vw" inputHeight="1.7vw" value="2023.12.14" readOnly></PreInput>
                    <PreInput inputWidth="12vw" inputHeight="1.7vw" value="16:30:10 GMT+9" readOnly></PreInput>
                    </PreInputGroup>
                    }>
            </InputGroup>
            <InputGroup flex="column" textValue="subtitle" fontSize="1.7vw" fontColor="#000000" inputWidth="41vw" inputHeight="16vw" obj={<ChkBoxGroup></ChkBoxGroup>}></InputGroup>
            <InputGroup flex="column" textValue="subtitle" fontSize="1.7vw" fontColor="#000000" inputWidth="41vw" inputHeight="10vw" obj={<LargeInput></LargeInput>}></InputGroup>
        </Frame>
    )
};
export default Report;
