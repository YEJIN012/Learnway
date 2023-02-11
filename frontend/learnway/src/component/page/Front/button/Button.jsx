import React, { useEffect, useRef } from "react";
import './IntroButtonCss.css';

function Button({length}){

    return(
        <div>
        <div className="button button--nina button--round-l button--text-thick button--inverted" data-text="MEET UP 🔍">
            <span>M</span><span>E</span><span>E</span><span>T</span> <span>U</span><span>P</span> <span>🔍</span>
		</div>
        </div>
    );

};

export default Button;