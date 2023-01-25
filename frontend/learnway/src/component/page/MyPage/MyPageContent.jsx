import React from "react";
import styled from "styled-components";
import RightCard from "./RightCard";
import EditProfile from "./EditProfile";
import FriendsList from "./FriendsList";
import StudyCalendar from "./StudyCalendar";

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
                <RightCard tab={1}/>
            </Wrapper>
        );
    } else if (props.content === "FRIENDS") {
        return (
            <Wrapper>
                <RightCard tab={2}/>
            </Wrapper>
        )
    } else {
        return (
            <Wrapper>
                <StudyCalendar />
            </Wrapper>
        )
    }
}
export default Content;
