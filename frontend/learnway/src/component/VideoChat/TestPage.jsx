import React, { useState } from "react";
import styled from "styled-components";
import Translate from './Translate/Translate';
import Report from './Report/Report';
import Quit from './Quit/Quit'
import Friend from './Friend/Friend'
import Youtube from './Youtube/Youtube';
import FloatingBtn from "./CommonComponent/FloatingBtn";
//화상 채팅방용 테스트 페이지

const menuList = {
    0: <Report></Report>,
    1: <Quit></Quit>,
    2: <Friend></Friend>,
    3: <Translate></Translate>,
    4: <Youtube></Youtube>
  };

  const Frame = styled.div`
    width:40vw;
    height:90vh
  `;
function TestPage(){
    const [menu, setMenu] = useState("")

    const handleSetMenu = (props) => {
        if (menu === props) {
            setMenu("")
        } else {
            setMenu(props)
        }
    }
    return(
        <>
            <Frame>
                {menuList[menu]}
            </Frame>
            <FloatingBtn handleSetMenu={handleSetMenu}></FloatingBtn>
        </>
        //화상 카메라가 들어갈 영역
        
        
    );
};
export default TestPage;
