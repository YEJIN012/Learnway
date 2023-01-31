import React from "react";
import styled from "styled-components";

import InputGroup from "../ui/InputGroup";
//import ChkBoxComponent from "./ChkBoxComponent";
import TFBtnSet from "./TFBtnSet";
const Frame = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:42vw;
`;

const PreInput = styled.input`
    width:${props => props.inputWidth || '2vw'};
    height:${props => props.inputheight || 'inherit'};
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
    border-radius:5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border:solid 1px #000000;
`;

const LargeInput = styled.textarea`
    width:inherit;
    height:inherit;
`;

const Label = styled.div`
display: flex;
flex-direction: row;
font-size: 1.2vw;
`;
const ChkBox = styled.input``;

function Report() {

    function ChkBoxComponent({ text }) {
        return (
            <Label>
                <ChkBox type="checkbox"></ChkBox>
                {text}
            </Label>
        );

    };
    return (
        <form>
            <Frame>
                <InputGroup
                    flex="row"
                    textValue="Issue Time"
                    fontSize="1.7vw"
                    fontColor="#000000"
                    inputWidth="inherit"
                    inputHeight="2vw"
                    obj={
                        <PreInputGroup>
                            <PreInput type="text" id="reportDate" inputWidth="8vw" inputHeight="1.7vw" value="2023.12.14" readOnly></PreInput>
                            <PreInput type="text" id="reportTime" inputWidth="12vw" inputHeight="1.7vw" value="16:30:10 GMT+9" readOnly></PreInput>
                        </PreInputGroup>
                    }>
                </InputGroup>

                <InputGroup
                    flex="column"
                    textValue="Report Type"
                    fontSize="1.7vw"
                    fontColor="#000000"
                    inputWidth="41vw"
                    inputHeight="16vw"
                    obj={
                        <ChkBoxGroup>
                            <ChkBoxComponent text={["Sexual access", <br />, "(sexual harassment, forced conversation, pornographic broadcasts, etc)"]}></ChkBoxComponent>
                            <ChkBoxComponent text={["verbal abuse", <br />, "(abuse, disparaging remarks, etc)"]}></ChkBoxComponent>
                            <ChkBoxComponent text={["Harmful or dangerous acts", <br />, "(events of curelty, such as inciting terrorism, arson, torture, etc)"]}></ChkBoxComponent>
                            <ChkBoxComponent text={["Investment and multi-level corecion"]}></ChkBoxComponent>
                            <ChkBoxComponent text={["act of causing span or confusion"]}></ChkBoxComponent>
                        </ChkBoxGroup>
                    }>
                </InputGroup>

                <InputGroup
                    flex="column"
                    textValue="Other"
                    fontSize="1.7vw"
                    fontColor="#000000"
                    inputWidth="41vw"
                    inputHeight="10vw"
                    obj={
                        <LargeInput></LargeInput>
                    }>
                </InputGroup>

                <TFBtnSet
                    radius="5px"
                    width="6vw"
                    height="2vw"
                    fontSize="1vw">
                </TFBtnSet>
            </Frame>
        </form>
    )
};
export default Report;
