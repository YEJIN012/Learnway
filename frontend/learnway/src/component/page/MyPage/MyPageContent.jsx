import React from "react";
import styled from "styled-components";
import ProfileAndFriends from "./ProfileAndFriends";
import Study from "./Study";

const ContentWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 700px;
    margin-right: 15%;
    margin-left: 15%;
    border: 1px solid;
`;

function MyPageContent(props) {
    if (props.content === "PROFILE") {
        return (
            <ContentWrapper>
                <ProfileAndFriends tab={0} />
            </ContentWrapper>
        );
    } else if (props.content === "FRIENDS") {
        return (
            <ContentWrapper>
                <ProfileAndFriends tab={1} />
            </ContentWrapper>
        );
    } else {
        return (
            <ContentWrapper>
                <Study />
            </ContentWrapper>
        );
    }
}
export default MyPageContent;
