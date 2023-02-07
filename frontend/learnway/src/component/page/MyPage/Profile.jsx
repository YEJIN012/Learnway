import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
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
    font-size: 2vw;
    border: solid 1px black;
`;
const Text = styled.span`
    font-size: 2vw;
    color: #000000;
`;

function editImg() {}

function Profile() {
    const userInfo = useSelector((state) => state.UserStore);
    return (
        <ProfileCard
            header={
                <>
                    <div>
                        <ProfileImg src={userInfo.imgUrl} />
                        <EditIcon onClick={() => editImg()} cursor="pointer" />
                    </div>
                    <Friends>
                        <FriendNumber>167</FriendNumber>
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
                        fontSize="2vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birthday"
                        fontSize="2vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{userInfo.birthDay}</Text>}
                    ></InputGroup>
                </>
            }
        />
    );
}

export default Profile;
