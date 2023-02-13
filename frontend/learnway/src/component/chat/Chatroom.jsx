import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import ChatText from "./ChatText";
import axios from "axios";
import iconimg from "../chat/send.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./ChatScroll.css";

const RoomFrame = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const List = styled.ul`
    list-style: none;
    padding-left: 0px;
`;
const Body = styled.div`
    width: inherit;
    height: 80%;
    overflow: scroll;
`;
const InputBox = styled.input`
    width: inherit;
    height: 10%;
    border-radius: 30%;
    // border:solid 1px black;
`;

//검색버튼(유튜브와 공통 컴포넌트)
const SearchBox = styled.div`
    width: inherit;
    height: 3vw;
    margin: 1vw 0.3vw 1vw 0.3vw;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    // border:solid 1px black;
`;

const Input = styled.input`
    width: 19vw;
    height: 2.5vw;
    margin: 0.5vw 0.2vw 0.5vw 0.2vw;
    border-radius: 50px;
    background: #EFEFEF;
    border : none;
    padding-left:5%;
    &:focus {
        outline: none;
        // background: #73A0C6
    }
`;

const Searchbtn = styled.div`
    width: 3vw;
    height: 2.45vw;
    background-image: url(${(props) => props.url || ""});
    background-size: cover;
    padding-bottom: 0.1vw;
    border-radius: 50px;
    &:hover {
        box-shadow: 1px 2px 10px #a4a4a4;
    }
`;

//검색 공통 컴포넌트 끝

const socket = new SockJS("/api/ws-stomp");
const ws = Stomp.over(socket);
function Chatroom(props) {
    const handleSelectUserState = props.handleSelectUserState;
    console.log(handleSelectUserState);
    const stored = useSelector((state) => state.AuthReducer);
    // const stored = { userEmail: "aaa@ssafy.com" };
    const [text, setText] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [msgId, setMsgId] = useState(initMsgId());

    //채팅 기록 컴포넌트 초기 렌더링 시 마지막 순서 기억
    function initMsgId() {
        if (chatLog.length === 0) {
            return 0;
        } else {
            return chatLog[chatLog.length - 1].id;
        }
    }
    
    useEffect(() => {
        loadChatHistory();
        ws.connect({}, (frame) => {
            console.log("connected to Chat server:", frame);
            subscribe();
        });

        return () => {
            ws.disconnect(() => {
                console.log("Chat Server disconnected");
            });
        };
    }, []);

    function loadChatHistory() {
        axios.get(`api/chat/room/message/${props.info.roomId}`)
             .then(function (res) {
                let chatHistory = [];

                const data = res.data;
                //console.log(data);
                let num = 0;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].sender === props.info.profileDto.userEmail) {
                        chatHistory.push({
                            id: i,
                            msg: (
                                <ChatText
                                    id={1}
                                    text={data[i].message}
                                ></ChatText>
                            ),
                        });
                    } else {
                        chatHistory.push({
                            id: i,
                            msg: (
                                <ChatText
                                    id={0}
                                    text={data[i].message}
                                ></ChatText>
                            ),
                        });
                    }
                    //메세지 배열에 추가하고 num증가
                    //setMsgId((msgId) => msgId + 1);
                    num ++;

                    // setroomlist   [{id:  body:   }]
                }
                setMsgId(num)
                setChatLog(chatHistory);
                console.log(chatHistory);
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    function subscribe() {
        let num = msgId;

        ws.subscribe(`/sub/chat/room/${props.info.roomId}`, (event) => {
            const received = JSON.parse(event.body);
            const data = {};
            if (received.sender === props.info.profileDto.userEmail) {
                data = {
                    id: num,
                    msg: <ChatText id={1} text={received.message}></ChatText>,
                };
            } else {
                data = {
                    id: num,
                    msg: <ChatText id={0} text={received.message}></ChatText>,
                };
                // setChatLog([...chatLog, data]);
            }
            setMsgId((msgId) => msgId + 1);
            num++;
            setChatLog((chatLog) => [...chatLog, data]);
            console.log(num);
        });
    }
    useEffect(() => {
        console.log("값이 바뀜");
    }, [msgId]);

    function sendMsg() {
        //websockt emit
        const da = {
            type: "TALK",
            roomId: props.info.roomId,
            sender: stored.userEmail,
            message: text,
        };
        ws.send("/pub/chat/message", {}, JSON.stringify(da));
        setText('')
    }
    // console.log(stored, props.info.profileDto.userEmail)
    // 유저 프로필에 마지막 수신 정보 상속

    const onKeyPress = (e) => {
        if(e.key === 'Enter') {
            sendMsg()
        }
    }

    return (
        <RoomFrame>
            <>
            <ArrowBackIcon
                sx={{ position: "relative", top: "10px", left: "14px" }}
                cursor="pointer"
                onClick={() => {
                    handleSelectUserState(undefined);
                }}
                ></ArrowBackIcon>
                </>
            <UserProfile id={1} room={props.info}></UserProfile>
            <Body className="scroll">
                <List>
                    {chatLog.map((chatLog) => (
                        <li key={chatLog.id}>{chatLog.msg}</li>
                    ))}
                </List>
            </Body>
            <SearchBox>
                <Input
                    id="queryBox"
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    placeholder="Type your message here"
                    type="text"
                    value={text}
                    onKeyPress={onKeyPress}
                ></Input>
                <Searchbtn
                    url={iconimg}
                    onClick={() => {
                        sendMsg();
                    }}
                ></Searchbtn>
            </SearchBox>
        </RoomFrame>
    );
}
export default Chatroom;
