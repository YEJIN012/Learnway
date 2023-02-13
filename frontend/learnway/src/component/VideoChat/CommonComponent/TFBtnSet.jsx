import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import AllButton from '../../ui/AllButton';


const BtnBox = styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    padding: 0.5vw;
`;

function TFBtnSet(props){
    return(
        <BtnBox>
            {/* <Button onClick={props.function_cancel} id ="5" radius={props.radius} width={props.width} height={props.height} fontSize={props.fontSize} textValue="cancel"></Button>
            <Button onClick={props.function_ok} id ="4" radius={props.radius} width={props.width} height={props.height} fontSize={props.fontSize} textValue="OK"></Button> */}

            <AllButton
                textValue="Send"
                width="60%"
                height={props.height}
                fontSize={props.fontSize}
                textWeight="100"
                radius="15px"
                margin="0px"
                onClick={props.function_ok} />
        </BtnBox>
    );
} export default TFBtnSet;