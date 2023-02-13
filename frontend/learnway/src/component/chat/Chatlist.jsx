import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import UserProfile from './UserProfile';
import Chatroom from './Chatroom'
import logo from '../page/Front/img/logo_pink_airplane.png';
import './ChatScroll.css';

const RoomFrame = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
`;

const TitleBar = styled.span`
    font-size:1.7vw;
    font-weight:700;
    padding:1.5vw 1vw 0.5vw 1.7vw;
    color : #4F4C4D;
    // border:solid 1px black;
`;
const List = styled.ul`
    list-style:none;
    padding-left:0px;
`;
const Body = styled.div`
    height:inherit;
    overflow:scroll;
`;

function Chatlist() {
    const stored  = useSelector(state => state.AuthReducer);
    const chatinfo = useSelector(state => state.ChatinfoReducer);
    // const stored = { userEmail: "aaa@ssafy.com" };
    const [roomList, setRoomList] = useState([]);
    // const [roomInfo, setRoomInfo] = useState([]);
    const [selectUserState, setSelectUserState] = useState(undefined);
    
    useEffect(() => {
        getMyRoomList();
    }, []);

    function getMyRoomList(userEmail) {

                let roomlist = [];

                for (let i = 0; i < chatinfo.length; i++) {
                    roomlist.push(
                        <UserProfile
                            click={setSelectUserState}
                            key={i}
                            id={0}
                            userInfo={chatinfo[i]}
                        ></UserProfile>
                    );

                    // setroomlist   [{id:  body:   }]
                }
                setRoomList(roomlist);
            }

    
    console.log(selectUserState);
    console.log(stored.userEmail);
    return (
        <RoomFrame>
            {selectUserState === undefined ? (
                <>
                    <TitleBar>Message</TitleBar>
                    <Body className='scroll'>
                        <List>
                            <li>{roomList}</li>
                        </List>
                    </Body>
                </>
            ) : (
                <Chatroom info={selectUserState}></Chatroom>
            )}
        </RoomFrame>
    );
} export default Chatlist;