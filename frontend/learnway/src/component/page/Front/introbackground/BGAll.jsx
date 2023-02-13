import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGAirPlane from "./BGAirplane";

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index : -1;
    display: flex;
    background-size: cover;
`;

function BGAll () {
    return (
        <Wrapper>
          <BGTopAnimation />
          <BGAirPlane />
          <BGLeftAnimation />
        </Wrapper>
      )
};

export default BGAll;