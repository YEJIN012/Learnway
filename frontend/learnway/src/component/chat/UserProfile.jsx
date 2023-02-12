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
        const imgurl = props.userInfo.profileDto.imgUrl
        const name = props.userInfo.profileDto.name;
        const latestmsg = props.userInfo.msg;
        const latestDateTime = props.userInfo.dateTime===null? ["","","","","","",""] :props.userInfo.dateTime;
        console.log(latestDateTime)
        return (
            <Frame onClick={()=>{props.click(props.userInfo)}}>
                <UserFrame>
                    <ProfileImg url={imgurl}></ProfileImg>
                    <DetailBox>
                        <UserName>{name}</UserName>
                        <Info>{latestmsg.substr(0, 15)+' ...'}</Info>
                    </DetailBox>
                </UserFrame>
                <Func>
                    <LogonTime>{`${latestDateTime[0]}.${latestDateTime[1]}.${latestDateTime[2]}`}<br/>{`${latestDateTime[3]}:${latestDateTime[4]}${(latestDateTime[3] > 0 && latestDateTime[3] < 12)?'  am' : '  pm'}`}</LogonTime>
                    
                </Func>
            </Frame>
        );
    } else if (props.id === 1) {
        const date = new Date()
        const imgurl = props.room.profileDto.imgUrl;
        const name = props.room.profileDto.name;
        const latestDateTime = props.room.dateTime===null? "" :(date.getDate() - props.room.dateTime[2]);
        return (

            <Frame>
                <UserFrame>
                    <ProfileImg url={imgurl}></ProfileImg>
                    <DetailBox>
                        <UserName>{name}</UserName>
                        <Info>{`Last seen. ${latestDateTime} ago`}</Info>
                    </DetailBox>
                </UserFrame>
                <Func>
                    <RequestVideoChatBtn></RequestVideoChatBtn>
                </Func>
            </Frame>
        );
    }
} export default UserProfile;