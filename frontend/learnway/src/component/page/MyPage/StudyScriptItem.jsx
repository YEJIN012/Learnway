import React, {useState} from "react";
import styled from "styled-components";
import StudyScriptSpeech from "./StudyScriptSpeech";

const Sentence = styled.div`
    
`

function StudyScriptItem({ script }) {
    const [selectedSent, setSelectedSent] = useState("")

    const sentenceList = script.split("\n");
    return sentenceList.map((sentence, index) => (
        <Sentence key={index} onClick={setSelectedSent(sentence)}>
            {sentence}
            <StudyScriptSpeech sentence={selectedSent}/>
        </Sentence>
    ));
}
export default StudyScriptItem;
