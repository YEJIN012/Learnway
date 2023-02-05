import React from 'react';
import styled from 'styled-components';
import Chatlist from './Chatlist';
import Chatroom from './Chatroom'

const Frame=styled.div`
    width:20vw;
    height:30vw;

    border:solid 1px black;

`;
function TestPage(){
    return(
        <Frame>
            <Chatroom></Chatroom>
        </Frame>
    );
}export default TestPage;