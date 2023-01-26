import React from "react";
import styled from "styled-components";

const Img = styled.img`
    width: 90px;
    height: 90px;
    ${(props) => 
        props.width &&
        `
        width: ${props.width}px;
        height: ${props.width}px;
        `
    }
    border-radius: 50%;
    
`

function ProfileImg(props) {
    const { src, width} = props
    return <Img src={src} width={width} />
    
}

export default ProfileImg