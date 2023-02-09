import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useSelector } from "react-redux";
import "./LoadingAni.css";
import { height } from "@mui/system";

const Frame = styled.div`
    display: flex;
    flex-direction: row;
    border: solid 1px black;
`;
const SubFrame1 = styled.div`
    width: 40vw;
    height: 44vw;
    border: solid 1px black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SubFrame2 = styled.div`
    width: 60vw;
    height: 44vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: solid 1px black;
`;

const Box = styled.div`
    width: 40vw;
    height: 30vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border: solid 1px black;
`;

const TitleFrame = styled.div`
    width: 40vw;
    height: 5vw;
    border: solid 1px black;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 600;
    font-size: 2vw;
`;

const BodyFrame = styled.div`
    width: 40vw;
    /* height: 20vw; */
    height: 25vw;
    border: solid 1px black;
`;

const Text = styled.div`
    padding-top: 2.5vw;
    font-size: 2vw;
    font-weight: 700;
`;

const ConvFrame = styled.div`
    width: 40vw;
    height: 5vw;
    font-size: 2vw;
`;
const Stn = styled.div`
    width: 40vw;
    height: 2.5vw;
    font-size: 1vw;
`;

function Loading(params) {
    const useInfo = useSelector((state) => state.AuthReducer);
    const studyLng = useSelector((state) => state.MainStore);
    console.log(useInfo)
    const [lngConv, setLngConv] = useState([])
    const [studyLngConv, setStudyLngConv] = useState([])

    //오늘의 회화 목록을 가져오는 함수
    function getTodayConv() {
        console.log(useInfo.language.name)
        console.log(studyLng)
        axios
            .get("api/conv", {
                params: { lng: useInfo.language.name, study_lng: studyLng },
            })
            // handle success
            .then(function (res) {
                console.log()
                setLngConv(res.data.conversation.lng);
                setStudyLngConv(res.data.conversation.studyLng);
                console.log(res);
                console.log(lngConv);
                console.log(studyLngConv);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    useEffect(() => {getTodayConv()}, [])

    return (
        <div>
            <NavBar></NavBar>
            <Frame>
                <SubFrame1>
                    <Text>Matching...</Text>
                    <div className="sign">
                        <div className="moving">
                            <div className="suitcase">
                                <div className="handle"></div>
                            </div>
                            <div className="suitcase">
                                <div className="handle"></div>
                            </div>
                        </div>
                        <div className="rollthingy"></div>
                        <div className="rollthingy"></div>
                        <div className="rollthingy"></div>
                        <div className="rollthingy"></div>
                        <div className="rollthingy"></div>
                    </div>
                </SubFrame1>
                <SubFrame2>
                    <Box>
                        <TitleFrame>
                            <FlightTakeoffIcon
                                sx={{
                                    width: "6vw",
                                    height: "5vw",
                                }}
                            ></FlightTakeoffIcon>
                            Today's Conversation
                        </TitleFrame>
                        <BodyFrame>
                            {lngConv.map((lng, i) => (
                                <ConvFrame key={i}>
                                    <Stn>{lng}</Stn>
                                    <Stn>{studyLngConv[i]}</Stn>
                                </ConvFrame>
                            ))}
                        </BodyFrame>
                    </Box>
                </SubFrame2>
            </Frame>
        </div>
    );
}
export default Loading;
