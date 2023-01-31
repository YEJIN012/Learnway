import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FriendListItem from "./FriendListItem";

function FriendList(props) {
    const { handleSelectedFriend } = props
    const [friends, setFriends] = useState("");
    const store = useSelector((state) => state.UserStore);

    async function getFriendList() {
        try {
            const response = await axios
                .get(
                    "https://i8a408.p.ssafy.io/v2/api-docs/friend"
                    , { "userEmail": store["userEmail"] }
                )
            // handle success
            setFriends(response.data.friends);
            console.log('getFriendList')

            
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
                    `https://i8a408.p.ssafy.io/v2/api-docs/users/profile/${friend}`
                );
                tmp.push(response);
                console.log("getFriendProfile");
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
