import React from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGAirPlane from "./BGAirplane";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    z-index : -7;
    display: flex;
    background-size: cover;
    position:absolute;
    top:0vw;
`;

function BGAll (props) {
    return (
        <Wrapper>
          <BGTopAnimation />
          <BGLeftAnimation />
          {props.id === 1?(
            <BGAirPlane />
          ):(
            null
          )}
        </Wrapper>
      )
};

export default BGAll;