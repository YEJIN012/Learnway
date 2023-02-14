import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import iconimg from "../chat/chaticon.png";
import Chatlist from "./Chatlist";

const Frame = styled.div`
    display: flex;
    flex-direction: column-reverse;
    font-family: "nanumSquareNeo";
`;
const Icon = styled.div`
    width: 40px;
    height: 40px;
    background-image: url(${(props) => props.url || ""});
    background-size: cover;
    position: fixed;
    z-index: 9999;
    right: 6vw;
    bottom: 8vh;
    // border:solid 1px black;
    box-shadow: 1px 2px 8px #a4a4a4;
    filter:grayscale( ${(props) => props.filter || 0 });
    border-radius: 50%;
    &:hover {
        /* box-shadow: 0px 2px 13px #a4a4a4; */
        filter:grayscale(90%);
    }
`;

const ChatPanel = styled.div`
    width: 20vw;
    min-width: 200px;
    height: 30vw;
    min-height: 300px;
    position: fixed;
    z-index: 9999;
    right: 6vw;
    bottom: 19vh;
    background-color: #ffffff; /* 까만색(0,0,0) */
    /* opacity: 0.96; */
    border-radius: 20px;
    // border:solid 1px black;
    // box-shadow: 0px 1px 13px #91A8D0;
    box-shadow: 0px 1px 18px #d7d7d7;
`;

function ChatBtn() {
    const state = useSelector((state) => state.ChatBtnReducer);
    const dispatch = useDispatch();
    // const [show, setShow] = useState(false);

    if (state === true) {
        return (
            <>
                <Icon
                    onClick={() => {
                        dispatch({ type: "ChatBtnUpdate", payload: false });
                    }}
                    url={iconimg}
                    filter={0.9}
                ></Icon>

                <ChatPanel>
                    <Chatlist></Chatlist>
                </ChatPanel>
            </>
        );
    } else {
        return (
            <>
                <Icon
                    onClick={() => {
                        dispatch({ type: "ChatBtnUpdate", payload: true });
                    }}
                    url={iconimg}
                ></Icon>
            </>
        );
    }
}
export default ChatBtn;
