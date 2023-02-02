import React from "react";
import styled from "styled-components";
import ResultList from './ResultList'
import SearchBtnImg from '../../ui/searchBtn.png';

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
function Translate(){
    return(
        <Frame>
            <Search>
                <SearchBox>
                    <Input></Input>
                    <Searchbtn url={SearchBtnImg} ></Searchbtn>
                </SearchBox>
                <ResultList></ResultList>
            </Search>
            <Video></Video>
        </Frame>
    );
};
export default Translate;
