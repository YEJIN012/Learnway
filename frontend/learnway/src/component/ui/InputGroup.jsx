import React from "react";
import styled, { css } from "styled-components";

const Frame = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${(props) => props.margin || ""};
`;

const SubFrame = styled.div`
    display: flex;
    align-items: center;
    margin-left: -3px;

`

const GroupTitle = styled.span`
    font-size: ${(props) => props.fontSize || "1vw"};
    color: ${(props) => props.fontColor || "#000000"};
    margin: "-0.2vw 1vw 0vw 0vw";
`;

const InputForm = styled.div`
    width: ${(props) => props.inputWidth || "2vw"};
    height: ${(props) => props.inputHeight || "1vw"};
    word-break: break-all;
    overflow: ${(props) => props.overFlow || ""};
`;

function InputGroup({
    icon,
    flex,
    textValue,
    fontSize,
    fontColor,
    margin,
    inputWidth,
    inputHeight,
    overFlow,
    obj,
}) {
    //obj : input tag or select... etc...
    return (
        <Frame flex={flex} margin={margin}>
            <SubFrame>
                {icon}
                <GroupTitle fontColor={fontColor} fontSize={fontSize}>
                    {textValue}
                </GroupTitle>
            </SubFrame>
            <InputForm
                inputWidth={inputWidth}
                inputHeight={inputHeight}
                overFlow={overFlow}
            >
                {obj}
            </InputForm>
        </Frame>
    );
}
export default InputGroup;
