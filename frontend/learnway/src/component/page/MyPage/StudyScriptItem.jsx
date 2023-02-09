import React from "react";
import styled from "styled-components";

const Sentence = styled.div`
    
`

function StudyScriptItem({ script }) {
    const sentenceList = script.split("\n");
    return sentenceList.map((sentence, index) => (
        <Sentence key={index}>
            {sentence}
        </Sentence>
    ));
}
export default StudyScriptItem;
