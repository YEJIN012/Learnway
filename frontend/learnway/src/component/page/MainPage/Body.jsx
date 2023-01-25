import React from "react";
import styled from "styled-components";

const Frame = styled.div`
    width: 50vmax;
    height: 38vmax;
    background: #000000;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
`;

const Component=styled.div`
    height:24vmax;
    background:#00FF00;
`;

const SelectSection=styled.div`
    background:purple;
    height:60%;
`;

const BtnSection = styled.div`
    background:yellow;
    height:40%;
`;

const MyLanguage = styled.span`

`;

const Img = styled.img``;

const SelectLanguage = styled.select``;

function Body(){
    return(
        <Frame>
            <Component>
                <SelectSection>
                    <MyLanguage></MyLanguage>
                    <Img></Img>
                    <SelectLanguage></SelectLanguage>
                </SelectSection>
                <BtnSection></BtnSection>
            </Component>
        </Frame>
    );
};
export default Body;
