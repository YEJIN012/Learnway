import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import MyLanguage from "./MyLanguage";
import SelectLanguage from "./SelectLanguage";
import camIcon from "./camIcon.png";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//호출 시 npm i react-webcam 필수
import Webcam from 'react-webcam';

import AllButton from '../../ui/AllButton';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';

const Frame = styled.div`
    width: 40vmax;
    // height: 20vmax;
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
    height: 5vh;
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
    // height:24vmax;
    
`;

const SelectSection = styled.div`
    display:flex;
    flex-direction:row;
    position: relative;
    padding: 1vw 1vw;

	&::after {
		content: '';
		display: table;
		clear: both;
	}
`;

const SelectFrame = styled.div`
	float:right;
    width:50%;
    display: flex;
    justify-content:center;
    align-items: center;
`;

const SelectLink = styled.div`
    text-decoration:none;
    // font-family: 'Poppins';
    font-style: normal;
    font-weight: 300;
    font-size: 2vw;
    display: flex;
    justify-content:center;
    align-items: center;
    text-align: center;
    padding: 15px 40px;

    &:hover {
        background-color: rgb(0, 0, 0, 0.5);
        color: rgb(255, 255, 255, 100);
    }
`;

const BtnSection = styled.div`
    border-top:1px solid black;
    height:40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2vw 1vw;
`;

const ChkCamera = styled.div`
    width:3vw;
    height:3vw;
    background-image:url(${camIcon});
    background-size:cover;
`;

const camStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vmin',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 0,
};

const webcamStyle = {
    height: "20vw"
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

const Airplane = styled.svg`
	position: absolute;
	width: 30px;
	height: 25px;
	top: 57%;
	left: 30%;
	opacity: 0;
	transform: translate(-50%, -50%);
	animation: ${move} 4s infinite;
`;

const languagestyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '55vw',
    // height: '28vw',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


function startMatching(lang1, lang2) {
    alert(lang1.toString() + " " + lang2.toString() + " 매칭 페이지 처리");
};

function Body() {
    //상태 저장소에서 나의 언어 가져오기
    const mylang = useSelector(state => state.UserStore);
    //상태 저장소에서 상대방 언어 가져오기
    const oppolang = useSelector(state => state.MainStore);
    const dispatch = useDispatch();

    //console.log(mylang, oppolang)

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const [popup, setPopup] = React.useState(false);
    const popupOpen = () => setPopup(true);
    const popupClose = () => setPopup(false);

    

    useEffect(() => {
        dispatch({ type: "matchLangUpdate", payload: "TO" });
    }, []);

    useEffect(() => {
        popupClose(); //값 변화 감지되면 종료
    },[oppolang])

    return (
        <Frame>
			<Component>
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
                    {/* <SelectLanguage></SelectLanguage> */}
                </SelectFrame>

                <SelectFrame>
                        <SelectLink onClick={popupOpen}>{oppolang.toString()}</SelectLink>
                    <Modal
                        open={popup}
                        onClose={popupClose}
                    >
                        <Box sx={languagestyle} style={{outline:'none'}}>
                            <SelectLanguage></SelectLanguage>
                        </Box>
                    </Modal>
                </SelectFrame>

                <Airplane>
                    <use xlinkHref="#airplane"></use>
                </Airplane>
                <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" >
                    <symbol  id="airplane" viewBox="243.5 245.183 25 21.633">
                        <g>
                            <path fill="#92B4EC" d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                                                    c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                                                    c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                                                    "/>
                        </g>
                    </symbol>
                </svg>
            </SelectSection>

			<BtnSection>
                    {/* <Button
                        id="6"
                        width="20vw"
                        height="5vw"
                        fontSize="2.5vw"
                        radius="5px"
                        textValue="GO TO CHAT"
                        onClick={() => startMatching(mylang.languageId, oppolang)} /> */}
                    <AllButton
                        textValue="Maching Start"
                        width="80%"
                        height="5vw"
                        fontSize="1.5vw"
                        textWeight="900"
                        radius="15px"
                        margin="0px"
                        onClick={() => startMatching(mylang.languageId, oppolang)} />
                    <ChkCamera onClick={handleOpen}></ChkCamera>
                    <Modal
                        open={open}

                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={camStyle}>
                            <Typography id="modal-modal-title" variant="h5" component="h2">
                                대화 입장 전, 웹캠 상태 확인 및 점검을 할 수 있습니다.
                            </Typography>
                            <Typography id="modal-modal-description"
                                sx={{
                                    mt: 2,
                                    'display': 'flex',
                                    'flex-direction': 'column',
                                    'align-items': 'center'
                                }}>
                                <Webcam style={webcamStyle} />
                                <Button id="4" width="5vw" height="2vw" onClick={handleClose}>확인 완료</Button>
                            </Typography>
                        </Box>

                    </Modal>
                </BtnSection>
			</Component>
        </Frame>
            
    );
};
export default Body;
