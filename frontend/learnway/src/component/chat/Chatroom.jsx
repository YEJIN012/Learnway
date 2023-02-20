import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { useSelector } from "react-redux";
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

const Head = styled.div`
    display: flex;
    justify-content: start;
    padding-left: 1vw;
    padding-top: 1.5vh;
    align-items: flex-end;
`;

const Body = styled.div`
    width: inherit;
    height: 80%;
    overflow: scroll;
`;

const InputFrame = styled.div`
    box-sizing: border-box;
    width: 20vw;
    min-width: 200px;
    padding: 1.5vh 1vw 2vh 1vw;
    display: grid;
    grid-template-columns: 10fr 1fr;
`;

const Input = styled.input`
    margin: 0vw 2px 0vw 0vw;
    border-radius: 50px;
    background: #EFEFEF;
    border : none;
    padding-left:5%;
    &:focus {
        outline: none;
    }
`;


const Sendbtn = styled.div`
    width: 26px;
    height: 24px;
    background-image: url(${(props) => props.url || ""});
    background-size: cover;
    padding-bottom: 0.1vw;
    border-radius: 50px;
    &:hover {
        filter:grayscale(90%);
    }
    cursor: pointer;
`;


function Chatroom(props) {
    const socket = new SockJS("https://i8a408.p.ssafy.io/api/ws-stomp");
    // const socket = new SockJS("/api/ws-stomp");
    const ws = Stomp.over(socket);
    const scrollRef = useRef();

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
        

        return () => {
            ws.disconnect(() => {
                console.log("Chat Server disconnected");
            });
        };
    }, []);

    useEffect(()=>{
        
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
        
    })

    function loadChatHistory() {
        axios
            .get(`api/chat/room/message/${props.info.roomId}`)
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
                                    key={num}
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
                                    key={num}
                                    id={0}
                                    text={data[i].message}
                                ></ChatText>
                            ),
                        });
                    }
                    //메세지 배열에 추가하고 num증가
                    //setMsgId((msgId) => msgId + 1);
                    num++;

                    // setroomlist   [{id:  body:   }]
                }
                setMsgId(num);
                setChatLog(chatHistory);
                console.log(chatHistory);

                ws.connect({}, (frame) => {
                    console.log("connected to Chat server:", frame);
                    subscribe();
                });

            })
            .catch(function (err) {
                console.log(err);
            });
    }
    function subscribe() {
        let num = msgId;

        ws.subscribe(`/sub/chat/room/${props.info.roomId}`, (event) => {
            const received = JSON.parse(event.body);
            let data = {};
            if (received.sender === props.info.profileDto.userEmail) {
                data = {
                    id: num,
                    msg: <ChatText key={num} id={1} text={received.message}></ChatText>,
                };
            } else {
                data = {
                    id: num,
                    msg: <ChatText key={num} id={0} text={received.message}></ChatText>,
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
        setText("");
    }
    // console.log(stored, props.info.profileDto.userEmail)
    // 유저 프로필에 마지막 수신 정보 상속

    const onKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMsg();
        }
    };

    return (
        <RoomFrame>
            <Head>
                <ArrowBackIcon
                    sx={{ width: "2vw" }}
                    cursor="pointer"
                    onClick={() => {
                        handleSelectUserState(undefined);
                    }}
                ></ArrowBackIcon>
            </Head>
            <UserProfile id={1} room={props.info}></UserProfile>
            <Body className="scroll" ref={scrollRef}>
                <List >
                    {chatLog.map((chatLog) => (
                        <li key={chatLog.id}>{chatLog.msg}</li>
                    ))}
                </List>
            </Body>
            <InputFrame>
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
                <Sendbtn
                    url={iconimg}
                    onClick={() => {
                        sendMsg();
                    }}
                ></Sendbtn>
            </InputFrame>
        </RoomFrame>
    );
}
export default Chatroom;
