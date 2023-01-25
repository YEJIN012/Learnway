import React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import FriendsList from "./FriendsList";
import StudyCalendar from "./StudyCalendar";
import StudyScripts from "./StudyScripts";

const Wrapper = styled.div`
    height: 700px;
    left: 11.81%;
    right: 11.81%;
    top: 257px;
    display: flex;
    flex-direction: row;
`;

function Content(props) {
    if (props.content === "PROFILE") {
        return (
            <Wrapper>
                <ProfileCard />
                <EditProfile />
            </Wrapper>
        );
    } else if (props.content === "FRIENDS") {
        return (
            <Wrapper>
                <ProfileCard />
                <FriendsList />
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <StudyCalendar />
                <StudyScripts />
            </Wrapper>
        )
    }
}
export default Content;
