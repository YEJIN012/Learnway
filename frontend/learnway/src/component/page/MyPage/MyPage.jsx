import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import MyPageTab from "./MyPageTab";

const StyledBody = styled.div`
    margin-top: 65px;
    margin-left: 110px;
    margin-right: 110px;
`;

function Mypage() {
    
    return (
        <div>
            <NavBar />
            <StyledBody>
                <MyPageTab/>
            </StyledBody>
        </div>
    );
}
export default Mypage;
