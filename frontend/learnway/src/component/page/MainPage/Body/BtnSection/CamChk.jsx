import React, { useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Webcam from 'react-webcam';
import ChkCamera from '@mui/icons-material/CameraAlt';
import AllButton from '../../../../ui/AllButton';
import { useTranslation } from 'react-i18next';

const camStyle = {
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
    height: "27vw"
};

function CamChk() {
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    function handleOpen() {
        setOpen(true);
    };

    function handleClose() {
        setOpen(false);
    };

    return (
        <>
            <ChkCamera onClick={handleOpen} sx={{ color: "#91a8d0", width: "4vw", height: "3.5vw", padding: "0 1vw", cursor: "pointer" }} />
            <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={camStyle}>
                    <Typography id="modal-modal-title" sx={{ 'font-family': '"Raleway", sans-serif', 'font-size': '1.5vw', 'text-align': 'center', 'border-radius': '15px', 'font-weight': '600' }}>
                        {t('Before entering the conversation, you can check and check the status of the webcam.')}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, 'display': 'flex', 'flex-direction': 'column', 'align-items': 'center' }}>
                        <Webcam style={webcamStyle} />
                        <AllButton textValue={t('Verification Complete')} width="50%" fontSize="1.5vw" textWeight="900" radius="15px" margin="1.5vw" onClick={handleClose} />
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}
export default CamChk;
