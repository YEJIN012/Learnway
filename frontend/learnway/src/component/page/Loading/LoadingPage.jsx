import axios from "axios";
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import NavBar from "../../ui/NavBar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useDispatch, useSelector } from "react-redux";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import "./LoadingAni.css";
import { useNavigate } from "react-router-dom";

const Frame = styled.div`
  padding-top: 10vh;
  display: flex;
  flex-direction: row;
  /* border: solid 1px black; */
`;
const SubFrame1 = styled.div`
  margin-left: 3vw;
  width: 40vw;
  height: 70vh;
  /* border: solid 1px black; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.div`
  margin-bottom: 7vw;
  font-size: 3vw;
  font-weight: 700;
  display: flex;
  justify-content: center;
`;

const SubFrame2 = styled.div`
  margin-right: 5vw;
  width: 60vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: solid 1px black; */
`;

const Box = styled.div`
  width: 45vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: solid 1px black; */
  background-color: #00549e;
  color: white;
  padding: 3vw;
`;

const TitleFrame = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 600;
  font-size: 2vw;
  margin-bottom: 0.5vw;
`;

const BodyFrame = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const ConvFrame = styled.div`
  box-sizing: border-box;
  width: 100%;
  background-color: #9d9d9da0;
  padding: 1.5vh 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Stn1 = styled.div`
  /* padding: 1%; */
  width: 100%;
  font-weight: 500;
  font-size: 1.5vw;
`;
const Stn2 = styled.div`
  /* padding: 1%; */
  width: 100%;
  font-size: 1vw;
  color: #acacacbd;
`;

const animeTextUp = keyframes`
  0% { top: 0; } 
  12.5% { top: -1rem; }
  20% { top: 0 } 
  40% { top: 0 } 
  60% { top: 0 } 
  80% { top: 0 } 
  100% { top: 0 }
`;

const TestObj = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TestSpan = styled.span`
  position: relative;
  animation: ${animeTextUp} 2s infinite;
  /* font-family: "nanumSquareNeo"; */

  &:nth-of-type(1) {
    animation-delay: 0.1s;
  }

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }

  &:nth-of-type(4) {
    animation-delay: 0.4s;
  }

  &:nth-of-type(5) {
    animation-delay: 0.5s;
  }

  &:nth-of-type(6) {
    animation-delay: 0.6s;
  }

  &:nth-of-type(7) {
    animation-delay: 0.7s;
  }

  &:nth-of-type(8) {
    animation-delay: 0.8s;
  }
`;


const socket = new SockJS('/api/ws-stomp');
const ws = Stomp.over(socket);

function Loading() {
    const userInfo = useSelector((state) => state.AuthReducer);
    const studyLng = useSelector((state) => state.MainStore);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // console.log(useInfo)
    const [lngConv, setLngConv] = useState([]);
    // const lngConv = [
    //     "Call your parents at least once a month.",
    //     "I jog at least three times a week to keep fit.",
    //     // "Is there anything I can do to make it up to you?",
    //     // "I'll make it up to you for forgetting your birthday.",
    // ];
    const [studyLngConv, setStudyLngConv] = useState([]);
    // const studyLngConv = [
    //     "적어도 한 달에 한 번은 부모님께 전화를 드려.",
    //     "건강을 유지하기 위해 적어도 일주일에 세 번은 조깅을 한다.",
    //     // "당신과 화해하기 위해 제가 할 수 있는 일이 없을까요? ",
    //     // "생일을 잊어버린 것에 대해 성의를 보일게.",
    // ];
    //userInfo.language.languageId, studyLng.languageId
    const matchingServerRoomId = `${userInfo.userEmail}-${studyLng.languageId}`;
    console.log(matchingServerRoomId)

    // 오늘의 회화 목록을 가져오는 함수
    function getTodayConv() {
        console.log(userInfo.language.name);
        console.log(studyLng);
        axios
            .get("api/conv", {
                params: { lng: userInfo.language.name, study_lng: studyLng.languageName },
            })
            // handle success
            .then(function (res) {
                console.log();
                setLngConv(res.data.conversation.lng.slice(0, 2));
                setStudyLngConv(res.data.conversation.studyLng.slice(0, 2));
                console.log(res);
                console.log(lngConv);
                console.log(studyLngConv);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    //window.location.reload();
    useEffect(() => {
        getTodayConv();
        ws.connect({}, (frame) => {
            console.log("connected to Matching server:", frame);
            subscribe();
        });

        return () => {
            ws.disconnect(() => {
                console.log("Disconnected from Matching Server");

            });
        };
    }, []);

    function subscribe(){
        ws.subscribe(`/sub/chat/room/${matchingServerRoomId}`, (event) => {
            const received = JSON.parse(event.body);
            console.log(received)
            const roomId = received.roomId;
            const oppoProfile = received.profileDto;
            
            redirectMatchedPage(roomId, oppoProfile);
            //state에 저장
        });
    }

    async function redirectMatchedPage(roomId, oppoProfile){
        //redux에 상대방 정보 저장
        console.log(oppoProfile)
        const replacedStr = await replaceString(roomId);
        await dispatch({type:"UPDATE_OPPOUSER", payload:oppoProfile})
        //매칭 페이지로 리다이렉트
        await navigate(`/loading/match/${replacedStr}`,{replace:true});
        //await window.location.reload();
    }

    function replaceString(str){
        const replaced = str.replace(/\//gi, '');
        return replaced;
    }
    return (
        <>
            <NavBar></NavBar>
            <Frame>
                <SubFrame1>
                    <div className="sign">
                        <Text>
                            <TestObj>
                                <TestSpan>M</TestSpan>
                                <TestSpan>A</TestSpan>
                                <TestSpan>T</TestSpan>
                                <TestSpan>C</TestSpan>
                                <TestSpan>H</TestSpan>
                                <TestSpan>I</TestSpan>
                                <TestSpan>N</TestSpan>
                                <TestSpan>G</TestSpan>
                            </TestObj>
                        </Text>
                        <div className="moving">
                            <div className="suitcase">
                                <div className="handle"></div>
                            </div>
                            <div className="suitcase">
                                <div className="handle"></div>
                            </div>
                        </div>
                        <div className="rollBox">
                            <div className="rollthingy"></div>
                            <div className="rollthingy"></div>
                            <div className="rollthingy"></div>
                            <div className="rollthingy"></div>
                            <div className="rollthingy"></div>
                        </div>
                    </div>
                </SubFrame1>
                <SubFrame2>
                    <Box>
                        <TitleFrame>
                            <FlightTakeoffIcon
                                sx={{
                                    width: "5vw",
                                    height: "4vw",
                                    border: "solid 2.5px",
                                    borderRadius: "1vw",
                                    margin: "0px 1vw 0px 0px",
                                }}
                            ></FlightTakeoffIcon>
                            Today's Conversation
                        </TitleFrame>
                        <hr
                            style={{
                                width: "100%",
                                height: 2,
                                backgroundColor: "white",
                            }}
                        />
                        <BodyFrame>
                            {lngConv.map((lng, i) => (
                                <ConvFrame key={i}>
                                    <Stn1>{lng}</Stn1>
                                    <Stn2>{studyLngConv[i]}</Stn2>
                                </ConvFrame>
                            ))}
                        </BodyFrame>
                    </Box>
                </SubFrame2>
            </Frame>
        </>
    );
}
export default Loading;
