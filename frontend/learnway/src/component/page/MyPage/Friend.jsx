import Reactm, {useState} from "react";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

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

function deleteFriend() {}

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
    const userInfo = props.selectedFriend;
    console.log(userInfo);

    return (
        <ProfileCard
            width="100%"
            header={
                <>
                    <ProfileImg src={userInfo.imgUrl} />
                    <Friends>
                        <FriendNumber>
                            {GetFriendCnt(userInfo.userEmail)}
                        </FriendNumber>
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
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.email}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birth"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birth}</Text>}
                    ></InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Language"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.lang}</Text>}
                    ></InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Bio"
                        fontSize="1.5vh"
                        fontColor="#000000"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.bio}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Interests"
                        fontSize="1.5vh"
                        fontColor="#000000"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
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
