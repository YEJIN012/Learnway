import React from "react";
import styled from "styled-components";

//화상 통화창에서 부가서비스로 활용할 창의 공통 검포넌트(유튜브, 친구추가 제외)
const Frame = styled.div`
    width:46vw;
    height:64vw;
    display:flex;
    flex-direction:column;
    justify-content:space-between;

    border:1px solid black;
`;

const Title = styled.span`
    font-size: 4vw;
    font-weight: 800;
    padding: 1vw 0vw 1vw 2vw;

    border:solid 1px black;
`;
const Body = styled.div`
    width:46vw;
    height:55vw;
    display:flex;
    justify-content:center;

    border:1px solid black;
`;
function CommonFrame(props){
    return(
        <Frame>
            <Title>{props.title}</Title>
            <Body>
                {props.body}
            </Body>
        </Frame>
    );
};
export default CommonFrame;
