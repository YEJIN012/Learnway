import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import axios from 'axios';
import ResultComponent from './ResultComponent';
axios.defaults.headers['Access-Control-Allow-Origin'] = '*';

export default function PinnedSubheaderList() {
    const [searchData, setSearchData] = useState([]);
    function getSearchData(){
        console.log(process.env.REACT_APP_YOUTUBE_API_KEY)
        axios.get(`https://www.googleapis.com/youtube/v3/search?q=${'cocoa'}&part=snippet&key=${process.env.REACT_APP_YOUTUBE_API_KEY}&maxResults=${9}`
        ).then(function(res){
            const data = res.data.item;
            
            for(let i = 0; i < data.length; i++){
                const vodId = data[i].id.videoid;
                const title = data[i].snippet.title;
                const thumb = data[i].snippet.thumbnails.high.url;
                const channel = data[i].snippet.channelTitle;

                setSearchData([...searchData, <ResultComponent imgUrl={thumb} title={title} uploader={channel}></ResultComponent>]);
            }
        }).catch(function(err){
            alert("Youtube 검색결과 가져오기 실패");
        });
    }

    useEffect(() => { getSearchData() }, []);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: '40vw',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: '39vw',
        '& ul': { padding: 0 },
      }}
      
    >
        <li>
            {searchData}

        </li> 
    </List>
  );
}