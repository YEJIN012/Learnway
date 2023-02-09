import React, { useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
    width:inherit;
    height:inherit;
`;

function OpenViduVideoComponent({ streamManager, size }){
    const videoRef = React.useRef();

    useEffect(() => {
        if (videoRef && !!videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager, videoRef]);

    return <Video autoPlay={true} ref={videoRef} size={size}/>;
};

export default OpenViduVideoComponent;
