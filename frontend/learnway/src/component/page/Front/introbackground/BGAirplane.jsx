import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGAirpalne.json';

const AniImg = styled.div`   
    z-index : -2;
    max-height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    bottom : 40%;
`;

const Wrapper = styled.div`
    width: 100%;
    height:90%;
    z-index : -2;
    overflow: hidden;
`;

function BGAirPlane(){
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

export default BGAirPlane;