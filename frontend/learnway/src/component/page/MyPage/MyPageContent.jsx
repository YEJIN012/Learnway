import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import FriendList from "./FriendList";
import Profile from "./Profile";
import Friend from "./Friend";
import Study from "./Study";
import StudyScripts from "./StudyScripts";
import ProfileEdit from "./ProfileEdit";
import NameTag from "../../ui/NameTag";

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    justify-content: center;
    align-items: center;
    margin-right: 20%;
    margin-left: 20%;
`;
const Subtitle = styled.div`
    margin-left: 20px;
    font-weight: 300px;
    font-size: 2em;
    display: flex;
    align-items: center;
`;
const Side = styled.div`
    margin-left: 1vw;
    margin-right: 1vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: relative;
`;

function MyPageContent(props) {
    const selectedContent = props.content;

    // FRIENDS Tab - Friend 프로필과 FriendList연결 변수와 함수
    const [selectedFriend, setSelectedFriend] = useState("");
    const handleSelectedFriend = (data) => {
        setSelectedFriend(data);
    };
    const [deletedFriend, setDeletedFriend] = useState(false);
    console.log(deletedFriend)
    const handleDeletedFriend = () => {
        setDeletedFriend(!deletedFriend)
        setSelectedFriend("")
    }

    // STUDY Tab - Calendar과 StudyScripts연결 변수와 함수
    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleSelectedDate = (date) => {
        setSelectedDate(date);
    };

    const { t } = useTranslation();

    const Tab = {
        PROFILE: {
            subtitle: [t('Profile'), t('Edit Profile')],
            child: [<Profile />, <ProfileEdit />],
        },
        FRIENDS: {
            subtitle: [t('Friend'), t('Friends List')],
            child: [
                <Friend selectedFriend={selectedFriend} handleDeletedFriend={handleDeletedFriend}/>,
                <FriendList handleSelectedFriend={handleSelectedFriend} deletedFriend={deletedFriend}/>,
            ],
        },
        STUDY: {
            subtitle: [t('Calendar'), t('Scripts')],
            child: [
                <Study handleSelectedDate={handleSelectedDate} />,
                <StudyScripts selectedDate={selectedDate} />,
            ],
        },
    };

    return (
        <ContentWrapper>
            <Side>
                <Subtitle>

                <NameTag subtitle={Tab[`${selectedContent}`].subtitle[0]} />
                </Subtitle>
                {Tab[`${selectedContent}`].child[0]}
            </Side>
            <Side>
                <Subtitle>

                <NameTag subtitle={Tab[`${selectedContent}`].subtitle[1]} />
                </Subtitle>
                {Tab[`${selectedContent}`].child[1]}
            </Side>
        </ContentWrapper>
    );
}
export default MyPageContent;
