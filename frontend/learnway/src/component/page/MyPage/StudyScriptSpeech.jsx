import React, { useState } from "react";
import styled from "styled-components";
import HearingIcon from "@mui/icons-material/Hearing";
import { Pause } from "@mui/icons-material";
import { Icon } from "@mui/material";

const Sentence = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-bottom: 1vh;
    margin: 1vh;
    border-bottom: 1px solid #cccccc;
    font-size: 1.5vh;
    cursor: pointer;
`;

function StudyScriptSpeech(props) {
    const { selectedSent, sentence, handleSetSelectedSent, handlePlay, handlePause, isPlaying} = props;
    const [hover, setHover] = useState(false);
    
    return (
        <Sentence
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <div onClick={() => handleSetSelectedSent(sentence)}>
                {sentence}
            </div>
            
            {(selectedSent === sentence) | hover ? (
                <Icon>
                    {isPlaying ? (
                        <Pause onClick={handlePause} sx={{ scale: 0.8 }}>
                            Pause
                        </Pause>
                    ) : (
                        <HearingIcon onClick={handlePlay} sx={{ scale: 0.8 }}>
                            Play
                        </HearingIcon>
                    )}
                </Icon>
            ) : (
                <div></div>
            )}
        </Sentence>
    );
}
export default StudyScriptSpeech;
