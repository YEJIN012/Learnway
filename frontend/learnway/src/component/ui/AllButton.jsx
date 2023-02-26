import React from "react";
import './AllButtonCss.css';
import styled from "styled-components";

const NEWBTN = styled.button`
    line-height: ${props=>props.height || "50px"};
    width: ${props=>props.width || "100%"};
    height: ${props=>props.height || "50px"};
    margin: ${props=>props.margin || '0px'};
    font-size: ${props=>props.fontSize || '1.5vw'};
    font-weight: ${props=>props.textWeight || '900'};
    border-radius: ${props => props.radius || '15px'};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function AllButton({width, height, margin, fontSize, textWeight, radius, textValue, onClick, disabled}){
    function makeText(textValue){
        let arr  = [];
        for (let index = 0; index < textValue.length; index++) {
            arr.push( <span key={index}>{textValue[index]}</span>);
        }
        return arr; 
    };
    
    return(
        <NEWBTN className="button button--nina button--round-l button--text-thick button--inverted" data-text={textValue}  width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled} >
            {makeText(textValue)}
        </NEWBTN>
    );

};

export default AllButton;