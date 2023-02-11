import { PersonPinSharp } from '@mui/icons-material';
import react,{useState} from 'react';
import styled from 'styled-components';

const Frame=styled.div`
    width:inherit;
    height:7vw;
    display:flex;
    flex-direction:row;
    margin:2vw 0 2vw 0;
    border:1px solid black;
    cursor:pointer;
`;

const Snapshot = styled.div`
    width:35%;
    height:inherit;
    background-image: url(${props => props.url || ""});
    background-size:cover;
    border:1px solid black;
`;

const DetailBox = styled.div`
    width:65%;
    height:inherit;
    display:flex;
    flex-direction:column;
    border:1px solid black;
`;

const Title = styled.span`
    font-size:2vw;
    font-weight:700;
    margin-left:0.5vw;
`;
const Uploader = styled.div`
    width:100%;
    height:inherit;
    display:flex;
    flex-direction:row;
    align-items:center;
    
    border:1px solid black;
`;

const ProfileImg = styled.div`
width: 4vw;
height: 3.3vw;
border-radius: 100px;
margin: 0.3vw 1vw 0.3vw 0.3vw;
background-image: url(${props => props.url || ""});
background-size:cover;
border: 1px solid black;

`;
const UserName = styled.span`
    width:80%;
    font-size:1.6vw;
    font-weight:600;
`;

function ResultComponent({...props}){



    return(
        <Frame onClick={()=>{props.click(props.id)}}>
            <Snapshot url={props.imgUrl}></Snapshot>
            <DetailBox>
                <Title>{(props.title).substr(0, 10)+" ..."}</Title>
                <Uploader>
                    <UserName >{(props.uploader).substr(0,10)+" ..."}</UserName>
                </Uploader>
            </DetailBox>
        </Frame>
    );
} export default ResultComponent;