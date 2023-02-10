import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGCenterAnimation from './BGCenterAnimation';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index : -1;
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