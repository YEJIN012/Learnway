import React from "react";
import styled from "styled-components";

const Img = styled.img`
    width: ${(props) => 
        props.width || '90px'};
    height: ${(props) => 
        props.width || '90px'};
    border-radius: 50%;
`

function ProfileImg(props) {
    const { src, width} = props
    return <Img src={src} width={width} />
    
}

export default ProfileImg