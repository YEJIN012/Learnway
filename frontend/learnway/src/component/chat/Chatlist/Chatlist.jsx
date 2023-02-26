import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from "react-redux";
import UserProfile from '../UserProfile';
import Chatroom from './ChatRoom/Chatroom'

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

    &{
        -ms-overflow-style:none;
        scrollbar-width:none ;
    }
    
    &::-webkit-scrollbar {
        display:none; 
    }
`;

function Chatlist() {

    const chatinfo = useSelector(state => state.ChatInfoReducer);

    const [roomList, setRoomList] = useState([]);
    const [selectUserState, setSelectUserState] = useState(undefined);

    useEffect(() => {
        getMyRoomList();
    }, [chatinfo]);

    function getMyRoomList() {
        let roomlist = [];

        if (chatinfo.status !== 202) {
            const data = chatinfo.Rooms;

            for (let i = 0; i < data.length; i++) {
                roomlist.push(
                    <UserProfile
                        click={setSelectUserState}
                        key={i}
                        id={0}
                        userInfo={data[i]}
                    />
                );
            }
        }
        setRoomList(roomlist);
    }

    function handleSelectUserState(props) {
        setSelectUserState(props)
    }

    return (
        <RoomFrame>
            {selectUserState === undefined ? (
                <>
                    <TitleBar>Message</TitleBar>
                    <Body>
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