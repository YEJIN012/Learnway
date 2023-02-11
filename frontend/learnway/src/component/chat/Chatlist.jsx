import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import UserProfile from './UserProfile';
import Chatroom from './Chatroom'

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
    //const stored  = useSelector(state => state.UserStore);
    const stored = {userEmail:'aaa@ssafy.com'}
    const [roomList, setRoomList] = useState([]);
    const [roomInfo, setRoomInfo] = useState([]);
    const [selectUserState, setSelectUserState] = useState(undefined)
    //api 받아오기
    useEffect(()=>{
        getMyRoomList(stored.userEmail);
    },[])

    function getMyRoomList(userEmail) {
        axios.get(`api/chat/room/all/${userEmail}`,)
            .then(function (res) {
                let roomlist = []
            
                const data = res.data.Rooms;
                console.log(data)
                
                for (let i = 0; i < data.length; i++) {
                
                    roomlist.push(<UserProfile click={setSelectUserState} key={i} id = {0} userInfo={data[i]}></UserProfile>)
                    
                    // setroomlist   [{id:  body:   }]
                }
                setRoomList(roomlist);

            })
            .catch(function (err) {
                console.log(err);
            });
        }
        console.log(selectUserState)
        console.log(stored.userEmail)
    return (
        <RoomFrame>
            {selectUserState === undefined ? (
                <>
                <TitleBar>Message</TitleBar>
            <Body>
                <List>
                    <li>
                        {roomList}
                    </li>
                </List>
            </Body>
                </>
            ):(
                <Chatroom info={selectUserState}></Chatroom>

            )}
        </RoomFrame>
    );
} export default Chatlist;