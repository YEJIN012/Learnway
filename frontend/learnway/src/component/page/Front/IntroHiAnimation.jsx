import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from '../Front/img/hi.json';

const AniImg = styled.div`
    width: 100%;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 300px;
    height: 300px;
    position: absolute;
    top : 100px;
    left : 200px;
`;

function IntroHiAnimation(){
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

export default IntroHiAnimation;