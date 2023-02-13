import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import Body from "./Body";
import Animation from "./MainAnimation";
import cloudImg from './cloud.png';
import ChatBtn from '../../chat/ChatBtn';
import logo from './mainglobal.png'
import AnimationBG from "./MainAnimationBG";
import skyImg from "./BGSky.png"
import peopleImg from "./people.png";
import BGAll from "../Front/introbackground/BGAll";

const BackGround = styled.div`
    // width:100%;
    // background-image: url(${cloudImg});
    // // background-repeat: no-repeat;
    position : absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Picture = styled.img`
    width: 75vmax;
    height: 23vmax;
    // border:1px solid black;
    margin: 1vw auto;
    display: flex;
    flex-direction: column-reverse;
`;

const Bg = styled.div`
    display:flex;
    justify-content: center;
    align-items:center;
    height: 50vh;
`;
const BGSky = styled.div`
    // border:1px solid black;
    z-index: -1;
    position: fixed;
    height: 45%;
    width: 400%;
    background-image: url(${skyImg});
    background-position: center center;
    background-size: auto 100%;
    animation: background-move 40s infinite;
    animation-timing-function:linear;

    @keyframes background-move{
        from{
            transform: translate(-33%, 0)
        }
       
        to{
            transform: translate(33%, 0)
        }
      }
`;

const People = styled.img`
    // border:1px solid black;
    // position: fixed;
    height: 22vw;
    width: 20vw;
    position : absolute;
    bottom : 5%;
    left : 2%;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5%;
    left : 1%;
    font-size:02.vw;
    color:#DCD6D6;
    text-decoration-line: none;
`;

function Home(params) {
    return (
        <div>
            <ChatBtn></ChatBtn>
            <NavBar></NavBar>
            <People src={peopleImg}></People>
            {/* <Bg><BGSky></BGSky></Bg> */}
            {/* <AnimationBG></AnimationBG> */}
            {/* <Picture src={logo}></Picture> */}
            {/* <Animation></Animation> */}
            {/* <Body></Body> */}       
            <BackGround>
                <Body></Body>
            </BackGround>
            <BGAll></BGAll>
            <Ref href="https://kr.freepik.com/">Freepik</Ref>
        </div>
    );
}
export default Home;
