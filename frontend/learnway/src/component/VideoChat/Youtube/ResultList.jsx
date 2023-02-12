import React, {useState, useEffect} from 'react';

import axios from 'axios';
import ResultComponent from './ResultComponent';
import styled from 'styled-components'
const Frame=styled.div`
  width:24vw;
  height:78vh;
  overflow-y:scroll;
  -ms-overflow-style: none; 
  &::-webkit-scrollbar { 
    display: none;
  }
`;

const List=styled.li`
  list-style:none;
`;
function PinnedSubheaderList(props) {
    
  return (
    <Frame>
        <List>
            {props.data}

        </List> 
    
  </Frame>
  );
}export default PinnedSubheaderList;