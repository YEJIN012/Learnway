import React from "react";
import styled from "styled-components";

const InputFrame = styled.div`
    /* width: 300px; */
    /* height: 63px;  */
    margin: ${(props) => props.margin || "20px 0px 10px 0px"};
    display: flex;
    flex-direction: row;
    align-items: flex-end;
`;

const InputTitle = styled.div`
    width: ${(props) => props.titleWidth || "200px"};
    height: ${(props) => props.titleHeight || "18.8416px"};
    font-size: ${(props) => props.titleFontSize || "13px"};
    opacity: 0.5;
`;

const InputIcon = styled.div`
    width: 100%;
`;

const Input = styled.input`
    width: ${(props) => props.inputWidth || "335px"};
    height: ${(props) => props.inputHeight || "35px"};
    padding-left: 10px;
    border-radius: 6px;
    border: ${(props) => props.border || "none"};
    background-color: ${(props) => props.backgroundColor || ""};
`;

export default function InputBox({
    icon,
    title,
    id,
    type,
    placeholder,
    onChange,
    onKeyUp,
    ref,
    value,
    disabled,
    titleWidth,
    titleHeight,
    titleFontSize,
    inputWidth,
    inputHeight,
    margin,
    backgroundColor,
    border,
    max,
}) {
    return (
        <InputFrame margin={margin}>
            {icon}
            <InputIcon>
                <InputTitle
                    titleWidth={titleWidth}
                    titleHeight={titleHeight}
                    titleFontSize={titleFontSize}
                >
                    {title}
                </InputTitle>
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyUp={onKeyUp}
                    ref={ref}
                    value={value}
                    autoComplete="off"
                    required
                    disabled={disabled}
                    inputWidth={inputWidth}
                    inputHeight={inputHeight}
                    backgroundColor={backgroundColor}
                    border={border}
                    max={max}
                    ime-mode="inactive"
                />
            </InputIcon>
        </InputFrame>
    );
}
