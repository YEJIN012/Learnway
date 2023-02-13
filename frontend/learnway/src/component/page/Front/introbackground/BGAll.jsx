import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGAirPlane from "./BGAirplane";

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    z-index : -1;
    display: flex;
    background-size: cover;
    // border: solid 1px black;
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