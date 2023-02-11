import React, { Component, useEffect, useRef } from "react";
import "./WelcomeCss.css";
// import {Typewriter} from 'typewriter-effect';
import { Typewriter, Cursor , useTypewriter} from 'react-simple-typewriter';
import { fontFamily, style } from "@mui/system";

const Welcome = () => {
    
    return(
            <div className="center">
                <div>Welcome to 
                    <span className="middle-blue-font">
                    <Typewriter
                        words={[' LEARNWAY',' RUNWAY']}
                        fontFamily = {"Raleway"}
                        loop
                        cursor
                        cursorStyle='|'
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    /></span><Cursor/>
                </div>
                <div>Fly over the <strong className="middle-blue-font"> RUNWAY </strong> with our <strong className="middle-blue-font"> LEARNWAY</strong>.</div>
     
            </div>
       
        );
}


export default Welcome;