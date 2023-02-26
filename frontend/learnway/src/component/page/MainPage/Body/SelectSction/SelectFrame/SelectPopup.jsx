import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from 'react-redux';
import SelectLanguage from "./SelectPopup/SelectLanguage";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const SelectLink = styled.div`
    text-decoration:none;
    display: flex;
    justify-content:center;
    align-items: center;
    text-align: center;
    padding: 20px 18px;;
    border-radius: 16px;

    &:hover {
        // background: linear-gradient(to right,  #DAAAA9, #DAAAA9);
        color: #DAAAA9;
        cursor:pointer;
    }
    `;

function Home() {
    const dispatch = useDispatch();
    const oppolang = useSelector(state => state.MainStore);
    const [popup, setPopup] = React.useState(false);

    const languagestyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '55vw',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    
    useEffect(()=>{
        popupClose(); //값 변화 감지되면 종료
    }, [oppolang]);

    useEffect(()=> {
        dispatch({ type: "matchLangUpdate", payload: { languageId: null, languageName: "TO" } });
    }, []);

    function popupOpen() {
        setPopup(true);
    }

    function popupClose() {
        setPopup(false);
    }

    return (
        <>
            <SelectLink onClick={popupOpen}>
                {oppolang.languageName}
            </SelectLink>

            <Modal open={popup} onClose={popupClose}>
                <Box sx={languagestyle} style={{ outline: 'none', borderRadius: '16px' }}>
                    <SelectLanguage />
                </Box>
            </Modal>
        </>
    );
}
export default Home;
