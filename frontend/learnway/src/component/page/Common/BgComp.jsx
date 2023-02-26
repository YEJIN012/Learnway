import React from "react";
import NavBar from "../../ui/NavBar";
import ChatBtn from '../../chat/ChatBtn';
import BGAll from "../Front/introbackground/BGAll";

function BgComp(params) {
    return (
        <>
            <ChatBtn/>
            <NavBar/>
            <BGAll id = {params.id}/>
        </>
    );
}
export default BgComp;
