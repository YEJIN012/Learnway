import React,{useState} from 'react';
import styled from 'styled-components';

import UserProfile from './UserProfile';
import ChatText from './ChatText';

const RoomFrame = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
`;

const List = styled.ul`
    list-style:none;
    padding-left:0px;
`;
const Body = styled.div`
    width:inherit;
    height:80%;
    overflow:scroll;

    border:solid 1px black;
`
const InputBox=styled.input`
    width:inherit;
    height:10%;

    border:solid 1px black;
`;


//검색버튼(유튜브와 공통 컴포넌트)
const SearchBox = styled.div`
    width:23vw;
    height:3vw;
    margin:1vw 0 1vw 0;
    display:flex;
    flex-direction:row;
    align-content:center;
    align-items:center;
    border:solid 1px black;
`;

const Input = styled.input`
    width:19vw;
    height:2.5vw;
`;

const Searchbtn = styled.div`
    width:3vw;
    height:3vw;
    background-image: url(${props => props.url || ""});
    background-size:cover;
`;

//검색 공통 컴포넌트 끝 

function Chatroom(props){
    const [text, setText] = useState("")
    const [chatLog, setChatLog] = useState([]);
    const [msgId, setMsgId] = useState(initMsgId());
    console.log(msgId)
    console.log(text)
    console.log(chatLog)
    
    function socketEmit(text){
        //props에서 room id + text 를 보냅니다.
        console.log(props.roomid, test);
    }


    //채팅 기록 컴포넌트 초기 렌더링 시 마지막 순서 기억
    function initMsgId(){
        if(chatLog.length === 0){
            return 0;
        }else{
            return chatLog[chatLog.length-1].id;
        }
    }
    //메세지 보내는 함수(메세지를 보내고, 컴포넌트 업데이트)
    function sendMsg(value){
        //websockt emit
        console.log("socket emit");
        socketEmit(value);
        //component renendering
        const data = {id:msgId, msg: <ChatText id={0} text={value}></ChatText>};
        setMsgId(msgId+1);
        setChatLog([...chatLog, data]);
    }

    return(
        <RoomFrame>

        <UserProfile id={0}></UserProfile>
        <Body>
            <List>
            {chatLog.map((chatLog)=>(
                <li key={chatLog.id}>{chatLog.msg}</li>
                ))}
                
                </List>
        </Body>
        <SearchBox>
                    <Input id="queryBox" onChange={(e) => { setText(e.target.value) }}></Input>
                    <Searchbtn url={"https://static.solved.ac/tier_small/4.svg"} onClick={()=>{sendMsg(text)}} ></Searchbtn>
                </SearchBox>
        </RoomFrame>
    );
}export default Chatroom;