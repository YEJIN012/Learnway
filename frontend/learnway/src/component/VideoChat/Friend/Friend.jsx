import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Friends = styled.div`
    width: 11vw;
    height: 15vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.5vw;
    border: solid 1px black;
`;

const FriendNumber = styled.span`
    font-size: 2vw;
    border: solid 1px black;
`;

const Text = styled.span`
    font-size: 2vw;
    color: #7c7c7c;
`;

function addFriend(me, oppo) {
    axios
        .post("/api/friend", {
            userEmail: me,
            friendEmail: oppo,
        })
        .then(function (res) {
            const data = res.data;
            console.log(data);
            if (data.status === 200) {
                alert("친구 추가 성공");
            } else {
                alert("친구 추가 실패 " + String(data.status));
            }
        })
        .catch(function (err) {
            alert("친구 추가 에러");
        });
}

function GetFriendCnt(userEmail) {
    const [friendCnt, setFriendCnt] = useState("");
    axios
        .get("api/friend/count", {
            params: { userEmail: userEmail },
        })
        // handle success
        .then(function (res) {
            console.log("getFriendsNum");
            setFriendCnt(res.data.friendCnt);
        })
        .catch(function (error) {
            console.log(error);
        });
    return friendCnt;
}

// Friend말고 상대방프로필로 함수명 바꿔야할듯..
function Friend() {
    const [userInfo, setUserInfo] = useState({
        name: "",
        email: "",
        birth: "",
        friends: "",
        img: "",
        lang: "",
        interest: [],
        bio: "",
    });

    function getUserInfo() {
        axios
            // 화상 상대방 Info
            .get(`/api/users/profile/${"aaa@ssafy.com"}`)
            .then(function (res) {
                const data = res.data.profile;
                console.log(data);

                setUserInfo({
                    name: data.name,
                    email: data.userEmail,
                    birth: data.birthDay,
                    friends: "",
                    img: data.imgUrl,
                    lang: data.language.name,
                    interest: data.interests,
                    bio: data.bio,
                });
            })
            .catch(function (err) {
                console.log(err);
            });
    }
    useEffect(() => {
        getUserInfo();
    }, []);

    function interestRernderer(array) {
        let result = "";

        for (let i = 0; i < array.length; i++) {
            result += "#" + array[i].field + "  ";
        }

        return result;
    }
    return (
        <ProfileCard
            header={
                <>
                    <ProfileImg url={userInfo.img}></ProfileImg>
                    <Friends>
                        <FriendNumber>
                            {GetFriendCnt(userInfo.email)}
                        </FriendNumber>
                        Friends
                    </Friends>
                    {/* 이미 친구이면 아예 추가 icon안뜨게 처리필요 */}
                    <PersonAddIcon
                        onClick={() =>
                            addFriend("bbb@ssafy.com", "aaa@ssafy.com")
                        }
                        cursor="pointer"
                    />
                </>
            }
            name={userInfo.name}
            body={
                <>
                    <InputGroup
                        flex="column"
                        textValue="Email"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        margin="2vw 0vw 0vw 0vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.email}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birth"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        margin="2vw 0vw 0vw 0vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.birth}</Text>}
                    ></InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Language"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        margin="2vw 0vw 0vw 0vw"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.lang}</Text>}
                    ></InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Bio"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        margin="2vw 0vw 0vw 0vw"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.bio}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Interests"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        margin="2vw 0vw 0vw 0vw"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={
                            <Text>{interestRernderer(userInfo.interest)}</Text>
                        }
                    ></InputGroup>
                </>
            }
            width="46vw"
            height="64vw"
        />
    );
}
export default Friend;
