import react from 'react';
import styled from 'styled-components';

const Frame = styled.div`
width: inherit;
height: 5vw;
display: flex;

flex-direction: row;
margin: 0.5vw 0.5vw 0;
cursor: pointer;
align-items:center;
`;
const ImgFrame = styled.div`
    height: 8.4vh;
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
font-size: 0.8vw;
font-weight: 700;
margin-left: 0.3vw;
`;
const Uploader = styled.div`

height: 4vh;
display: flex;
flex-direction: row;
align-items: center;
margin-left: 0.4vw;

`;

const UserName = styled.span`
width: 80%;
font-size: 0.4vw;
font-weight: 500;
color: #838383;
`;

function ResultComponent({ ...props }) {
    return (
        <Frame onClick={() => { props.click(props.id); props.getTitle(props.title) }}>
            <ImgFrame>
                <Snapshot src={props.imgUrl}></Snapshot>
            </ImgFrame>
            <DetailBox>
                <Title>{(props.title)}</Title>
                <Uploader>
                    <UserName >{(props.uploader)}</UserName>
                </Uploader>
            </DetailBox>
        </Frame>
    );
} export default ResultComponent;