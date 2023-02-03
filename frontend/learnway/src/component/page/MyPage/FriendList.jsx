import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import FriendListItem from "./FriendListItem";

function FriendList(props) {
    const { handleSelectedFriend } = props;
    const [friends, setFriends] = useState(""); // 친구들의 이메일Array
    const store = useSelector((state) => state.UserStore);

    function getFriendList() {
        axios
            .get("api/friend/list",
                { params: { userEmail: store["userEmail"]}})
            // handle success
            .then(function (res) {
                setFriends(res.data.userEmailList);
                console.log("getFriendList");
                console.log(res.data.userEmailList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const [friendsProfile, setfriendsProfile] = useState([]);

    async function getFriendProfile() {
        const tmp = [];
        for await (const friend of friends) {
            try {
                const response = await axios.get(`api/users/profile/${friend}`);
                tmp.push(response);
                console.log("getFriendProfile");
            } catch (error) {
                console.log(error);
            }
        }
        setfriendsProfile(tmp);
    }

    useEffect(() => {
        getFriendList();
    }, []);
    useEffect(() => {
        getFriendProfile();
    }, [friends]);

    return (
        <FriendListItem
            friendsProfile={friendsProfile}
            handleSelectedFriend={handleSelectedFriend}
        />
    );
}

export default FriendList;
