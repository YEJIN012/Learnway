import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGTop.json';

const AniImg = styled.div`   
    z-index : -2;
    overflow: hidden;
`;

const Wrapper = styled.div`
    width: 50%;
    right: 0;
    top: 0;
    position: absolute;
    z-index : -2;
`;

function BGTopAnimation(){
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

export default BGTopAnimation;