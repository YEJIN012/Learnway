import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import Body from "./Body";
import Animation from "./MainAnimation";
import cloudImg from './cloud.png';
import ChatBtn from '../../chat/ChatBtn';
import logo from './mainglobal.png'

const BackGround = styled.div`
    width:100%;
    background-image: url(${cloudImg});
    // background-repeat: no-repeat;
`;
const Picture = styled.img`
    width: 56vmax;
    height: 21vmax;
    // border:1px solid black;
    margin: 2vw auto;
    display: flex;
    flex-direction: column-reverse;
`;

function Home(params) {
    return (
        <div>
            <ChatBtn></ChatBtn>
            <NavBar></NavBar>
            {/* <Picture src={logo}></Picture> */}
            <Animation></Animation>
            {/* <Body></Body> */}
            <BackGround>
                <Body></Body>
            </BackGround>
            
        </div>
    );
}
export default Home;
