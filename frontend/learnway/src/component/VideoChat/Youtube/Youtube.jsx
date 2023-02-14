import React,{useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import YoutubeFrame from 'react-youtube'
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import ResultComponent from './ResultComponent';
import ResultList from './ResultList'
import SearchBtnImg from '../../ui/searchBtn.png';
import { EnergySavingsLeafTwoTone } from "@mui/icons-material";
axios.defaults.headers['Access-Control-Allow-Credentials']=true;
axios.defaults.headers['Access-Control-Allow-Origin']='*';
axios.defaults.withCredentials = true;
const Frame = styled.div`
    width:60vw;
    height:45vw;
    display:flex;
    flex-direction:row;
    border-radius:10px;
    background:#FFFFFF;
    box-shadow:-1px 2px 9px -1px #B5B5B5;
`;

const Search = styled.div`
    width:25vw;
    display:flex;
    flex-direction:column;
    align-items:center;

`;

const SearchBox = styled.div`
    width:23vw;
    height:3vw;
    margin:1vw 0 1vw 0;
    display:flex;
    flex-direction:row;
    align-content:center;
    align-items:center;
    background: #ECECEC;
    border-radius: 6px;
    justify-content: space-around;

`;

const Input = styled.input.attrs({
    placeholder:"Search Youtube Content"
    
})`
background: none;
border: none;
margin: 0 0.5vw 0 0.5vw;
font-size: 1.2vw;
color: #A8A8A8;
width: 18vw;
outline:none;
`;

const Searchbtn = styled.div`
    width: 2.1vw;
    height: 2vw;
    background-image: url(${props => props.url || ""});
    background-size:cover;
    onKeyPress:{(e)=>{e.key === 'Enter'?}}
    cursor:pointer
`;

const Video = styled.div`
width:35vw;
display:flex;
flex-direction: column;
align-items: flex-start;
justify-content: center;
`;

const VodTitle = styled.div`
width: 28vw;
    height: 5vh;
    font-size: 1vw;

    font-weight: 600;
    padding: 0 0 1vw 0;
`;




function deleteRoom(id){
    axios.delete(`/api/chat/room/${id}`)
    .then(function(res){
        console.log(res);
    }).catch(function(err){
        console.log(err);
    })
}


const socket =  new SockJS('/api/ws-stomp');
const ws =  Stomp.over(socket);

function Youtube({...props}){
    
    const [socketObj, setSocketObj] = useState(undefined)
    const [searchData, setSearchData] = useState([]);
    const [query, setQuery] = useState("");
    const [vodId, setVodId] = useState(undefined);
    const[playState, setPlayState] = useState(undefined);
    const[socketId, setSocketId] = useState(undefined);
    const[vodTitle, setVodTitle] = useState(undefined);
    console.log(vodId)
    console.log(props.sockId)
    useEffect(()=>{
        makeRoom(props.myId, props.oppoId);
        ws.connect({}, (frame) => {
            
            console.log("connected to Youtube socket:", frame);
            //subscribe();
        })
        return()=>{
            ws.disconnect(()=>{
                console.log("Youtube socket disconnected");
            })}
            
    },[])

    console.log(socketId);

    function makeRoom(myId, oppoId) {
        console.log(myId, oppoId)
        axios.post(`/api/youtube/create`, {
          userEmail: myId,
          friendEmail: oppoId,
        }).then(function(res){
            console.log(res.data.roomId)
            setSocketId(res.data.roomId)
        })
        
      }
    //Youtube 컴포넌트 실행 시 웹 소캣 개설(1회)
    /*useEffect(()=>{
        if(props.sockId !== null){
            //console.log("룸아이디"+props.sockId)

                    ws.connect({}, (frame) => {
                        setSocketE(frame)
                        console.log("connected to Youtube socket:", frame);
                        subscribe();
                    })
        }
           
        return()=>{
            ws.disconnect(()=>{
                console.log("console disconnected");
            })}
            
        }
            ,[])
      */  
    //내가 동영상 조작 이벤트 발생 시, 상대방에게 조작정보 전송
    /*useEffect(()=>{
        if(vodId !== null && playState !== null && socketE !== null){
            
            ws.send('/pub/chat/message', {}, JSON.stringify({type: "TALK",roomId: props.sockId, sender: props.myId, message: {playControl:playState}}))
        }
    },[playState]);
*/
    function controlVod(event){
        switch(event.getPlayerState()){
            case 0:
                event.stopVideo();
            case 1:
                event.playVideo();
            case -1:
                event.playVideo();
            case 2:
                event.pauseVideo();
        }
        const second = event.getCurrentTime();
        event.seekTo(second, true);
    }

    //내가 동영상을 선택하면, 동영상을 띄우고 상대방에게 조작정보 전송
    /*useEffect(()=>{
        if(vodId !== null){
            ws.send('/pub/chat/message', {}, JSON.stringify({type: "TALK",roomId: props.sockId, sender: props.myId, message: {vodChange:vodId}}))
        }
    },[vodId]);
    */
    function subscribe(){
        ws.subscribe(`/sub/chat/room/${props.sockId}`, (event) => {
            const received = JSON.parse(event.body)
            if(received.sender === props.oppoid){
                const data = received.message;
                //수신받은 동영상 조작정보를 state에 저장하고 내 동영상에 업데이트
                if(data.hasOwnProperty('playControl') === true){
                    if(vodId !== null){
                        const func = async()=>{

                            await setPlayState(data.playControl)
                            await controlVod(playState);
                        }
                        func();
                        
                    }
                }
                //동영상의 아이디가 들어오면 해당 동영상을 내 컴포넌트에 띄운다.
                if(data.hasOwnProperty('vodChange') === true){
                    setVodId(data.vodChange)
                }
            }
        },{});
    }

    function publish(vodid) {
        //websockt emit
        const da = {
            type: "TALK",
            roomId: socketId,
            sender: props.myId,
            message: vodid,
        };
        ws.send("/pub/chat/message", {}, JSON.stringify(da));
    }

    function processVodId(id){
        setVodId(id);
        publish();
    }
    //console.log(vodTitle)
    //다음 페이지 호출 1, 호출 x 2
    function getSearchData(query){
        
        console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
        let requestURL = `/youtubeapi/youtube/v3/search?q=${query}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=${30}`
        

        axios.get(requestURL
        ).then(async function(res){
            let listData = [];
            let titlelist = new Map();

            const data = res.data.items;
            console.log(data.length);
            for(let i = 0; i < data.length; i++){
                const vodId = data[i].id.videoId;
                const title = data[i].snippet.title;
                const thumb = data[i].snippet.thumbnails.high.url;
                const channel = data[i].snippet.channelTitle;
                //titlelist.set({vodId,title});
                listData.push(<ResultComponent click={processVodId} getTitle = {setVodTitle}key={vodId} id={vodId} imgUrl={thumb} title={title} uploader={channel}></ResultComponent>)
            }
            //setVodTitle(titlelist);
            setSearchData(listData);

            
        }).catch(function(err){
            console.log(err)
        });
    }

    return(
        <Frame>
            <Search>
                <SearchBox>
                    <Input id="queryBox" onChange={(e) => { setQuery(e.target.value) }} onKeyPress={(e)=>{if(e.key === 'Enter'){getSearchData(query)}}}></Input>
                    <Searchbtn url={SearchBtnImg} onClick={()=>{getSearchData(query)}} ></Searchbtn>
                </SearchBox>
                <ResultList data={searchData}></ResultList>
            </Search>
            <Video>
                <VodTitle>{vodTitle}</VodTitle>
                <YoutubeFrame
                videoId={vodId}
                opts={{
                    width:"530",
                    height:"300",
                }}
                onStateChange={(e)=>{setPlayState(e)} } //e.target.getCurrentTime())
                />
            </Video>
        </Frame>
    );
};
export default Youtube;
