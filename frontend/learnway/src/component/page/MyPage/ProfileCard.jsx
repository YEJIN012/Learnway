import React from "react";
import styled from "styled-components";
import friends from "../../../friends.json";
import ProfileImg from "../../ui/ProfileImg";
import "../../ui/mypage.css";

const CardTop = styled.div`
    box-sizing: border-box;
    padding: 15%;
    display: flex;
    justify-content: center;
    height: 40%;
    background: linear-gradient(
        286.15deg,
        rgba(0, 90, 167, 0.5) 0%,
        rgba(254, 253, 228, 0.5) 100%
    );
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    box-sizing: border-box;
    padding: 15%;
    display: flex;
    justify-content: center;
`;

// 프로필 편집시, useEffect 필요?
function MyProfile() {
    // 로그인 유저 data
    const { img_url, name, email, birth } = friends[0];
    return (
        <div className="white-card">
            <CardTop>
                <ProfileImg src={img_url} />
                프로필이미지편집버튼
            </CardTop>
            <CardBottom>
                {name},{email},{birth}
            </CardBottom>
        </div>
    );
}

function FriendProfile(props) {
    const { img_url, name, language, birth, interest, bio } = props.data;
    return (
        <div className="white-card">
            <CardTop>
                <ProfileImg src={img_url} />
                친구삭제버튼
            </CardTop>
            <CardBottom>
                {name},{language},{birth},{interest},{bio}
            </CardBottom>
        </div>
    );
}

function ProfileCard(props) {
    // profile -> 선택된 user_id
    // Profile탭 -> 0 Friends탭->1
    const { profile, user } = props;

    const data = profile
        ? friends.find((item) => {
              return item.user_id === profile;
          })
        : friends[0];

    return (
        <div>{user === 0 ? <MyProfile /> : <FriendProfile data={data} />}</div>
    );
}

export default ProfileCard;
