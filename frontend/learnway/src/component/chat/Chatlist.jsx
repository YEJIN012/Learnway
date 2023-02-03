import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const RoomFrame = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
`;

const TitleBar = styled.span`
    font-size:2vw;
    font-weight:700;
    padding:1vw 1vw 1vw 1vw;

    border:solid 1px black;
`;
const List = styled.ul`
    list-style:none;
    padding-left:0px;
`;
const Body = styled.div`
    height:inherit;
    overflow:scroll;

    border:solid 1px black;
`;
function Chatlist() {
    const [roomList, setRoomList] = useState([]);

    //api 받아오기
    function getMyRoomList(userEmail) {
        axios.get(`https://i8a408.p.ssafy.io/chat/room/all/${userEmail}`,)
            .then(function (res) {
                const data = res.Rooms;

                for (let i = 0; i < data.length; i++) {
                    //setroomlist   [{id:  body:   }]
                }
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    return (
        <RoomFrame>
            <TitleBar>Message</TitleBar>
            <Body>
                <List>
                    {roomList.map((roomList) => (
                        <li key={roomList.id}>{roomList.body}</li>
                    ))}

                </List>
            </Body>
        </RoomFrame>
    );
} export default Chatlist;