import React from 'react';
import styled from 'styled-components';

const Frame = styled.div`
    width:inherit;
    height:10%;
    display:flex;
    flex-direction:row;
    border:solid 1px black;
`;

//youtube resultcomponent와 동일(공통으로 묶기)
const UserFrame = styled.div`
    width:70%;
    height:100%;
    display:flex;
    flex-direction:row;
    margin:0 0 0 0;
    border:1px solid black;
`;

const ProfileImg = styled.div`
    width:3vw;
    height:3vw;
    background-image: url(${props => props.url || ""});
    background-size:cover;
    border-radius:999px;
    margin:0vw 0vw 0vw 0vw;
    border:1px solid black;
`;

const DetailBox = styled.div`
    height:inherit;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    border:1px solid black;
`;

const UserName = styled.span`
    font-size:1vw;
    font-weight:700;

    border:1px solid black;
`;

const Info = styled.span`
    font-size:0.5vw;
    font-weight:600;

    border:1px solid black;
`;

//공통 대상 컴포넌트 영역 끝

const Func = styled.div`
    width:30%;
    height:100%;
    display:flex;
    flex-direction:row;
    border:1px solid black; 
`;

const LogonTime = styled.div`
width: 80%;
height: inherit;
font-size: 0.7vw;
display: flex;
justify-content: center;
align-items: center;

border: 1px solid black;
`;

const Check = styled.div`
    width:20%;
    height:inherit;

    border:1px solid black;
`;

const RequestVideoChatBtn = styled.div`
    width:100%;
    height:inherit;

    border:1px solid black;
`;
function UserProfile(props) {
    if (props.id === 0) {
        return (
            <Frame>
                <UserFrame>
                    <ProfileImg url={props.Room.profileDto.imgUrl}></ProfileImg>
                    <DetailBox>
                        <UserName>{props.Room.profileDto.name}</UserName>
                        <Info>{props.Room.msg.substr(0, 15)+' ...'}</Info>
                    </DetailBox>
                </UserFrame>
                <Func>
                    <LogonTime>{'YY.MM.DDO'}<br/>{'HH:MM pm'}</LogonTime>
                    <Check></Check>
                </Func>
            </Frame>
        );
    } else if (props.id === 1) {
        return (
            <Frame>
                <UserFrame>
                    <ProfileImg url={props.Room.profileDto.imgUrl}></ProfileImg>
                    <DetailBox>
                        <UserName>{props.Room.profileDto.name}</UserName>
                        <Info>{'Offlilne - Last seen. 1 month ago'}</Info>
                    </DetailBox>
                </UserFrame>
                <Func>
                    <RequestVideoChatBtn></RequestVideoChatBtn>
                </Func>
            </Frame>
        );
    }
} export default UserProfile;