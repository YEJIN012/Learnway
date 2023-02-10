import React, { useEffect, useRef } from "react";
import './IntroButtonCss.css';
function IntroButton(){
    const aniBox = useRef();

    return(
        <div class="intro-button"><span>MEET UP</span></div>
    );
};

export default IntroButton;