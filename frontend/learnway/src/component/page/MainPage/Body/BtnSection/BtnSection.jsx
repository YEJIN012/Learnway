import React from "react";
import styled from "styled-components";
import CamChk from './CamChk'
import AllButton from '../../../../ui/AllButton';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const Frame = styled.div`
    border-top:1px solid rgba(83, 83, 83, .8);
    height:40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 2vw 1vw;
`;

function BtnSection() {
    const oppolang = useSelector(state => state.MainStore);
    const navigate = useNavigate();
    const { t } = useTranslation();

    function startMatching() {
        if (oppolang.languageId) {
            navigate(`/loading`, { replace: true, });
        } else {
            alert("❗ Choose the language you want to learn ❗");
        }
    };

    return (
        <Frame>
            <AllButton textValue={t('MachingStart')} width="76%" height="3.8vw" fontSize="1.5vw" textWeight="550" radius="20px" margin="0px" onClick={() => startMatching()} />
            <CamChk/>
        </Frame>
    );
}
export default BtnSection;
