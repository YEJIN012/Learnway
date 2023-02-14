import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from './animation/BGAirpalne.json';

const AniImg = styled.div`   
    z-index : -2;
    max-height: 100%;
    width: 100%;
    overflow: hidden;
    // margin-bottom:5px;
    position: absolute;
    bottom : 40%;
    // border:1px solid black;
`;

const Wrapper = styled.div`
    width: 100%;
    height:90%;
    // bottom : 10px;
    z-index : -2;
    // position: absolute;
    // top : -10%;
    // border:1px solid red;
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