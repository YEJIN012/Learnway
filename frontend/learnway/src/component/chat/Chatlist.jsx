import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import UserProfile from './UserProfile';
import Chatroom from './Chatroom'
import { chatRoomLst } from './actions/profileAction';
import logo from '../page/Front/img/logo_pink_airplane.png';
import './ChatScroll.css';

const RoomFrame = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
`;

const TitleBar = styled.span`
    font-size:1.3vw;
    /* font-size:3vh; */
    font-weight:700;
    padding:1.5vh 1.5vw 0vh 1.5vw;
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
    const chatinfo = useSelector(state => state.ChatInfoReducer);
    const dispatch = useDispatch();
    // const stored = { userEmail: "aaa@ssafy.com" };
    const [roomList, setRoomList] = useState([]);
    // const [roomInfo, setRoomInfo] = useState([]);
    const [selectUserState, setSelectUserState] = useState(undefined);

    // useEffect(() => {
    //     const roomList = chatRoomLst(stored.userEmail)
    //     console.log(roomList)
    //     roomList.payload.then((res) => dispatch({ type: roomList.type, payload: res }))
    // }, []);
    console.log(chatinfo)

    useEffect(() => {
        getMyRoomList();
    }, [chatinfo]);

    function getMyRoomList() {
                let roomlist = [];
                console.log(chatinfo)
                if(chatinfo.status !== 202) {
                const data = chatinfo.Rooms;
                console.log(data);

                for (let i = 0; i < data.length; i++) {
                    roomlist.push(
                        <UserProfile
                            click={setSelectUserState}
                            key={i}
                            id={0}
                            userInfo={data[i]}
                        ></UserProfile>
                    );

                    // setroomlist   [{id:  body:   }]
                }
            }
                setRoomList(roomlist);
            }
            
    function handleSelectUserState(props) {
        setSelectUserState(props)        
    }

    console.log(selectUserState);
    // console.log(stored.userEmail);
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
                <Chatroom info={selectUserState} handleSelectUserState={handleSelectUserState}></Chatroom>
            )}
        </RoomFrame>
    );
} export default Chatlist;