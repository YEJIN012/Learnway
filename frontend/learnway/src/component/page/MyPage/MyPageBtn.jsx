import React from "react";
import styled, { css } from "styled-components";

const Btn = styled.button`
    width: 166px;
    height: 56px;
    font-size: 20px;
    font-weight: 700;
    color: #005aa7;
    border: 3px solid transparent;
    border-radius: 999px;
    background-image: linear-gradient(#fefdf7, #fefdf7),
        linear-gradient(to left, #005aa7, #fefdf7);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
`;
// ${props =>
//     (props.content === props.title) &&
//     css`
//       color: red;
//     `}
const SelectedBtn = styled.button`
    width: 166px;
    height: 56px;
    font-size: 20px;
    font-weight: 700;
    color: #fefdf7;
    background-color: #005aa7;
    border-radius: 999px;
    border: transparent;
    shadow-color: #005aa7;
    box-shadow: 0px 3px 8px 0px rgba(0, 90, 167, 1);
    cursor: pointer;
`;

function MyPageBtn(props) {
    const { title, content, onClick } = props;
    if (props.content === props.title) {
        return <SelectedBtn onClick={onClick}>{title}</SelectedBtn>;
    } else {
        return <Btn onClick={onClick}>{title}</Btn>;
    }
}

export default MyPageBtn;
