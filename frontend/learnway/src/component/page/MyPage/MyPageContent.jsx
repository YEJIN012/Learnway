import React from "react";
import styled from "styled-components";
import ProfileAndFriends from "./ProfileAndFriends";
import Study from "./Study";


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    margin-top: 100px;
    margin-right: 15%;
    margin-left: 15%;
    border: 1px solid;
`;

function MyPageContent(props) {
    if (props.content === "PROFILE") {
        return (
            <Wrapper>
                <ProfileAndFriends tab={0} />
            </Wrapper>
        );
    } else if (props.content === "FRIENDS") {
        return (
            <Wrapper>
                <ProfileAndFriends tab={1} />
            </Wrapper>
        );
    } else {
        return (
            <Wrapper>
                <Study />
            </Wrapper>
        );
    }
}
export default MyPageContent;
