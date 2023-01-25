import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import ProfileCard from "./ProfileCard";
import friends from "../../../friends.json";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;    
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
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    height: 600px;
    left: 0px;
    border-radius: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
const Item = styled.div`
    width: 90px;
    height: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
    cursor: pointer;
`;

function FriendListItem(props) {
    const { friend, onClick } = props;

    return (
        <Item onClick={onClick}>
            <ProfileImg src={friend.img_url} />
            <div>{friend.name}</div>
            <div>{friend.language}</div>
        </Item>
    );
}

function RightCard(props) {
    const tab = props
    // friends json 데이터 index기반.
    const [selectedFriend, setSelectedFriend] = useState("");
    console.log(selectedFriend);
    return (
        <Wrapper>
            <div>
                <Subtitle>MyFriendsList</Subtitle>
                <Card>
                    {friends.map((friend, index) => (
                        <FriendListItem
                            key={index}
                            friend={friend}
                            onClick={() => setSelectedFriend(friend.user_id)}
                        />
                    ))}
                </Card>
            </div>
            <ProfileCard profile={selectedFriend} user={1} />
        </Wrapper>
    );
}

export default RightCard;
