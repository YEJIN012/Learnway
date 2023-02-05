import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Paper from "@mui/material/Paper";
import FriendListItem from "./FriendListItem";

function FriendList(props) {
    const { handleSelectedFriend } = props;
    const store = useSelector((state) => state.AuthReducer);
    const [friends, setFriends] = useState(""); // 친구들의 이메일Array
    const [status, setStatus] = useState("");

    function getFriendList() {
        axios
            .get("api/friend/list",
                { params: { userEmail: store["userEmail"]}})
            // handle success
            .then(function (res) {
                setFriends(res.data.userEmailList);
                console.log("getFriendList");
            })
            .catch(function (error) {
                console.log(error.response.data.msg);
                setStatus(error.response.data.status);
            })
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

    if (status === 404) {
        return (
            <Paper
            elevation={3}
            children={
                <div>
                    "Make a friend who can have a constant language exchange
                    through our Learnway😉"
                </div>
            }
            sx={{
                borderRadius: "35px",
                height: "50vh",
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                boxSizing: "border-box",
                paddingX: "5vw",
                paddingY: "5vw",
                fontSize: "2vw",
            }}
            />
            )
        } else {
        return (
            <Paper
            elevation={3}
            children={
                <FriendListItem
                friendsProfile={friendsProfile}
                handleSelectedFriend={handleSelectedFriend}
                />
            }
            sx={{
                borderRadius: "35px",
                height: "50vh",
                display: "flex",
                flexDirection: "row",
                alignItems: "start",
                boxSizing: "border-box",
                paddingX: "2vw",
                paddingY: "5vw",
            }}
            />
            );
        }
    }

export default FriendList;
