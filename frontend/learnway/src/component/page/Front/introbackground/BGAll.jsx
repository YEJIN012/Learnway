import React, { useEffect, useRef } from "react";
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
    // border: solid 1px black;
    position:absolute;
    top:0vw;
`;

function BGAll () {
    return (
        <Wrapper>
          <BGTopAnimation />
          <BGLeftAnimation />
          <BGAirPlane />
        </Wrapper>
      )
};

export default BGAll;