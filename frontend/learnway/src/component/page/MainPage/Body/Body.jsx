import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import MyLanguage from "./SelectSction/SelectFrame/MyLanguage";
import SelectFrame from "./SelectSction/SelectFrame";
import SelectPopup from "./SelectSction/SelectFrame/SelectPopup";
import { chatRoomLst } from '../../../chat/actions/profileAction';
import Header from './Header/Header';
import BtnSection from "./BtnSection/BtnSection"
import SelectAni from './SelectSction/SelectAni';
import { useDispatch, useSelector } from 'react-redux';

const Frame = styled.div`
    width: 40vmax;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    background: #fff;
    border-radius: 16px;
    box-shadow: 0 5px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    text-transform: uppercase;
`;

const SelectSection = styled.div`
    display:flex;
    flex-direction:row;
    position: relative;
    padding: 1vw 1vw;

    font-family: "Raleway", sans-serif;
    font-weight: bolder;
    font-size: 2vw;
    
    // font-style: normal;
    // font-weight: 300;
    // font-size: 2vw;

	&::after {
		content: '';
		display: table;
		clear: both;
	}
`;

function Body() {
    const dispatch = useDispatch();
    const myInfo = useSelector(state => state.AuthReducer);
    const { t } = useTranslation();
    
    // 로그인시 chatroomlist api 받아서 redux저장
    useEffect(()=>{
        const roomList = chatRoomLst(myInfo.userEmail);
        roomList.payload.then((res)=>{
            dispatch({ type: roomList.type, payload: res })
        });
    },[]);

    return (
        <Frame>
            <Header />

            <SelectSection>
                <SelectFrame str={t('DEPARTURES')} body={<MyLanguage />} />
                <SelectFrame str={t("ARRIVALS")} body={<SelectPopup />} />
                <SelectAni />
            </SelectSection>

            <BtnSection/>
        </Frame>
    );
};
export default Body;
