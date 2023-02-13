import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

//화상 통화창에서 부가서비스로 활용할 창의 공통 검포넌트(유튜브 제외)
const Frame = styled(motion.div)`
    width:39vw;
    height:90vh;
    display:flex;
    flex-direction:column;  
    border-radius: 10px;
    background: #ffffff;
    box-shadow: -1px 2px 9px -1px #b5b5b5;
    font-family: "Raleway", sans-serif;
    margin-left: 2.5vw;
`;

const Title = styled.div`
   width:39vw;
   border-radius: 10px 10px 0 0px;
   background: #91a8d0;
//    background: linear-gradient(to right,  #F7CAC9, #91a8d0);   
//    background: linear-gradient(286.15deg, #91a8d0, #f0eee9);
   color: white;
   text-align:center;
   padding-bottom: 2%
`;

const Body = styled.div`
    // width:43vw;
    height:100%;
    display:flex;
    justify-content:center;

    // border:1px solid black;
`;
function CommonFrame({header, body}){
    return(
        <Frame
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.5, 0.71, 0.98, 1.01]
        }} 
        >
            <Title>{header}</Title>
            <Body>
                {body}
            </Body>
        </Frame>
    );
};
export default CommonFrame;
