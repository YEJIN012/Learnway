import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { chatRoomLst } from "../../chat/actions/profileAction";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SendIcon from "@mui/icons-material/Send";
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

function MakeChat({ userEmail, friendEmail }) {
    console.log(userEmail);
    console.log(friendEmail);
    axios
        .post("/api/chat/room", {
            userEmail: userEmail,
            friendEmail: friendEmail,
        })
        .then(function (res) {
            console.log(res);
            return true;
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
    const handleDeletedFriend = props.handleDeletedFriend;
    const [friendCnt, setFriendCnt] = useState("");
    const ChatBtnState = useSelector((state) => state.ChatBtnReducer);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    function DeleteFriend({ userEmail, friendEmail }) {
        alert(
            t('Are you sure you want to delete your friend? If you delete a friend, you can no longer request a chat')
        );

        axios
            .delete("/api/friend", {
                data: {
                    userEmail: userEmail,
                    friendEmail: friendEmail,
                },
            })
            .then(function (res) {
                console.log(res);
                alert(t('Your friend has been deleted.'));
                handleDeletedFriend();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

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
                        onClick={() => {
                            DeleteFriend({
                                userEmail: myInfo.userEmail,
                                friendEmail: userInfo.userEmail,
                            });
                            // 바뀐 나의 채팅방리스트(친구끊으면 채팅방소멸) 호출 및 redux 갱신
                            const roomList = chatRoomLst(myInfo.userEmail);
                            console.log(roomList);
                            roomList.payload.then((res) =>
                                dispatch({ type: roomList.type, payload: res })
                            );
                        }}
                        cursor="pointer"
                        sx={{
                            position: "absolute",
                            right: "0.8vw",
                            top: "16.5vh",
                            color: "gray",
                            opacity: "0.4",
                        }}
                    />
                    <SendIcon
                        color="#e7e7e7"
                        onClick={() => {
                            // 방만드는 aioxs함수 호출
                            MakeChat({
                                userEmail: myInfo.userEmail,
                                friendEmail: userInfo.userEmail,
                            });

                            // 바뀐 나의 채팅방리스트(채팅방 추가) 호출 및 redux 갱신
                            const roomList = chatRoomLst(myInfo.userEmail);
                            roomList.payload.then((res) =>
                                dispatch({ type: roomList.type, payload: res })
                            );

                            // chattingFtb Open
                            dispatch({
                                type: "ChatBtnUpdate",
                                payload: true,
                            });
                        }}
                        cursor="pointer"
                        sx={{ 
                            rotate: "-45deg",
                            // color: "white" 
                        }}
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
                        inputHeight="auto"
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
