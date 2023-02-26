import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import YoutubeFrame from "react-youtube";
import Stomp from "stompjs";
import SockJS from "sockjs-client";

import ResultComponent from "./ResultComponent";
import ResultList from "./ResultList";
import SearchIcon from "@mui/icons-material/Search";
import {request} from "../../page/Front/utils/axios"

axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;
const Frame = styled.div`
    width: 60vw;
    height: 45vw;
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: -1px 2px 9px -1px #b5b5b5;
`;

const Search = styled.div`
    width: 25vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SearchBox = styled.div`
    width: 23vw;
    height: 3vw;
    margin: 1vw 0 1vw 0;
    display: flex;
    flex-direction: row;
    align-content: center;
    align-items: center;
    background: #ececec;
    border-radius: 6px;
    justify-content: space-around;
`;

const Input = styled.input.attrs({
    placeholder: "Search Youtube Content",
})`
    background: none;
    border: none;
    margin: 0 0.5vw 0 0.5vw;
    font-size: 1.2vw;
    color: #a8a8a8;
    width: 18vw;
    outline: none;
`;

const Video = styled.div`
    width: 35vw;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const VodTitle = styled.div`
    // width: 28vw;
    // height: 5vh;
    font-size: 1vw;
    text-align: center;
    font-weight: 600;
    padding: 0 0 1vw 0;
`;

function Youtube({ ...props }) {
    const socket = new SockJS("https://i8a408.p.ssafy.io/api/ws-stomp");
    const ws = Stomp.over(socket);

    const [searchData, setSearchData] = useState([]);
    const [query, setQuery] = useState("");
    const [vodId, setVodId] = useState(undefined);
    const [socketId, setSocketId] = useState(null);
    const [vodTitle, setVodTitle] = useState(undefined);

    useEffect(() => {
        makeRoom(props.myId, props.oppoId);

        return () => {
            ws.disconnect(() => {
                console.log("Youtube socket disconnected");
            });
        };
    }, []);

    function makeRoom(myId, oppoId) {
        request("post",`/api/youtube/create`,{
            userEmail: myId,
            friendEmail: oppoId,
        }).then((res)=>{
            if (socketId === null) {
                setSocketId(res.roomId);
            }
            ws.connect({}, (frame) => {
                console.log("connected to Youtube socket:", frame);
                subscribe(res.roomId);
            });
          })
    }

    function subscribe(newSocketId) {
      
        ws.subscribe(
            `/sub/chat/room/${newSocketId}`,
            (event) => {
                const received = JSON.parse(event.body);
                const data = received.message;

                if (received.sender === props.oppoId) {

                    var cmdMessage = data.split(":");
                    var command = cmdMessage[0];

                    // 영상이 바꼈을 때
                    if (command == 0) {
                        setVodId(cmdMessage[1]);
                    }
                }
            },
        );
    }

    function publishVodId(vodid) {
        //websockt emit
        const da = {
            type: "TALK",
            roomId: socketId,
            sender: props.myId,
            message: `0:${vodid}`,
        };
        ws.send("/pub/chat/message", {}, JSON.stringify(da));
    }
   
    function processVodId(id) {
        setVodId(id);
        publishVodId(id);
    }
   
    function getSearchData(query) {
        console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
        let requestURL = `/youtubeapi/youtube/v3/search?q=${query}&part=snippet&key=${
            process.env.REACT_APP_YOUTUBE_API_KEY
        }&maxResults=${30}`;

        request("get",requestURL).then((res)=>{
          
            let listData = [];

            const data = res.items;

            for (let i = 0; i < data.length; i++) {
                const vodId = data[i].id.videoId;
                const title = data[i].snippet.title;
                const thumb = data[i].snippet.thumbnails.high.url;
                const channel = data[i].snippet.channelTitle;
                
                listData.push(
                    <ResultComponent
                        click={processVodId}
                        getTitle={setVodTitle}
                        key={vodId}
                        id={vodId}
                        imgUrl={thumb}
                        title={title}
                        uploader={channel}
                    />
                );
            }
            setSearchData(listData);
        })
    }

    return (
        <Frame>
            <Search>
                <SearchBox>
                    <Input
                        id="queryBox"
                        onChange={(e) => {
                            setQuery(e.target.value);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                getSearchData(query);
                            }
                        }}
                    />
                    <SearchIcon
                        onClick={() => {
                            getSearchData(query);
                        }}
                        cursor="pointer"
                    />
                </SearchBox>
                <ResultList data={searchData}/>
            </Search>
            <Video>
                <VodTitle>{vodTitle}</VodTitle>
                {vodId !== undefined ? (
                    <YoutubeFrame
                        videoId={vodId}
                        opts={{
                            width: "590",
                            height: "400",
                            playerVars: {
                                autoplay: 1,
                            },
                        }}
                    />
                ) : null}
            </Video>
        </Frame>
    );
}
export default Youtube;
