import React, { useEffect } from 'react';
import styled from 'styled-components';

const Video = styled.video`
    width: ${props => props.size.width || "90vw"};
    height: ${props => props.size.height || "90vh"};
    float: left;
    cursor: pointer;
`;

function OpenViduVideoComponent({ streamManager, size }){
    const videoRef = React.useRef();

    useEffect(() => {
        if (videoRef && !!videoRef.current) {
            streamManager.addVideoElement(videoRef.current);
        }
    }, [streamManager, videoRef]);

    return <Video autoPlay={true} ref={videoRef} size={size} />;
};

export default OpenViduVideoComponent;
