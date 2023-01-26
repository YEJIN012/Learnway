import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import MyPageTab from "./MyPageTab";

const Background = styled.div`
    background-color: #fefdf7;
    height: 100vh;
`

function Mypage() {
    return (
        <Background>
            <NavBar />
            <MyPageTab/>
        </Background>
    );
}
export default Mypage;
