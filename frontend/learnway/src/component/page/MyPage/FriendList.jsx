import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Paper from "@mui/material/Paper";
import FriendListItem from "./FriendListItem";

function FriendList(props) {
    const { handleSelectedFriend, deletedFriend } = props;
    console.log(deletedFriend)

    const store = useSelector((state) => state.AuthReducer);
    // const [friends, setFriends] = useState(""); // 친구들의 이메일Array
    const [status, setStatus] = useState("");
    const [friendsProfile, setFriendsProfile] = useState([]);

    async function getFriendList() {
        try{
            const res = await axios.get(
                "api/friend/list",
                { params: { userEmail: store["userEmail"]}})
            // handle success
            console.log("getFriendList");
            setFriendsProfile(res.data.friendProfileList);
            }
        catch(error) {
                console.log(error.response.data.msg);
                setStatus(error.response.data.status);
            }
    }

    useEffect(() => {
        getFriendList();
        console.log(friendsProfile)
    }, [deletedFriend]);
    
    if (status === 404) {
        return (
            <Paper
            elevation={3}
            children={
                <div>
                    "Make new friends who can have language exchange constantly
                    through our Learnway😉"
                </div>
            }
            sx={{
                borderRadius: "35px",
                height: "60vh",
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
                    <>
                        <FriendListItem
                            friendsProfile={friendsProfile}
                            handleSelectedFriend={handleSelectedFriend}
                        />
                    </>
                }
                sx={{
                    borderRadius: "35px",
                    height: "inherit",
                    minHeight: "60vh",
                    boxSizing: "border-box",
                    paddingX: "3.5vw",
                    paddingY: "7vh",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "start",
                    width: "37.65vw",
                }}
            />
        );
        }
    }

export default FriendList;
