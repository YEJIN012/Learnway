import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './externalCss/UserVideo.css';

const UserVideoComponent = ({ streamManager, size }) => {
    
    return (
        <div>
            {streamManager !== undefined ? (
                
                    <OpenViduVideoComponent streamManager={streamManager} size={size}/>
            ) : null}
        </div>
    );
};

export default UserVideoComponent;