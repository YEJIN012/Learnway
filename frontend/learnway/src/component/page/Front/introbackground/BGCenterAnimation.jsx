import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGCenter.json';

const AniImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index : -2;
`;

const Wrapper = styled.div`
    width: 72%;
    height: 70%;
    position: absolute;
    top: 47%;
    left: 50%;
    transform: translate(-50%, -45%) rotate(1deg);
    z-index :-2;
`;

function BGCenterAnimation(){
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

export default BGCenterAnimation;