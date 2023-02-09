import React from "react";
import styled, { keyframes } from "styled-components";
import MyLanguage from "./MyLanguage";
import SelectLanguage from "./SelectLanguage";
import camIcon from "./camIcon.png";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//호출 시 npm i react-webcam 필수
import Webcam from 'react-webcam';
import Button from '../../ui/Button';

import styles from './css/Body2.module.css';

import { useSelector } from 'react-redux';

const Frame = styled.div`
    width: 40vmax;
    height: 22vmax;
    border:1px solid black;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;

    background: #fff;
    border-radius: 12px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-transform: uppercase;
`;

const Header = styled.div`
    background: linear-gradient(to bottom, #36475f, #2c394f);
    padding: 12px 20px;
    height: 53px;
`;

const Img = styled.div`
    width:10%;
`;

const Flight = styled.div`
    float: right;
    color: #fff;
    text-align: right;
`;

const Small = styled.div`
    font-size: 8px;
    margin-bottom: 2px;
    opacity: 0.8;
`;

const Component = styled.div`
    height:24vmax;
    border:1px solid black;
`;

const SelectSection = styled.div`
    display:flex;
    flex-direction:row;
    border:1px solid black;
    position: relative;
    float: right;
`;

const BtnSection = styled.div`
    border:1px solid black;
    height:40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SelectFrame = styled.div`
    width:40%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const ChkCamera = styled.div`
    width:3vw;
    height:3vw;
    background-image:url(${camIcon});
    background-size:cover;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vmin',
    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
    outline: 0,
};

const webcamStyle = {
    height: "40vw"
};

const move = keyframes`
    40% {
        left: 50%;
        opacity: 1;
     }
    100% {
        left: 70%;
        opacity: 0;
    }
`;

const airplaneStyle = {
    position: 'absolute',
    width: "30px",
    height: "25px",
    top: "57%",
    left: "30%",
    // opacity: "0",
    transform: "translate(-50%, -50%)",
    // animation: `${move} 4s infinite`,
};



function startMatching(lang1, lang2) {
    alert(lang1.toString() + " " + lang2.toString() + " 매칭 페이지 처리");
};

function Body() {
    //상태 저장소에서 나의 언어 가져오기
    const mylang = useSelector(state => state.UserStore);
    //상태 저장소에서 상대방 언어 가져오기
    const oppolang = useSelector(state => state.MainStore);

    //console.log(mylang, oppolang)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <Frame>
            <Header>
                {/* <Img>
                    <img src="/logo.png" alt="" />
                </Img> */}
                <Flight>
                    <Small>flight</Small>
                    <strong>AZ 356</strong>
                </Flight>
            </Header>

            <SelectSection>
                <MyLanguage>
                </MyLanguage>
                
                <SelectFrame>
                    <SelectLanguage></SelectLanguage>
                </SelectFrame>

                <svg className="airplane" style={airplaneStyle}>
                    <use xlinkHref="#airplane"></use>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" >
                    <symbol  id="airplane" viewBox="243.5 245.183 25 21.633">
                        <g>
                            <path fill="#30af2f" d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                                    c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                                    c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                                    "/>
                        </g>
                    </symbol>
                </svg>
            </SelectSection>
            <section class="infos">
                <div class="places">
                <div class="box">
                    <small>Terminal</small>
                    <strong><em>W</em></strong>
                </div>
                <div class="box">
                    <small>Gate</small>
                    <strong><em>C3</em></strong>
                </div>
                </div>
                <div class="times">
                <div class="box">
                    <small>Boarding</small>
                    <strong>19:50</strong>
                </div>
                <div class="box">
                    <small>Departure</small>
                    <strong>20:20</strong>
                </div>
                </div>
            </section>
        </Frame>
            
    );
};
export default Body;
