import React from 'react';
import styled from 'styled-components';

const InputFrame = styled.div`
  width: 20vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: 20vw;
  height: 1.84vh;
  font-size: 0.9vw;
`;

const Input = styled.input`
  width: 20vw;
  height: "20px"
`;


export default function InputBox({title, id, type, placeholder, onChange, onKeyUp, ref, value, disabled }){
  
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
      />
    </InputFrame>
  )
}