import React from "react";
import styled from "styled-components";
import Button from "../ui/Button";


const BtnBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
`;

function TFBtnSet(props){
    return(
        <BtnBox>
            <Button id ="5" radius={props.radius} width={props.width} height={props.height} fontSize={props.fontSize} textValue="cancel"></Button>
            <Button id ="6" radius={props.radius} width={props.width} height={props.height} fontSize={props.fontSize} textValue="OK"></Button>
        </BtnBox>
    );
} export default TFBtnSet;