import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import friends from "../../../friends.json";
import ProfileImg from "../../ui/ProfileImg";
import Paper from "@mui/material/Paper";
import InputGroup from "../../ui/InputGroup";
import EditIcon from '@mui/icons-material/Edit';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import "../../ui/mypage.css";

const CardTop = styled.div`
    box-sizing: border-box;
    padding: 15%;
    display: flex;
    justify-content: center;
    height: 30%;
    background: linear-gradient(
        286.15deg,
        rgba(0, 90, 167, 0.5) 0%,
        rgba(254, 253, 228, 0.5) 100%
    );
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    box-sizing: border-box;
    padding: 15%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;
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
const SubFrame = styled.div`
    width: 40vw;
    display: flex;
    flex-direction: row;
`;
const Text = styled.span`
    font-size: 1vw;
    color: #000000;
`;

// 프로필 편집시, useEffect 필요?
function MyProfile() {
    const info = useSelector((state) => state.UserStore);
    return (
        <>
            <CardTop>
                <ProfileImg src={info.imgUrl} />
                <Friends>
                    <FriendNumber>167</FriendNumber>
                    Friends
                </Friends>
                <EditIcon/>
            </CardTop>
            <CardBottom>
                <InputGroup
                    flex="column"
                    textValue={info.name}
                    fontSize="2vw"
                    inputWidth="inherit"
                    inputHeight="2vw"
                ></InputGroup>
                <SubFrame>
                    <InputGroup
                        flex="column"
                        textValue="Email"
                        fontSize="2vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{info.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birthday"
                        fontSize="2vw"
                        inputWidth="20vw"
                        inputHeight="2vw"
                        obj={<Text>{info.birthDay}</Text>}
                    ></InputGroup>
                </SubFrame>
            </CardBottom>
        </>
    );
}

function FriendProfile(props) {
    const info = props.data;
    console.log(info)
    return (
        <>
            <CardTop>
                <ProfileImg src={info.imgUrl} />
                <Friends>
                    <FriendNumber>167</FriendNumber>
                    Friends
                </Friends>
                <PersonRemoveIcon/>
            </CardTop>
            <CardBottom>
                <InputGroup
                    flex="column"
                    textValue={info.name}
                    fontSize="2vw"
                    inputWidth="inherit"
                    inputHeight="2vw"
                ></InputGroup>
                <SubFrame>
                    <InputGroup
                        flex="column"
                        textValue="Email"
                        fontSize="2vw"
                        inputWidth="15vw"
                        inputHeight="2vw"
                        obj={<Text>{info.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birthday"
                        fontSize="2vw"
                        inputWidth="15vw"
                        inputHeight="2vw"
                        obj={<Text>{info.birthDay}</Text>}
                    ></InputGroup>
                </SubFrame>
            </CardBottom>
        </>
    );
}
// function YourProfile(props) {
//     //props : 상대방정보 + friend인지아닌지
//     console.log(props);
//     const info = props;
//     return (
//         <>
//             <CardTop>
//                 <ProfileImg src={info.imgUrl} />
//                 <Friends>
//                     <FriendNumber>167</FriendNumber>
//                     Friends
//                 </Friends>
//                 프로필이미지편집버튼
//             </CardTop>
//             <CardBottom>
//                 <InputGroup
//                     flex="column"
//                     textValue={info.name}
//                     fontSize="2vw"
//                     inputWidth="inherit"
//                     inputHeight="2vw"
//                 ></InputGroup>
//                 <SubFrame>
//                     <InputGroup
//                         flex="column"
//                         textValue="Email"
//                         fontSize="2vw"
//                         inputWidth="inherit"
//                         inputHeight="2vw"
//                         obj={<Text>{info.userEmail}</Text>}
//                     ></InputGroup>
//                     <InputGroup
//                         flex="column"
//                         textValue="Birthday"
//                         fontSize="2vw"
//                         inputWidth="inherit"
//                         inputHeight="2vw"
//                         obj={<Text>{info.birthday}</Text>}
//                     ></InputGroup>
//                 </SubFrame>
//             </CardBottom>
//         </>
//     );
// }

function ProfileCard(props) {
    // email -> 선택된 친구의 data
    // user : 0 -> MyProfile, 1-> FriendsProfile, 3-> YourProfile
    const { data, user } = props;
    console.log(user)

    const profileContent = {
        0: <MyProfile />,
        1: <FriendProfile data={data} />,
        // 2: <YourProfile data={data} />,
    };

    return (
        <Paper
            elevation={3}
            children={profileContent[user]}
            sx={{ borderRadius: "35px", width:"30vw" , height:"50vh"}}
        />
    );
}

export default ProfileCard;
