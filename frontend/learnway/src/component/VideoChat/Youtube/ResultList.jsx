import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import axios from 'axios';
import ResultComponent from './ResultComponent';

export default function PinnedSubheaderList(props) {
    
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
            {props.data}

        </li> 
    </List>
  );
}