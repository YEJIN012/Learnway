import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

const UserVideoComponent = ({ streamManager, size }) => {
    const getNicknameTag = (obj) => {
        console.log(obj)
        return JSON.parse(obj.stream.connection.data).clientData;
    }
    
    return (
        <div>
            {streamManager !== undefined ? (
                <div className="streamcomponent">
                    <OpenViduVideoComponent streamManager={streamManager} size={size}/>
                    <div><p>{getNicknameTag(streamManager)}</p></div>
                </div>
            ) : null}
        </div>
    );
};

export default UserVideoComponent;