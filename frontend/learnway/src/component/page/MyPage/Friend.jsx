import React from "react";
import styled from "styled-components";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

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
    color: #000000;
`;

function deleteFriend() { }

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
    const userInfo = props.selectedFriend
    console.log(userInfo)

    return (
        <ProfileCard
            header={
                <>
                    <ProfileImg src={userInfo.imgUrl} />
                    <Friends>
                        <FriendNumber>167</FriendNumber>
                        Friends
                    </Friends>
                    <PersonRemoveIcon
                        onClick={() => deleteFriend()}
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
        />
    );
}

export default Friend;
