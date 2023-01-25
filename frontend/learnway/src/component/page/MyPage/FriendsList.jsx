import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    margin-left: 12px;
    margin-right: 12px;
    width: 60%;
`;

const Subtitle = styled.div`
    left: 6.43%;
    right: 34.05%;
    height: 60px;
    bottom: 91.04%;
    font-weight: 300px;
    font-size: 30px;
    line-height: 32px;
    display: flex;
    align-items: center;
`;
const Card = styled.div`
    margin-top: 10px;
    height: 600px;
    left: 0px;
    top: 70px;
    border-radius: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;


function FriendsList() {
    return (
        <Wrapper>
            <Subtitle>MyFriendsList</Subtitle>
            <Card>
                친구목록
            </Card>
        </Wrapper>
    );
}

export default FriendsList