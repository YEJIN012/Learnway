import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGCenterAnimation from './BGCenterAnimation';

const Wrapper = styled.div`
    z-index : -1;
    width: 100vw;
    height: 100vh;
`;

function BGIntro () {
    return (
        <Wrapper>
          <BGTopAnimation />
          <BGCenterAnimation/>
          <BGLeftAnimation />
        </Wrapper>
      )
};

export default BGIntro;