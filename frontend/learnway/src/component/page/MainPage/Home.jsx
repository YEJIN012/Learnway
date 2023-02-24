import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import Body from "./Body";
import ChatBtn from '../../chat/ChatBtn';
import peopleImg from "./img/people.png";
import BGAll from "../Front/introbackground/BGAll";

const BackGround = styled.div`
    position : absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const People = styled.img`
    height: 22vw;
    width: 20vw;
    position : absolute;
    bottom : 3%;
    left : 2%;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5%;
    left : 1%;
    font-size:0.3vw;
    color:#DCD6D6;
    text-decoration-line: none;
`;

function Home() {
    return (
        <div>
            <ChatBtn></ChatBtn>
            <NavBar></NavBar>
            <People src={peopleImg}></People>  
            <BackGround>
                <Body></Body>
            </BackGround>
            <BGAll id = {1}></BGAll>
            <Ref href="https://kr.freepik.com/">Designed by Freepik</Ref>
        </div>
    );
}
export default Home;
