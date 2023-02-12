import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import Alert from "@mui/material/Alert";
// import AlertTitle from "@mui/material/AlertTitle";
// import Stack from "@mui/material/Stack";

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
    /* border: solid 1px black; */
`;
const FriendNumber = styled.span`
    font-size: 2vh;
    /* border: solid 1px black; */
`;
const Text = styled.span`
    font-size: 1.5vh;
    color: #000000;
`;

function DeleteFriend({ myEmail, friendEmail }) {
    alert(
        "Are you sure you want to delete your friend? If you delete a friend, you can no longer request a chat"
    );

    axios
        .delete("/api/friend", {
            data: {
                userEmail: myEmail,
                friendEmail: friendEmail,
            },
        })
        .then(function (res) {
            console.log(res.data.msg);
            alert("친구가 삭제되었습니다.");
        })
        .catch(function (error) {
            console.log(error);
        });
}

function interestRernderer(array) {
    let result = "";
    if (array) {
        for (let i = 0; i < array.length; i++) {
            result += "#" + array[i].field + "  ";
        }
    }

    return result;
}

function Friend(props) {
    const myInfo = useSelector((state) => state.AuthReducer);
    const userInfo = props.selectedFriend;
    const [friendCnt, setFriendCnt] = useState("");

    if (userInfo === "") {
        console.log("nothing selected");
        return <ProfileCard width="" />;
    } else {
        axios
            .get("/api/friend/count", {
                params: { userEmail: userInfo.userEmail },
            })
            // handle success
            .then(function (res) {
                setFriendCnt(res.data.friendCnt);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <ProfileCard
            header={
                <>
                    <ProfileImg src={userInfo.imgUrl} width="9vh" />
                    <Friends>
                        <FriendNumber>{friendCnt}</FriendNumber>
                        Friends
                    </Friends>
                    <PersonRemoveIcon
                        color="#e7e7e7"
                        onClick={() =>
                            DeleteFriend({
                                myEmail: myInfo.userEmail,
                                friendEmail: userInfo.userEmail,
                            })
                        }
                        cursor="pointer"
                    />
                </>
            }
            name={userInfo.name}
            body={
                <>
                    <InputGroup
                        icon={
                            <EmailIcon
                                sx={{
                                    color: "#615e5f",
                                    opacity: "0.5",
                                    height: "2vh",
                                }}
                            />
                        }
                        flex="column"
                        textValue="Email"
                        fontSize="1vh"
                        fontColor="#7c7c7c"
                        margin="5% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        icon={
                            <CakeIcon
                                sx={{
                                    color: "#615e5f",
                                    opacity: "0.5",
                                    height: "2vh",
                                }}
                            />
                        }
                        flex="column"
                        textValue="Birth"
                        fontSize="1vh"
                        fontColor="#7c7c7c"
                        margin="5% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birthDay}</Text>}
                    ></InputGroup>

                    <InputGroup
                        icon={
                            <LanguageIcon
                                sx={{
                                    color: "#615e5f",
                                    opacity: "0.5",
                                    height: "2vh",
                                }}
                            />
                        }
                        flex="column"
                        textValue="Language"
                        fontSize="1vh"
                        fontColor="#7c7c7c"
                        margin="5% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.language.name}</Text>}
                    ></InputGroup>

                    <InputGroup
                        icon={
                            <TextSnippetIcon
                                sx={{
                                    color: "#615e5f",
                                    opacity: "0.5",
                                    height: "2vh",
                                }}
                            />
                        }
                        flex="column"
                        textValue="Bio"
                        fontSize="1vh"
                        fontColor="#7c7c7c"
                        margin="5% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="3vh"
                        obj={<Text>{userInfo.bio}</Text>}
                    ></InputGroup>
                    <InputGroup
                        icon={
                            <FavoriteIcon
                                sx={{
                                    color: "#615e5f",
                                    opacity: "0.5",
                                    height: "2vh",
                                }}
                            />
                        }
                        flex="column"
                        textValue="Interests"
                        fontSize="1vh"
                        fontColor="#7c7c7c"
                        margin="5% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={
                            <Text>{interestRernderer(userInfo.interests)}</Text>
                        }
                    ></InputGroup>
                    <></>
                </>
            }
        />
    );
}

export default Friend;
