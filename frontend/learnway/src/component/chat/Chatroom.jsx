import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useDispatch, useSelector } from "react-redux";
import UserProfile from './UserProfile';
import ChatText from './ChatText';
import { chatRoomLst } from './actions/profileAction';
import axios from 'axios'
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
    
    //const stored  = useSelector(state => state.UserStore);
    const stored = {userEmail:'aaa@ssafy.com'}
    const [text, setText] = useState("")
    const [chatLog, setChatLog] = useState([]);
    const [msgId, setMsgId] = useState(initMsgId())

    //채팅 기록 컴포넌트 초기 렌더링 시 마지막 순서 기억
    function initMsgId() {
        if (chatLog.length === 0) {
            return 0;
        } else {
            return chatLog[chatLog.length - 1].id;
        }
    }

    useEffect(()=>{
        loadChatHistory()
        ws.connect({}, (frame) => {
             console.log("connected to server:", frame);
             subscribe();
        })
        
        return()=>{
            ws.disconnect(()=>{
                console.log("console disconnected");
        })}
    },[])

    function loadChatHistory(){
        axios.get(`api/chat/room/message/${props.info.roomId}`,)
            .then(function (res) {
                let chatHistory = []
            
                const data = res.data
                console.log(data)
                let num = msgId
                for (let i = 0; i < data.length; i++) {
                    if(data[i].sender === props.info.profileDto.userEmail){
                        chatHistory.push({ id: num, msg: <ChatText id={1} text={data[i].message}></ChatText> });
                    }else{
                        chatHistory.push({ id: num, msg: <ChatText id={0} text={data[i].message}></ChatText> });
                    }
                    setMsgId((msgId) => msgId+1);
                    num = num + 1;
                    
                    // setroomlist   [{id:  body:   }]
                }
                setChatLog(chatHistory);
                console.log(chatHistory)
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    function subscribe() {
        let num = msgId;
        
        ws.subscribe(`/sub/chat/room/${props.info.roomId}`, (event) => {
            const received = JSON.parse(event.body)
            if(received.sender === props.info.profileDto.userEmail){
                const data = { id: num, msg: <ChatText id={1} text={received.message}></ChatText> };
                setMsgId((msgId) => msgId+1);
                num = num + 1;
                // setChatLog([...chatLog, data]);
                setChatLog((chatLog) => [...chatLog, data]);
            }else{
                const data = { id: num, msg: <ChatText id={0} text={received.message}></ChatText> };
                setMsgId((msgId) => msgId+1);
                num = num + 1;
                setChatLog((chatLog) => [...chatLog, data]);
                console.log(num);
                // setChatLog([...chatLog, data]);
            }
        })
    }
    useEffect(()=>{
        console.log('값이 바뀜')
      }, [msgId])

    function sendMsg() {
        //websockt emit
        const da = {
            type: "TALK",
            roomId: props.info.roomId,
            sender: stored.userEmail,
            message: text
        }
        ws.send('/pub/chat/message', {}, JSON.stringify(da));
    }
   // console.log(stored, props.info.profileDto.userEmail)
            // 유저 프로필에 마지막 수신 정보 상속 
    return (
        <RoomFrame> 
            <UserProfile id={1} room={props.info} ></UserProfile>
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
