import { PersonPinSharp } from '@mui/icons-material';
import react,{useState} from 'react';
import styled from 'styled-components';

const Frame=styled.div`
width: inherit;
height: 5vw;
display: flex;

flex-direction: row;
margin: 0.5vw 0.5vw 0;
cursor: pointer;
align-items:center;
`;
const ImgFrame=styled.div`
    height: 8.4vh;
    background: yellow;
    overflow: hidden;
    border-radius:5px;
`;
const Snapshot = styled.img`
width: inherit;
height: 6vw;
margin: 0vw 0 0.5vw 0;
position:relative;
top:-2vh
`;

const DetailBox = styled.div`
width: 65%;
height: inherit;
display: flex;
flex-direction: column;
justify-content: center;
`;

const Title = styled.span`
font-size: 1.3vw;
font-weight: 700;
margin-left: 0.3vw;
`;
const Uploader = styled.div`

height: 4vh;
display: flex;
flex-direction: row;
align-items: center;
margin-left: 0.7vw;

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
width: 80%;
font-size: 1vw;
font-weight: 500;
color: #838383;
`;

function ResultComponent({...props}){



    return(
        <Frame onClick={()=>{props.click(props.id); props.getTitle(props.title)}}>
            <ImgFrame>
            <Snapshot src={props.imgUrl}></Snapshot>
            </ImgFrame>
            <DetailBox>
                <Title>{(props.title).substr(0, 11)+" ..."}</Title>
                <Uploader>
                    <UserName >{(props.uploader).substr(0,11)+" ..."}</UserName>
                </Uploader>
            </DetailBox>
        </Frame>
    );
} export default ResultComponent;