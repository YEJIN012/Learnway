import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useSelector } from "react-redux";
import "./LoadingAni.css";

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
    font-size: 2vw;
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
    background-color: rgba(0, 52, 96, 1);
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
    height: 10vh;
    width: 100%;
    background-color: #9d9d9da0;
    padding: 1.5vh 2vw;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

function Loading(params) {
    const useInfo = useSelector((state) => state.AuthReducer);
    const studyLng = useSelector((state) => state.MainStore);
    // console.log(useInfo)
    // const [lngConv, setLngConv] = useState([])
    const lngConv = [
        "Call your parents at least once a month.",
        "I jog at least three times a week to keep fit.",
        // "Is there anything I can do to make it up to you?",
        // "I'll make it up to you for forgetting your birthday.",
    ];
    // const [studyLngConv, setStudyLngConv] = useState([])
    const studyLngConv = [
        "적어도 한 달에 한 번은 부모님께 전화를 드려.",
        "건강을 유지하기 위해 적어도 일주일에 세 번은 조깅을 한다.",
        // "당신과 화해하기 위해 제가 할 수 있는 일이 없을까요? ",
        // "생일을 잊어버린 것에 대해 성의를 보일게.",
    ];

    //오늘의 회화 목록을 가져오는 함수
    // function getTodayConv() {
    //     console.log(useInfo.language.name)
    //     console.log(studyLng)
    //     axios
    //         .get("api/conv", {
    //             params: { lng: useInfo.language.name, study_lng: studyLng },
    //         })
    //         // handle success
    //         .then(function (res) {
    //             console.log()
    //             setLngConv(res.data.conversation.lng);
    //             setStudyLngConv(res.data.conversation.studyLng);
    //             console.log(res);
    //             console.log(lngConv);
    //             console.log(studyLngConv);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }
    // useEffect(() => {getTodayConv()}, [])

    return (
        <>
            <NavBar></NavBar>
            <Frame>
                <SubFrame1>
                    <div className="sign">
                    <Text>Matching...</Text>
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
                        <hr style={{width:"100%", height:2 , backgroundColor:"white"}}/>
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
