import React from "react";
import NavBar from "../../ui/NavBar";
import MyPageTab from "./MyPageTab";
import BGAll from "../Front/introbackground/BGAll";
import ChatBtn from "../../chat/ChatBtn";


function Mypage() {
    return (
        <>
            <ChatBtn></ChatBtn>
            <NavBar />
            <MyPageTab/>
            {/* 배경 추가 스크롤 생김...... 삭제해도됨*/}
            <BGAll id={1}></BGAll> 
        </>
    );
}
export default Mypage;
