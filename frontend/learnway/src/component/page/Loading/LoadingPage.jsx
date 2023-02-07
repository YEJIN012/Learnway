import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import "./LoadingAni.css";

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
    height: 7vw;
    border: solid 1px black;
`;

const BodyFrame = styled.div`
    width: 40vw;
    height: 18vw;
    border: solid 1px black;
`;
const Scale = styled.div`
    transform: scale(1);
`

function Loading(params) {
    //오늘의 회화 목록을 가져오는 함수
    return (
        <div>
            <NavBar></NavBar>
            <Frame>
                <SubFrame1>
                    {/* <Scale> */}

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
                    {/* </Scale> */}
                </SubFrame1>
                <SubFrame2>
                    <Box>
                        <TitleFrame>
                            <FlightTakeoffIcon></FlightTakeoffIcon>
                        </TitleFrame>
                        <BodyFrame></BodyFrame>
                    </Box>
                </SubFrame2>
            </Frame>
        </div>
    );
}
export default Loading;
