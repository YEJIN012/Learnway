import React from "react";
import styled from "styled-components";

const BTN1_FILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};
    background: ${props=>props.disabled? 'gray': `linear-gradient(90.17deg, #09A7BC 0.19%, #2EC0EE 99.77%)`};
    border-radius: ${props=>props.radius || '0px'};
    font-family: 'Poppins';
    font-style: normal;
    color:#FFFFFF;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    line-height: 18px;
    text-align: center;
    border:none;
    cursor: pointer;
`;

const BTN1_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};
    background:${props=>props.disabled? 'gray': 'none' };
    border: 2.5px solid #09A7BC;
    border-radius: ${props => props.radius || '0px'};
    font-family: 'Poppins';
    font-style: normal;
    font-weight: ${props => props.tetWeight || '700'};
    font-size: ${props => props.fontSize || '20px'};
    line-height: 18px;
    color:#09A7BC;
    text-align: center;
    cursor: pointer;
`;

//width, height, border-radius, font-weight, font-size는 조정 가능하도록(default 속성 적용시킴)
const BTN2_FILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};

    border-radius: ${props=>props.radius || '0px'};

    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    cursor: pointer;
`;

const BTN2_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};

    border-radius: ${props=>props.radius || '0px'};

    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    cursor: pointer;
`;

const BTN3_FILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};
    
    background: ${props=>props.disabled? 'gray': '#005AA7'};
    border-radius: ${props=>props.radius || '0px'};
    border:none;
    
    font-family: 'Lato';
    font-style: normal;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    color:#FFFFFF;
    line-height: 18px;
    text-align: center;
    cursor: pointer;    
`;

const BTN3_UNFILL = styled.button`
    width:${props=>props.width || '70px'};
    height:${props=>props.height || '30px'};
    margin: ${props=>props.margin || '10px'};

    border: 3px solid #005AA7;
    border-radius: ${props=>props.radius || '0px'};
    background:none;

    font-family: 'Lato';
    font-style: normal;
    font-weight: ${props=>props.textWeight || '700'};
    font-size: ${props=>props.fontSize || '20px'};
    color: #005AA7;
    text-align: center;
    cursor: pointer;
`;

const BTN4_FILL = styled.button`
    width: ${props=>props.width || '166px'};
    height: ${props=>props.height || '56px'};
    margin: ${props=>props.margin || '10px'};
    font-size: ${props=>props.fontSize || '20px'};
    font-weight: ${props=>props.textWeight || '700'};
    border-radius: ${props=>props.radius || '999px'};
    border: transparent;
    color: #FFFFFF;
    background-color: #005aa7;
    box-shadow: 0px 3px 8px 0px rgba(0, 90, 167, 1);
    cursor: pointer;
`;

const BTN4_UNFILL = styled.button`
    width: ${props=>props.width || '166px'};
    height: ${props=>props.height || '56px'};
    margin: ${props=>props.margin || '10px'};
    font-size: ${props=>props.fontSize || '20px'};
    font-weight: ${props=>props.textWeight || '700'};
    border-radius: ${props=>props.radius || '999px'};
    border: 3px solid transparent;
    color: #005aa7;
    background-image: linear-gradient(#fffde4, #fffde4),
        linear-gradient(to left, #005aa7, #fffde4);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
`;




function Button({id, width, height, margin, fontSize, textWeight, radius, textValue, onClick, disabled}){
    if(id === "0"){
        return <BTN1_FILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled} >{textValue}</BTN1_FILL>;
    }
    else if(id === "1"){
        return <BTN1_UNFILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled}>{textValue}</BTN1_UNFILL>;
    }
    else if(id === "2"){
        return <BTN2_FILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled}>{textValue}</BTN2_FILL>;
    }
    else if(id === "3"){
        return <BTN2_UNFILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled}>{textValue}</BTN2_UNFILL>;
    }
    else if(id === "4"){
        return <BTN3_FILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled}>{textValue}</BTN3_FILL>;
    }
    else if(id === "5"){
        return <BTN3_UNFILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick} disabled={disabled}>{textValue}</BTN3_UNFILL>;
    }
    else if(id === "6"){
        return <BTN4_FILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick}>{textValue}</BTN4_FILL>;
    }
    else if(id === "7"){
        return <BTN4_UNFILL width={width} height={height} margin={margin} radius={radius} textWeight={textWeight} fontSize={fontSize} onClick={onClick}>{textValue}</BTN4_UNFILL>;
    }

}
export default Button;