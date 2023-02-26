import React from "react";
import styled from "styled-components";
import { useTranslation } from 'react-i18next';

const Frame = styled.div`
	float:right;
    width:50%;
    display: flex;
    justify-content:center;
    align-items: center;
    flex-direction: column;///
`;
const Mid = styled.div`
    font-size:0.7vw;
    opacity:0.8;
`;

function SelectFrame(...props) {
  
    return (
        <Frame>
            <Mid>
                {props[0].str}
            </Mid>
            {props[0].body}
        </Frame>
    );
}
export default SelectFrame;
