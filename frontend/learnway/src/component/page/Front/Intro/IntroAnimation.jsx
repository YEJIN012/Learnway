import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from '../Front/img/callandvideo.json';

const AniImg = styled.div`
    width: 100%;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 40%;
    height: 40%;
    text-align: center;
    z-index : -1;
    position:absolute;
    top: 35%;
`;

function IntroAnimation(){
    const aniBox = useRef();

    useEffect(()=>{
        lottie.loadAnimation({
            container : aniBox.current,
            renderer : 'svg',
            loop: true,
            autoplay : true,
            animationData : data,
        })

    },[]);

    return(
        <Wrapper>
            <AniImg ref={aniBox}></AniImg>
        </Wrapper>
    );
};

export default IntroAnimation;