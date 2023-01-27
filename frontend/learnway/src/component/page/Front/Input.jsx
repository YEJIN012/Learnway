import React from 'react';
import styled from 'styled-components';

const InputFrame = styled.div`
  width: 20vw;
  height: 6.2vh;
  margin-bottom: 3vh;
`;

const InputTitle = styled.div`
  width: 20vw;
  heght: 1.84vh;
  font-size: 0.9vw;
`;

const Input = styled.input`
  width: 20vw;
  heght: 8.1vh;
`;


export default function InputBox({title, id, type, placeholder, onChange, onKeyUp, ref, value}){
  
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
      />
    </InputFrame>
//   <InputBox>
//   <InputTitle>E-mail</InputTitle>
//   <Input 
//     id="id"
//     placeholder="abcdefg@abcd.com"
    // onChange={(e) => {
    //   setId(e.target.value);
    //   console.log(e.target.value)
    // }}
//     onKeyUp={changeButton}
//   />
// </InputBox>
// <InputBox>
//   <InputTitle>Password</InputTitle>
//   <Input 
//     type="password"
//     id="password"
//     placeholder="********"
//     onChange={(e) => {
//       setPw(e.target.value);
//     }}
//     onKeyUp={changeButton}
//   />
// </InputBox>
  )
}