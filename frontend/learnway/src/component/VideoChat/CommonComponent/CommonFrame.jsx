import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";

//화상 통화창에서 부가서비스로 활용할 창의 공통 검포넌트(유튜브 제외)
const Frame = styled(motion.div)`
    width:46vw;
    height:90vh;
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    border:1px solid black;
`;

const Title = styled.span`
   width:46vw;
    border:solid 1px black;
`;

const Body = styled.div`
    width:46vw;

    display:flex;
    justify-content:center;

    border:1px solid black;
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
