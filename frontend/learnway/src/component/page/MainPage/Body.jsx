import React from "react";
import styled from "styled-components";
import MyLanguage from "./MyLanguage";
import SelectLanguage from "./SelectLanguage";
import langSelectImg from "./langSelectImg.png";
import camIcon from "./camIcon.png";
import Animation from "./MainAnimation";


import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
//호출 시 npm i react-webcam 필수
import Webcam from 'react-webcam';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';

const Frame = styled.div`
    width: 60vmax;
    height: 38vmax;
    border:1px solid black;
    margin: 0 auto;
    display: flex;
    flex-direction: column-reverse;
`;

const Component = styled.div`
    height:24vmax;
    border:1px solid black;
`;

const SelectSection = styled.div`
    display:flex;
    flex-direction:row;
    border:1px solid black;
    height:60%;
`;

const BtnSection = styled.div`
    border:1px solid black;
    height:40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Img = styled.div`
    width:20%;
    background-image: url(${langSelectImg});
    background-size:cover;
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
}

function startMatching(lang1, lang2) {
    alert(lang1.toString() + " " + lang2.toString() + " 매칭 페이지 처리");
}

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

            <Component>
                <SelectSection>
                    <MyLanguage></MyLanguage>
                    <Img></Img>
                    <SelectFrame>
                        <SelectLanguage></SelectLanguage>
                    </SelectFrame>
                </SelectSection>
                <BtnSection>
                    <Button
                        id="6"
                        width="20vw"
                        height="5vw"
                        fontSize="2.5vw"
                        radius="5px"
                        textValue="GO TO CHAT"
                        onClick={() => startMatching(mylang.languageId, oppolang)} />
                    <ChkCamera onClick={handleOpen}></ChkCamera>
                    <Modal
                        open={open}

                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
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
