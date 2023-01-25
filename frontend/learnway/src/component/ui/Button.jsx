import React from "react";
import styled from "styled-components";

const BTN1_FILL = styled.button`
    width:${props=>props.width || '70px'};;
    height:${props=>props.height || '30px'};;
    background: linear-gradient(90.17deg, #09A7BC 0.19%, #2EC0EE 99.77%);
    border-radius: ${props=>props.radius || '0px'};
    font-family: 'Poppins';
    font-style: normal;
    color:#FFFFFF;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    line-height: 18px;
    text-align: center;
    border:none;

`;
const BTN1_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    background:none;
    border: 2.5px solid #09A7BC;
    border-radius: ${props => props.radius || '0px'};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: ${props => props.tetWeight || '700'};
    font-size: ${props => props.fontSize || '20px'};
    line-height: 18px;
    color:#09A7BC;
    text-align: center;
`;
//width, height, border-radius, font-weight, font-size는 조정 가능하도록(default 속성 적용시킴)
const BTN2_FILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};

    border-radius: ${props=>props.radius || '0px'};

    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
`;

const BTN2_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};

    border-radius: ${props=>props.radius || '0px'};

    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
`;

const BTN3_FILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    
    background: #005AA7;
    border-radius: ${props=>props.radius || '0px'};
    border:none;
    
    font-family: 'Lato';
    font-style: normal;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    color:#FFFFFF;
    line-height: 18px;
    text-align: center;

    
`;
const BTN3_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};

    border: 3px solid #005AA7;
    border-radius: ${props=>props.radius || '0px'};
    background:none;

    font-family: 'Lato';
    font-style: normal;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    color: #005AA7;
    line-height: 18px;
    text-align: center;
`;
function Button({id, width, height, fontSize, textWeight, radius, textValue}){
    if(id === "0"){
        return <BTN1_FILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN1_FILL>;
    }
    else if(id === "1"){
        return <BTN1_UNFILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN1_UNFILL>;
    }
    else if(id === "2"){
        return <BTN2_FILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN2_FILL>;
    }
    else if(id === "3"){
        return <BTN2_UNFILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN2_UNFILL>;
    }
    else if(id === "4"){
        return <BTN3_FILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN3_FILL>;
    }
    else if(id === "5"){
        return <BTN3_UNFILL width={width} height={height} radius={radius} textWeight={textWeight} fontSize={fontSize}>{textValue}</BTN3_UNFILL>;
    }
}
export default Button;