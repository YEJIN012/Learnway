import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";
import EditProfile from "./EditProfile";
import FriendList from "./FriendList";
import "../../ui/mypage.css";

function ProfileAndFriends(props) {
    const tab = props.tab;

    const [selectedFriend, setSelectedFriend] = useState("");
    const handleSelectedFriend = (e, data) => {
        setSelectedFriend(data);
    };

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
                {/* {console.log(selectedFriend)} */}
                {selectedFriend && (
                    <div>
                        <div className="subtitle">Friend</div>
                        <ProfileCard data={selectedFriend} user={tab} />
                    </div>
                )}
                <div>
                    <div className="subtitle">MyFriendsList</div>
                    <div className="white-card list">
                        <FriendList
                            handleSelectedFriend={handleSelectedFriend}
                        />
                        {/* {console.log(selectedFriend)} */}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileAndFriends;
