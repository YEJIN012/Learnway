import React from "react";
import styled,{css} from "styled-components";

const Frame=styled.div`
    display:flex;
   flex-direction:${props=>props.flex || 'row'}
`;

const GroupTitle = styled.span`
    font-size:${props=>props.fontSize || '1vw'};
    color:${props=>props.fontColor || '#000000'};
    margin:0vw 1vw 0vw 0vw;

`;

const InputForm = styled.div`
    width:${props=>props.inputWidth || '2vw'};
    height:${props=>props.inputHeight || '1vw'};
`;

function InputGroup({flex, textValue, fontSize, fontColor, inputWidth, inputHeight, obj}) {
    //obj : input tag or select... etc...
    return (
        <Frame flex={flex}>
            <GroupTitle fontColor={fontColor} fontSize = {fontSize}>{textValue}</GroupTitle>
            <InputForm inputWidth={inputWidth} inputHeight={inputHeight}>
                {obj}
            </InputForm>
        </Frame>
    );

};
export default InputGroup;
