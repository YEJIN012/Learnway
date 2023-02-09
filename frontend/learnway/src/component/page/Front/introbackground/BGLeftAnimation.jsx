import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGLeftBottom.json';

const AniImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    bottom : -25%;
`;

const Wrapper = styled.div`
    width: 60%;
    height: 90%;
    position: absolute;
    left : 0px;
    bottom : 0px;
    overflow: hidden;
    z-index : -1;
`;

function BGLeftBottomAnimation(){
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

export default BGLeftBottomAnimation;