import React from "react";
import NavBar from "../../ui/NavBar";
import MyPageTab from "./MyPageTab";
import ChatBtn from "../../chat/ChatBtn";


function Mypage() {
    return (
        <>
            <ChatBtn></ChatBtn>
            <NavBar />
            <MyPageTab/>
        </>
    );
}
export default Mypage;
