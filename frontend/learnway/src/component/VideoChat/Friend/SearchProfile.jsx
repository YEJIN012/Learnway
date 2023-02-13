import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {useSelector} from 'react-redux'
import { motion } from "framer-motion";

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.7vh;
`;

const FriendNumber = styled.span`
    font-size: 3.5vh;
`;

const Text = styled.span`
    font-size: 1.3vw;
    color: #7c7c7c;
`;


// Friend말고 상대방프로필로 함수명 바꿔야할듯..
function SearchProfile(props) {
    // 내정보
    const myInfo = useSelector(state => state.AuthReducer);
    // 상대방정보
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
    
    const [friendCnt, setFriendCnt] = useState("");
    
    useEffect(() => {
        getUserInfo(props.user);
        getFriendCnt(props.user)
    }, []);

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
                    getFriendCnt(props.user)
                } else {
                    alert("친구 추가 실패 " + String(data.status));
                }
            })
            .catch(function (err) {
                alert("친구 추가 에러");
            });
    }
    
    function getFriendCnt(userEmail) {
        axios
        .get("/api/friend/count", {
            params: { userEmail: userEmail },
        })
        // handle success
        .then(function (res) {
            console.log("getFriendsNum"+res);
            setFriendCnt(res.data.friendCnt);
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
    function getUserInfo(oppouser) {
        axios
            // 화상 상대방 Info
            .get(`/api/users/profile/${oppouser}`)
            .then(function (res) {
                const data = res.data.profile;
                console.log(res.data);

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

    function interestRernderer(array) {
        let result = "";

        for (let i = 0; i < array.length; i++) {
            result += "#" + array[i].field + "  ";
        }

        return result;
    }
    return (
        <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.1,
          ease: [0.5, 0.71, 0.98, 1.01]
        }} >
        <ProfileCard
            header={
                <>
                    <ProfileImg src={userInfo.img} width={"7vw"}></ProfileImg>
                    <Friends>
                        <FriendNumber>{friendCnt}</FriendNumber>
                        Friends
                    </Friends>
                    {/* 이미 친구이면 아예 추가 icon안뜨게 처리필요 */}
                    <PersonAddIcon
                        onClick={() => addFriend(myInfo.userEmail, props.user)}
                        cursor="pointer"
                        sx={{ scale: "2", color: "#615e5fea" }}
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
                        fontSize="1.8vh"
                        fontColor="#000000"
                        margin="2.5vh 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.email}</Text>}
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
                        fontSize="1.8vh"
                        fontColor="#000000"
                        margin="2.5vh 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birth}</Text>}
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
                        fontSize="1.8vh"
                        fontColor="#000000"
                        margin="2.5vh 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="3vh"
                        obj={<Text>{userInfo.lang}</Text>}
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
                        fontSize="1.8vh"
                        fontColor="#000000"
                        margin="2.5vh 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="7vh"
                        overFlow="hidden"
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
                        fontSize="1.8vh"
                        fontColor="#000000"
                        margin="2.5vh 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={
                            <Text>{interestRernderer(userInfo.interest)}</Text>
                        }
                        ></InputGroup>
                </>
            }
            width="46vw"
            height="90vh"
            />
        </motion.div>
    );
}
export default SearchProfile;
