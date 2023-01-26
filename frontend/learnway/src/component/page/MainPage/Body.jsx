import React from "react";
import styled from "styled-components";
import MyLanguage from "./MyLanguage";
import SelectLanguage from "./SelectLanguage";
import langSelectImg from "./langSelectImg.png";

const Frame = styled.div`
    width: 50vmax;
    height: 38vmax;
    border:1px solid black;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
`;

const Component=styled.div`
    height:24vmax;
    border:1px solid black;
`;

const SelectSection=styled.div`
    display:flex;
    flex-direction:row;
    border:1px solid black;
    height:60%;
`;

const BtnSection = styled.div`
    border:1px solid black;
    height:40%;
`;

const Img = styled.div`
    width:20%;
    background-image: url(${langSelectImg});
    background-size:cover;
`;

const SelectFrame = styled.div`
    width:40%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

function Body(){
    return(
        <Frame>
            <Component>
                <SelectSection>
                    <MyLanguage></MyLanguage>
                    <Img></Img>
                    <SelectFrame>
                        <SelectLanguage></SelectLanguage>
                    </SelectFrame>
                </SelectSection>
                <BtnSection>
                    
                </BtnSection>
            </Component>
        </Frame>
    );
};
export default Body;
