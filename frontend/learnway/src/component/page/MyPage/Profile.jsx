import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import EditIcon from "@mui/icons-material/Edit";

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.5vw;
    border: solid 1px black;
`;
const FriendNumber = styled.span`
    font-size: 2vh;
    border: solid 1px black;
`;
const Text = styled.span`
    font-size: 1.2vh;
    color: #000000;
`;
const ImgIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

function editImg() { }

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




function Profile() {
    const userInfo = useSelector((state) => state.AuthReducer);

    
    return (
        <ProfileCard
            width="100%"
            header={
                <>
                    {userInfo.imgUrl}
                    <ImgIcon>
                        <ProfileImg src={userInfo.imgUrl} width="8vh" />
                        <EditIcon onClick={() => editImg()} cursor="pointer" />
                    </ImgIcon>
                    <Friends>
                        <FriendNumber>
                            {GetFriendCnt(userInfo.userEmail)}
                        </FriendNumber>
                        Friends
                    </Friends>
                </>
            }
            name={userInfo.name}
            body={
                <>
                    <InputGroup
                        flex="column"
                        textValue="Email"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birthday"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birthDay}</Text>}
                    ></InputGroup>
                </>
            }
        />
    );
}

export default Profile;
