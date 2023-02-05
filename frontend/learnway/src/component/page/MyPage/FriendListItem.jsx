import React from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";

const Item = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function FriendListItem(props) {
    const { friendsProfile, handleSelectedFriend } = props
    // console.log(friendsProfile);
    
    return friendsProfile.map((friend, index) => (
        <>
        <Item onClick={() => handleSelectedFriend(friend.data.profile)} key={index}>
            <ProfileImg src={friend.data.profile.img_url} width={50} />
            <div>{friend.data.profile.name}</div>
            <div>{friend.data.profile.language.name}</div>
        </Item>
        </>
    ));
}
export default FriendListItem