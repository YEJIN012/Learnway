import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import axios from "axios";
import FriendListItem from "./FriendListItem";

const Item = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

function FriendList(props) {
    const { handleSelectedFriend } = props
    const [friends, setFriends] = useState("");

    async function getFriendList() {
        try {
            const response = await axios
                .get(
                    "https://3e43af35-aeee-496c-af8a-0128d780e1a7.mock.pstmn.io/friend"
                )
            // handle success
            setFriends(response.data.friends);

            
        } catch (error) {
            // handle error
            console.log(error);
        };
    }


    const [friendsProfile, setfriendsProfile] = useState([]);

    async function getFriendProfile() {
        const tmp = [];
        for await (const friend of friends) {
            try {
                const response = await axios.get(
                    `https://3e43af35-aeee-496c-af8a-0128d780e1a7.mock.pstmn.io/users/profile/${friend}`
                );
                tmp.push(response);
            } catch (error) {
                console.log(error);
            }
        }
        setfriendsProfile(tmp);
    }


    useEffect(() => { getFriendList(); }, []);
    useEffect(() => { getFriendProfile() }, [friends])
    return (
        <FriendListItem
            friendsProfile={friendsProfile}
            handleSelectedFriend={handleSelectedFriend}
        />
    );
}

export default FriendList;
