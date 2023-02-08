import React from 'react';
import styled from 'styled-components';

const InputFrame = styled.div`
  width: 20vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: ${(props) => props.titleWidth || "20vw"};
  height: ${(props) => props.titleHeight || "1.84vh"};
  font-size: ${(props) => props.titleFontSize || "0.9vw"};
`;

const Input = styled.input`
  width: ${(props) => props.inputWidth || "20vw"};
  height: ${(props) => props.inputHeight || "20px"};
`;


export default function InputBox({title, id, type, placeholder, onChange, onKeyUp, ref, value, disabled, titleWidth
  ,titleHeight
  ,titleFontSize
  ,inputWidth
  ,inputHeight }){
  
  return (
    <InputFrame>
      <InputTitle>{title}</InputTitle>
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
        titleWidth
        titleHeight
        titleFontSize
        inputWidth
        inputHeight
      />
    </InputFrame>
  )
}