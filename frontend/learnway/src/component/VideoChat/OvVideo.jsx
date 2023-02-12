import React, { useEffect } from 'react';
import styled,{css} from 'styled-components';

const Video = styled.video`
${props=> props.pubsub === 'pub'
}
    width:inherit;
    height:inherit;
`;

const MyVideoFrame = styled.video`
${props=> props.fixSizeId === 9 && css`
width:max-content;
height: auto;

`};
${props=> props.fixSizeId === 4 && css`
width:30vw;
height:auto;
margin:1vw 2vw 1vw 1vw;
`}
${props=>(props.fixSizeId >= 0 && props.fixSizeId <= 3)&& css`
width:40vw;
height:auto;
margin:1vw 1vw 1vw 1vw;
`}
border-radius:10px;
background:none;
box-shadow:2px 3px 9px -1px #222222;


`;

const OppoVideoFrame = styled.video`
${props=> props.fixSizeId === 9 && css`
position:fixed;
z-index:1;
top:3vw;
left:10vw;
width:20vw;
height:auto;

`}
${props=> props.fixSizeId === 4 && css`
position:unset;
width:30vw;
height:auto;
margin:1vw 2vw 1vw 1vw;
`}
${props=>(props.fixSizeId >= 0 && props.fixSizeId <= 3)&& css`
position:unset;
width:40vw;
height:auto;
margin:1vw 1vw 1vw 1vw;
`}
border-radius:10px;
background:none;
box-shadow:2px 3px 9px -1px #222222;

`


function OpenViduVideoComponent({ streamManager, size , pubsub}){
    const videoRef = React.useRef();
    //const [punsub, setPubsub] = useState(pubsub);

    useEffect(() => {
        if (videoRef && !!videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager, videoRef]);

    return (
        <>
        {pubsub === 'pub'?(
            <MyVideoFrame autoPlay={true} ref={videoRef} fixSizeId={size} />

        ):(
            <OppoVideoFrame autoPlay={true} ref={videoRef} fixSizeId={size} />
        )}
        </>)
};

export default OpenViduVideoComponent;
