import React from "react";
import styled from "styled-components";

const Label=styled.div`
display: flex;
flex-direction: row;
font-size: 1.2vw;
`;
const ChkBox = styled.input``;

function ChkBoxComponent({text}) {
    return (
        <Label>
            <ChkBox type="checkbox"></ChkBox>
            {text}
        </Label>
    );

};
export default ChkBoxComponent;
