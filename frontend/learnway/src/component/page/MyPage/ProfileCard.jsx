import React from "react";
import styled from "styled-components";
import friends from "../../../friends.json";
import ProfileImg from "../../ui/ProfileImg";

const Wrapper = styled.div`
    margin-left: 12px;
    margin-right: 12px;
    width: 40%;
`
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
const CardTop = styled.div`
    display: flex;
    justify-content: center;
    left: 0%;
    right: 0%;
    top: 70px;
    bottom: 374px;
    height: 226px;
    background: linear-gradient(
        286.15deg,
        rgba(0, 90, 167, 0.5) 0%,
        rgba(254, 253, 228, 0.5) 100%
    );
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    display: flex;
    justify-content: center;
`;

// function ProfileCardTop(props) {
//         return
// }


// 프로필 편집시, useEffect 필요?
function MyProfile(props) {
    const {name, email, birth} = props.data
    return (
        <div>
            {name},
            {email},
            {birth}
        </div>
    )
}

function FriendProfile(props) {
    const {name, language, birth, interest, bio} = props.data
    return (
        <div>
            {name},
            {language},
            {birth},
            {interest},
            {bio}
        </div>
    )
}

function ProfileCard(props) {
    // profile -> 선택된 user_id
    // Profile탭 -> 0 Friends탭->1
    const { profile, user } = props
    
    const data = profile ? friends.find((item) => {
        return item.user_id === profile
    }) : friends[0]

    return (
        <Wrapper>
            <Subtitle>Profile</Subtitle>
            <Card>
                <CardTop>
                    <ProfileImg  src={data.img_url}/>
                </CardTop>
                <CardBottom>
                    { (user===0) ? <MyProfile data={data}/> : <FriendProfile data={data}/>}
                </CardBottom>
            </Card>
        </Wrapper>
    );
}

export default ProfileCard;
