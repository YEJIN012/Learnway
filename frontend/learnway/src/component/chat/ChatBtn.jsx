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
    // border:solid 1px black;
    box-shadow: 1px 2px 12px #A4A4A4;
    border-radius : 50%;
    &:hover{  
        box-shadow: 0px 2px 18px #A4A4A4;
    }
    `;

const ChatPanel = styled.div`
    width:20vw;
    height:30vw;
    position:fixed;
    z-index:9999;
    left:78vw;
    top:23vh;
    background-color: #FFFFFF;/* 까만색(0,0,0) */
    opacity:0.96; 
    border-radius : 35px;
    // border:solid 1px black;
    // box-shadow: 0px 1px 13px #91A8D0;
    box-shadow: 0px 1px 18px #D7D7D7;
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