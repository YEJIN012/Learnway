import React from "react";
import styled from "styled-components";
import Body from "./Body/Body";
import peopleImg from "./src/people.png";
import BgComp from "../Common/BgComp";

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
        <>
            <BgComp id={1}/>
            <People src={peopleImg}/>   
            
            <BackGround>
                <Body/>
            </BackGround>
            
            <Ref href="https://kr.freepik.com/">
                Designed by Freepik
            </Ref>
        </>
    );
}
export default Home;
