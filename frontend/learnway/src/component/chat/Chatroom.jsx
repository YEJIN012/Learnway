import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import UserProfile from './UserProfile';
import ChatText from './ChatText';
import { connect } from 'net';

const RoomFrame = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    `;

const List = styled.ul`
    list-style:none;
    padding-left:0px;
    `;
const Body = styled.div`
    width:inherit;
    height:80%;
    overflow:scroll;
    
    border:solid 1px black;
    `
const InputBox = styled.input`
    width:inherit;
    height:10%;
    
    border:solid 1px black;
    `;


//검색버튼(유튜브와 공통 컴포넌트)
const SearchBox = styled.div`
    width:23vw;
    height:3vw;
    margin:1vw 0 1vw 0;
    display:flex;
    flex-direction:row;
    align-content:center;
    align-items:center;
    border:solid 1px black;
`;

const Input = styled.input`
width:19vw;
height:2.5vw;
`;

const Searchbtn = styled.div`
width:3vw;
height:3vw;
background-image: url(${props => props.url || ""});
background-size:cover;
`;

//검색 공통 컴포넌트 끝 


const socket = new SockJS('/api/ws-stomp');
const ws = Stomp.over(socket);
function Chatroom(props) {
    const [text, setText] = useState("")
    const [chatLog, setChatLog] = useState([]);
    const [msgId, setMsgId] = useState(initMsgId());
    console.log(chatLog)
    //채팅 기록 컴포넌트 초기 렌더링 시 마지막 순서 기억
    function initMsgId() {
        if (chatLog.length === 0) {
            return 0;
        } else {
            return chatLog[chatLog.length - 1].id;
        }
    }

    function updateComponent(cid, value) {
        console.log("cid : " + cid)
        const data = { id: msgId, msg: <ChatText id={cid} text={value}></ChatText> };
        setMsgId(msgId + 1);
        setChatLog([...chatLog, data]);
    }
    useEffect(()=>{
        ws.connect({}, (frame) => {
             console.log("connected to server:", frame);
             subscribe();
         })
        
    },[])
    function subscribe() {
        ws.subscribe('/sub/chat/room/be73b328-835e-4042-9e9d-862a38b1694b', (event) => {
            const received = JSON.parse(event.body)
            if(received.sender === "bbb@ssafy.com"){
                //console.log("subscribe")
                //updateComponent('1', JSON.parse(event.body).message);   
                const data = { id: msgId, msg: <ChatText id={1} text={received.message}></ChatText> };
                setMsgId(msgId + 1);
                setChatLog([...chatLog, data]);
            }
        })
    }
    

    async function sendMsg() {
        //websockt emit
        const da = {
            type: "TALK",
            roomId: "be73b328-835e-4042-9e9d-862a38b1694b",
            sender: "aaa@ssafy.com",
            message: text
        }
        ws.send('/pub/chat/message', {}, JSON.stringify(da));
        console.log("sendMsg")
        //updateComponent('0', text);
        const data = { id: msgId, msg: <ChatText id={1} text={text}></ChatText> };
                setMsgId(msgId + 1);
                setChatLog([...chatLog, data]);
    }

    return (
        <RoomFrame>

            <UserProfile id={0}></UserProfile>
            <Body>
                <List>
                    {chatLog.map((chatLog) => (
                        <li key={chatLog.id}>{chatLog.msg}</li>
                    ))}

                </List>
            </Body>
            <SearchBox>
                <Input id="queryBox" onChange={(e) => { setText(e.target.value) }}></Input>
                <Searchbtn url={"https://static.solved.ac/tier_small/4.svg"} onClick={() => { sendMsg() }} ></Searchbtn>
            </SearchBox>
        </RoomFrame>
    );
} export default Chatroom;   