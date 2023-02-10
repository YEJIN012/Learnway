import React, { useEffect, useRef } from "react";
import './IntroButtonCss.css';
function IntroButton(){
    const aniBox = useRef();

    return(
        <div><span class="intro-button"><span>MEET UP</span><span class = "imogi" role="img" aria-label="writing hand">  🔍</span></span></div>
    );
};

export default IntroButton;