import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import friends from "../../../friends.json";
import "../../ui/mypage.css"

const Item = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function FriendListItem(props) {
    const { friend, onClick } = props;

    return (
        <Item onClick={onClick}>
            <ProfileImg src={friend.img_url} width={50} />
            <div>{friend.name}</div>
            <div>{friend.language}</div>
        </Item>
    );
}

function ProfileAndFriends(props) {
    const tab = props.tab

    const [selectedFriend, setSelectedFriend] = useState("");
    
    if (tab === 0) {
        return (
            <div className="wrapper">
                <div>
                    <div className="subtitle">Profile</div>
                    <ProfileCard user={tab} />
                </div>
                <div>
                    <div className="subtitle">Edit Profile</div>
                    <EditProfile />
                </div>
            </div>
        );
    } else {
        return (
            <div className="wrapper">
                <div>
                    <div className="subtitle">Friend</div>
                    <ProfileCard profile={selectedFriend} user={tab} />
                </div>
                <div>
                    <div className="subtitle">MyFriendsList</div>
                    <div className="white-card-list">
                        {friends.map((friend, index) => (
                            <FriendListItem
                                key={index}
                                friend={friend}
                                onClick={() =>
                                    setSelectedFriend(friend.user_id)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        );        
    }
}

export default ProfileAndFriends;
