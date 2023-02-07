import React from 'react';
import styled from 'styled-components';

//id = 0 : me , id = 1: opponent

const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:${props=>props.id == 0 ? 'flex-end' : 'flex-start'};
`;

const Msg = styled.div`
    background:${props=>props.id == 0 ? '#0000FF' : '#C2C2C2'};
    position: relative;
    display: inline-block;
    max-width: calc(100% - 7vw);
    padding: 0.3vw 1vw 0.3vw 1vw;
    font-size: 1vw;
    border-radius: 23px;
    word-break:break-all;
    color: #FFFFFF;
`
const SendTime = styled.div`
    font-size:0.5vw;
    color:#C5C5C5;
`
function ChatText({...props}) {
    console.log(props.id)
    if(props.id==='0'){
        return (
            <Frame id={props.id}>
                <Msg id={props.id}>{props.text}</Msg>
                <SendTime>{'Today. 8:33pm'}</SendTime>
            </Frame>
        );
    }
    else if(props.id === '1'){
        return (
            <Frame id={props.id}>
                <Msg id={props.id}>{props.text}</Msg>
                <SendTime>{'Today. 8:33pm'}</SendTime>
            </Frame>
        );
    }
} export default React.memo(ChatText);