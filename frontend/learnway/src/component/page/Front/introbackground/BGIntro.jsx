import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import BGTopAnimation from './BGTopAnimation';
import BGLeftAnimation from './BGLeftAnimation';
import BGCenterAnimation from './BGCenterAnimation';

const Wrapper = styled.div`
    z-index : -7;
    width: 100%;
    height: 100%;
    position:absolute;
    top:0vw;
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