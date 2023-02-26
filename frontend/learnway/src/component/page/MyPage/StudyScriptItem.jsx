import React, { useState } from "react";
import StudyScriptSpeech from "./StudyScriptSpeech";

function StudyScriptItem({ script }) {
    const sentenceList = script.split("./");
    const [selectedSent, setSelectedSent] = useState("");

    function handleSetSelectedSent(props) {
        setSelectedSent(props);
    }

    return sentenceList.map((sentence, index) => (
        <StudyScriptSpeech
            key={index}
            selectedSent={selectedSent}
            sentence={sentence}
            handleSetSelectedSent={handleSetSelectedSent}
        />
    ));
}
export default StudyScriptItem;
