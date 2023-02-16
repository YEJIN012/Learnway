import React, { useEffect } from 'react';
import styled,{css} from 'styled-components';
import { delay, motion } from "framer-motion";

const Video = styled.video`
${props=> props.pubsub === 'pub'
}
    width:inherit;
    height:inherit;
`;

const LargeVodFrame = styled(motion.video)`
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

const SmallVodFrame = styled(motion.video)`
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
        {pubsub === 'small'?(
            <SmallVodFrame 
            layout
            autoPlay={true} ref={videoRef} fixSizeId={size} 
            />

        ):(
            <LargeVodFrame 
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.1,
              ease: [0, 0.71, 0.2, 1.01]
            }}
            autoPlay={true} ref={videoRef} fixSizeId={size} 
            />
        )}
        </>)
};

export default OpenViduVideoComponent;
