import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import { useTranslation } from 'react-i18next';
import {request} from "../../../page/Front/utils/axios"

const Frame = styled.div`
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
  background: linear-gradient(to bottom, #36475f, #2c394f);
  border-radius: 35px;
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

const Hr = styled.hr`
width: "100%",
height: 2,
backgroundColor: "white",
`;

function SubFrame2(...props) {
    const [lngConv, setLngConv] = useState([]);
    const [studyLngConv, setStudyLngConv] = useState([]);
    const { t } = useTranslation();  
    
    const lng = props[0].userInfo.name
    const studylng = props[0].studyLng.languageName
    
    useEffect(()=>{
        getTodayConv();
    },[]);

    // 오늘의 회화 목록을 가져오는 함수
    function getTodayConv() {
        request("get",`/api/conv?lng=${lng}&study_lng=${studylng}`).then((res)=>{
          setLngConv(res.conversation.lng.slice(0, 2));
          setStudyLngConv(res.conversation.studyLng.slice(0, 2));
        })
    }

    return (
        <Frame>
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
                    />
                    {t('Todays Coversation')}
                </TitleFrame>
                <Hr />
                <BodyFrame>
                    {lngConv.map((lng, i) => (
                        <ConvFrame key={i}>
                            <Stn1>{studyLngConv[i]}</Stn1>
                            <Stn2>{lng}</Stn2>
                        </ConvFrame>
                    ))}
                </BodyFrame>
            </Box>
        </Frame>

    );
} export default SubFrame2;
