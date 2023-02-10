import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import lottie from "lottie-web";
import data from "./img/lf20_yyjaansa.json"

const AniImg = styled.div`
    width: 100%;
    height: 100%;
`;

const Wrapper = styled.div`
    width: 90vmax;
    height: 23vmax;
    // border:1px solid black;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
`;

function Animation(){
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

export default Animation;