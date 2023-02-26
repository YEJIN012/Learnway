
import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import { useDispatch, useSelector } from "react-redux";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { useNavigate } from "react-router-dom";
import SubFrame1 from "./SubFrame/SubFrame1"
import SubFrame2 from "./SubFrame/SubFrame2"

const Frame = styled.div`
padding-top: 10vh;
display: flex;
flex-direction: row;
/* border: solid 1px black; */
`;


  function Loading() {
    const socket = new SockJS("https://i8a408.p.ssafy.io/api/ws-stomp");
    const ws = Stomp.over(socket);
    
    const userInfo = useSelector((state) => state.AuthReducer);
    const studyLng = useSelector((state) => state.MainReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const matchingServerRoomId = `${userInfo.userEmail}-${studyLng.languageId}`;
    
    useEffect(() => {
        ws.connect({}, (frame) => {
            console.log("connected to Matching server:", frame);
            subscribe();
            setTimeout(timeLimit, 180000)
        });

        return () => {
            ws.disconnect(() => {
                console.log("Disconnected from Matching Server");
            });
        };
    }, []);
    
    function timeLimit(){
      alert("Macting was not successful")
      navigate(`/`,{replace:true});
    }

    function subscribe(){
        ws.subscribe(`/sub/chat/room/${matchingServerRoomId}`, (event) => {
            const received = JSON.parse(event.body);
            const roomId = received.roomId;
            const oppoProfile = received.profileDto;
            const recorder = received.recorder;

            redirectMatchedPage(roomId, oppoProfile, recorder);
        });
    }
    
    function replaceString(str){
        const replaced = str.replace(/\//gi, '');
        return replaced;
    }

    async function redirectMatchedPage(roomId, oppoProfile, recorder){
        const replacedStr = await replaceString(roomId);
        await dispatch({type:"UPDATE_OPPOUSER", payload:oppoProfile})
        //매칭 페이지로 리다이렉트
        await navigate(`/loading/match/${replacedStr}/${(recorder?'true':'false')}`,{replace:true});
        //await window.location.reload();
    }

    return (
        <>
            <NavBar/>
            <Frame>
                <SubFrame1/>
                <SubFrame2 userInfo={userInfo.language} studyLng={studyLng}/>
            </Frame>
        </>
    );
}
export default Loading;
