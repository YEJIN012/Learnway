import React from 'react';
import styled from 'styled-components';
import VideocamIcon from '@mui/icons-material/Videocam';
import ProfileImg from "../ui/ProfileImg";

const Frame = styled.div`
    width:88%;
    min-width: 176px;
    height:10%;
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    // border:solid 1px black;
    padding-top: 5%;
    padding-bottom: 1%; 
    border-bottom: .08rem solid #B4ABAB;
    margin: 0 auto;
    &:hover{  
        border-bottom: .08rem solid #615E5F;
    };
    cursor:"pointer";
`;

const UserFrame = styled.div`
    width:70%;
    height:100%;
    display:flex;
    flex-direction:row;
    margin: 0 0 0 0.3vw;
    // border:1px solid black;
`;

const DetailBox = styled.div`
    height:inherit;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    // border:1px solid black;
    margin-left:1vw;
`;

const UserName = styled.span`
    font-size:1.1vw;
    font-weight:900;
    // border:1px solid black;
    color : #4F4C4D;
`;

const Info = styled.span`
    font-size:0.8vw;
    font-weight:600;
    /* margin-top:0.4vw; */
    color : #4F4C4D;
    // border:1px solid black;
`;


const Func = styled.div`
    width:30%;
    height:100%;
    display:flex;
    flex-direction:row;
    // border:1px solid black; 
`;

const LogonTime = styled.div`
    width: 80%;
    height: inherit;
    font-size: 0.8vw;
    display: flex;
    justify-content: center;
    align-items: center;
    color : #4F4C4D;
    margin-top:0.1vw;
    font-weight:600;
    // border: 1px solid black;
`;

function UserProfile(props) {
    if (props.id === 0) {
        const imgurl = props.userInfo.profileDto.imgUrl
        const name = props.userInfo.profileDto.name;
        const latestmsg = props.userInfo.msg;
        const latestDateTime = props.userInfo.dateTime===null? ["","","","","","",""] :props.userInfo.dateTime;

        return (
            <Frame onClick={()=>{props.click(props.userInfo)}}>
                <UserFrame>
                    <ProfileImg src={imgurl} width="2.3vw" minWidth="30px"/>
                    <DetailBox>
                        <UserName>{name}</UserName>
                        <Info>{latestmsg.substr(0, 15)+' ...'}</Info>
                    </DetailBox>
                </UserFrame>
                <Func>
                    <LogonTime>
                        {`${latestDateTime[0]}.${latestDateTime[1]}.${latestDateTime[2]}`}<br/>{`${latestDateTime[3]}:${latestDateTime[4]}${(latestDateTime[3] > 0 && latestDateTime[3] < 12)?'  am' : '  pm'}`}
                    </LogonTime>
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
                    <ProfileImg src={imgurl} width="3vw" minWidth="30px"/>
                    <DetailBox>
                        <UserName>{name}</UserName>
                        <Info>{`Last seen. ${latestDateTime} ago`}</Info>
                    </DetailBox>
                </UserFrame>

                <VideocamIcon sx={{fontSize: "2vw", color: "615e5f", opacity: "0.5", minWidth:"30px", minheight:"20px"}} cursor="pointer" />

            </Frame>
        );
    }
} export default UserProfile;