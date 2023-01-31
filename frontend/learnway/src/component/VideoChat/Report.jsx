import React from "react";
import styled from "styled-components";
import InputGroup from "../ui/InputGroup";
const Frame = styled.div`
    display:flex;
    flex-direction:column;
`;

function Report(){
    return(
        <Frame>
            <InputGroup flex="row" textValue="subtitle" fontSize="1vw" fontColor="#00FF00" inputWidth="10vw" inputHeight="5vw" obj={<input></input>}></InputGroup>
        </Frame>
    )
};
export default Report;
