import React, { useState } from 'react';
import styled from 'styled-components';
import iconimg from '../chat/chaticon.png'
import Chatlist from './Chatlist'

const Frame = styled.div`
        display:flex;
        flex-direction:column-reverse;

    `;
const Icon = styled.div`
    width:3vw;
    height:3vw;
    background-image:url(${props => props.url || ""});
    background-size:cover;
    position:fixed;
    z-index:9999;
    left:95vw;
    top:85vh;
    border:solid 1px black;
    `;

const ChatPanel = styled.div`
    width:20vw;
    height:30vw;
    position:fixed;
    z-index:9999;
    left:78vw;
    top:23vh;
    background-color:#FFFFFF;

    border:solid 1px black;
`;

function ChatBtn() {
    const [show, setShow] = useState(false);

    if (show === true) {
        return (

            <>
                <Icon onClick={() => { setShow(!show) }} url={iconimg}></Icon>


                <ChatPanel>
                    <Chatlist></Chatlist>
                </ChatPanel>


            </>
        )

    } else {
        return (

            <>
                <Icon onClick={() => { setShow(!show) }} url={iconimg}></Icon>


            </>
        );
    }

} export default ChatBtn;