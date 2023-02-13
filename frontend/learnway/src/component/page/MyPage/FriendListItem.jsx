import React from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";

const Item = styled.div`
    width: 7vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: small;
`;

function FriendListItem(props) {
    const { friendsProfile, handleSelectedFriend } = props;
    return friendsProfile.map((friend, index) => (
        <Item onClick={() => handleSelectedFriend(friend)} key={index}>
            <ProfileImg src={friend.imgUrl} width={"50px"} />
            <div>{friend.name}</div>
            <div>{friend.language.name}</div>
        </Item>
    ));
}
export default FriendListItem;