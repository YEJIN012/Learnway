import React from "react";
import styled from "styled-components";

const Text = styled.span`
    font-size: 4vw;
    font-weight: 800;
    padding: 1vw 0vw 1vw 2vw;
    // border:solid 1px black;
    // text-align: center;
`;
function CommonText(props){
    return(
        <Text>{props.title}</Text>
    );
};
export default CommonText;
