import React from "react";
import styled from "styled-components";

const Tag = styled.div`
    border-radius: 5px;
    background-color: white;
    border: 3px solid orange;
    width: 100px;
    height: 50px;
    rotate: 6deg;
    margin-bottom: -3vh;
    z-index: 1;
`;

const Header = styled.div`
    background: orange;
    border-top-right-radius: 2px;
    border-top-left-radius: 2px;
    padding: 2px;
    z-index: 1;
`;

const Hello = styled.div`
    font-family: sans-serif;
    font-weight: bold;
    text-align: center;
    font-size: 40%;
    color: white;
    z-index: 1;
`;

const Mynameis = styled.div`
    height: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    font-family: sans-serif;
    font-weight: bold;
    text-align: center;
    font-size: 50%;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
`;

export default function NameTag({ subtitle }) {
    return (
        <Tag>
            <Header>
                <Hello>Learnway</Hello>
            </Header>
            <Mynameis>{subtitle}</Mynameis>
        </Tag>
    );
}
