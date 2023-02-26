import React from "react";
import styled from "styled-components";

const Frame = styled.div`
    background: linear-gradient(to bottom, #36475f, #2c394f);
    padding: 12px 20px;
    height: 5vh;
`;

const Flight = styled.div`
    float: right;
    color: #fff;
    text-align: right;
`;

const Small = styled.div`
    font-size: 8px;
    margin-bottom: 2px;
    opacity: 0.8;
`;

function Header() {
    return (
        <Frame>
            <Flight>
                <Small>flight</Small>
                <strong>A408</strong>
            </Flight>
        </Frame>
    );
}
export default Header;
