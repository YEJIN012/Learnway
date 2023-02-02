import React,{useState, useEffect} from "react";
import styled from "styled-components";
import axios from "axios";
import ResultComponent from './ResultComponent';

import ResultList from './ResultList'
import SearchBtnImg from '../../ui/searchBtn.png';
axios.defaults.headers['Access-Control-Allow-Credentials']=true;
axios.defaults.headers['Access-Control-Allow-Origin']='*';
axios.defaults.withCredentials = true;
const Frame = styled.div`
    width:60vw;
    height:45vw;
    display:flex;
    flex-direction:row;
    border: solid 1px black;
`;

const Search = styled.div`
    width:25vw;
    display:flex;
    flex-direction:column;
    align-items:center;
    border: solid 1px black;
`;

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
const Video = styled.div`
    width:35vw;

    border: solid 1px black;
`;
function Youtube(){
    const [searchData, setSearchData] = useState([]);
    const [query, setQuery] = useState("");

    async function getSearchData(query){
        console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
        let listData = []
        await axios.get(`/youtubeapi/youtube/v3/search?q=${query}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=${9}`
        ).then(function(res){
            const data = res.data.items;
            console.log(data.length);
            for(let i = 0; i < data.length; i++){
                const vodId = data[i].id.videoid;
                const title = data[i].snippet.title;
                const thumb = data[i].snippet.thumbnails.high.url;
                const channel = data[i].snippet.channelTitle;
                
                listData.push(<ResultComponent key={vodId} imgUrl={thumb} title={title} uploader={channel}></ResultComponent>)
            }
            setSearchData(listData);
        }).catch(function(err){
            console.log(err)
        });
    }

    useEffect(() => { getSearchData() }, []);
   
    return(
        <Frame>
            <Search>
                <SearchBox>
                    <Input id="queryBox" onChange={(e) => { setQuery(e.target.value) }}></Input>
                    <Searchbtn url={SearchBtnImg} onClick={()=>{getSearchData(query)}} ></Searchbtn>
                </SearchBox>
                <ResultList data={searchData}></ResultList>
            </Search>
            <Video></Video>
        </Frame>
    );
};
export default Youtube;
