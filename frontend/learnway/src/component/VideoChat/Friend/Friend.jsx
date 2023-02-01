import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

import FriendIcon from './friendicon.png';

import CommonFrame from '../CommonComponent/CommonFrame'
import InputGroup from "../../ui/InputGroup";
const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:flex-start;

    border:solid 1px black;
`;

const Header = styled.div`
    width:46vw;
    height:15vw;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;

    border:solid 1px black;
    background:#00FF00;
`;

const Text = styled.span`
    font-size:1vw;
    color:#C5C5C5;
`;

const SubFrame = styled.div`
    width:40vw;
    display:flex;
    flex-direction:row;
`;

const InterestBox = styled.input`
`;

//배경 이미지 url
const ProfileImg = styled.div`
    width:14vw;
    height:14vw;
    border-radius:200px;
    background-image: url(${props => props.url || ""});
    background-size:cover;
    border:solid 1px black;
`;

const Friends = styled.div`
    width:11vw;
    height:15vw;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    font-size:0.5vw;
    border:solid 1px black;
`;

const FriendNumber = styled.span`
    font-size:2vw;
    border:solid 1px black;
`;

const AddFriend = styled.div`
    width:5vw;
    height:15vw;
    background-image: url(${FriendIcon});
    background-size:4vw 4vw;
    background-repeat:no-repeat;
    border:solid 1px black;

`;

function addFriend(me, oppo) {
    axios.post("https://i8a408.p.ssafy.io/friend", {
        userEmail: me,
        friendEmail: oppo
    }).then(function (res) {
        const data = res.data;
        console.log(data);
        if (data.status === 200) {
            alert("친구 추가 성공");
        } else {
            alert("친구 추가 실패 " + String(data.status))
        }
    }).catch(function (err) {
        alert("친구 추가 에러");
    })

}
function Friend() {
    const [userInfo, setUserInfo] = useState({ name: "", email: "", birth: "", friends: "", img: "", lang: "", interest: [], bio: "" })

    function getUserInfo() {
        axios.get(`https://i8a408.p.ssafy.io/users/profile/${'aaa@ssafy.com'}`)
            .then(function (res) {
                const data = res.data.profile;

                setUserInfo({ name: data.name, email: data.userEmail, birth: data.birthDay, friends: "", img: data.imgUrl, lang: data.language.name, interest: data.interests, bio: data.bio });
            }).catch(function (err) {
                alert("API 접속 에러");
            });
    }
    useEffect(() => { getUserInfo() }, []);

    function interestRernderer(array) {
        let result = "";

        for (let i = 0; i < array.length; i++) {
            result += ("#" + array[i].field + "  ");
        }

        return result;
    }
    return (

        <CommonFrame
            header={
                <Header>
                    <ProfileImg url={userInfo.img}></ProfileImg>
                    <Friends>
                        <FriendNumber>{userInfo.friends}</FriendNumber>
                        Friends
                    </Friends>
                    <AddFriend onClick={() => addFriend('bbb@ssafy.com', 'aaa@ssafy.com')}></AddFriend>
                </Header>
            }
            body={
                <Frame>
                    <InputGroup
                        flex="column"
                        textValue={userInfo.name}
                        fontSize="2vw"
                        fontColor="#000000"
                        inputWidth="inherit"
                        inputHeight="2vw"
                    >
                    </InputGroup>
                    <SubFrame>
                        <InputGroup
                            flex="column"
                            textValue="Email"
                            fontSize="1.5vw"
                            fontColor="#000000"
                            inputWidth="20vw"
                            inputHeight="2vw"
                            obj={
                                <Text>{userInfo.email}</Text>
                            }>
                        </InputGroup>
                        <InputGroup
                            flex="column"
                            textValue="Birth"
                            fontSize="1.5vw"
                            fontColor="#000000"
                            inputWidth="20vw"
                            inputHeight="2vw"
                            obj={
                                <Text>{userInfo.birth}</Text>
                            }>
                        </InputGroup>
                    </SubFrame>
                    <InputGroup
                        flex="column"
                        textValue="Language"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={
                            <Text>{userInfo.lang}</Text>
                        }>
                    </InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Bio"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={
                            <Text>{userInfo.bio}</Text>
                        }>
                    </InputGroup>
                    
                    <InputGroup
                        flex="column"
                        textValue="Interests"
                        fontSize="1.5vw"
                        fontColor="#000000"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={
                            <InterestBox type="text" value={interestRernderer(userInfo.interest)} readOnly></InterestBox>
                        }>
                    </InputGroup>
                </Frame>
            }>
        </CommonFrame>
    );
};
export default Friend;
