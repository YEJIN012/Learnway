import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import friends from "../../../friends.json";
import "../../ui/mypage.css"
import axios from "axios";

const Item = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function FriendList() {
    axios.get("https://e2f0d84e-8814-4680-9e99-76a584a5f3e8.mock.pstmn.io/friend")
    .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data.friends)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
}

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
            <div className="wrapper-row">
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
            <div className="wrapper-row">
                <div>
                    <div className="subtitle">Friend</div>
                    <ProfileCard profile={selectedFriend} user={tab} />
                </div>
                <div>
                    <div className="subtitle">MyFriendsList</div>
                    <div className="white-card list">
                        <FriendList/>
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
