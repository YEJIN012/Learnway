import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import StudyScriptSpeech from "./StudyScriptSpeech";

function StudyScriptItem({ script }) {
    const sentenceList = script.split("./");

    const langCode = {
        ko: "ko-KR", //korea
        ja: "ja-JP", //japanese
        "zh-CN": "cmn-Hans-CN", //chinese
        en: "es-US", //english
        es: "es-ES", //spanish
        fr: "fr-FR", //franch
        de: "de-DE", //german
        vi: "vi-VN", //vietnamese
        id: "id-ID", //indonesian
        th: "th-TH", //thai
        ru: "ru-RU", //russian
        it: "it-IT", //italian
    };

    const [selectedSent, setSelectedSent] = useState("");
    function handleSetSelectedSent(props) {
        setSelectedSent(props);
    }
    console.log(selectedSent);

    const [blob, setBlob] = useState("");

    // 발음 듣기 함수
    async function getSpeech(props) {
        // 1. Papago 언어감지 api axios
        try {
            const response = await axios.post(
                "papagoapi/v1/papago/detectLangs",
                {
                    query: `${props}`,
                },
                {
                    headers: {
                        "X-Naver-Client-Id": `${process.env.REACT_APP_NAVER_ID2}`,
                        "X-Naver-Client-Secret": `${process.env.REACT_APP_NAVER_SECRET2}`,
                    },
                }
            );
            console.log(response.data);

            // papago langcode -> google langcode
            const lang = langCode[response.data.langCode];
            console.log(lang)
            // 2. google TTS api axios
            try {
                const response = await axios.post(
                    `googleapi/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_KEY}`,
                    {
                        input: {
                            text: `${props}`,
                        },
                        voice: {
                            languageCode: `${lang}`,
                            name: `${lang}-Standard-A`,
                            // name: `${lang}-Wavenet-A`,
                        },
                        audioConfig: {
                            audioEncoding: "MP3",
                        },
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                console.log(response.data);

                // 3. decode the base64 encoded string to a Uint8Array
                const binary = atob(response.data.audioContent);
                const byteArray = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    byteArray[i] = binary.charCodeAt(i);
                }
                const tmp = new Blob([byteArray], { type: "audio/mp3" });
                setBlob(URL.createObjectURL(tmp));
            } catch (error) {
                console.error(`tts error : ${error}`);
                setBlob("");
            }
        } catch (error) {
            console.log(`detectLangs error : ${error}`);
        }
    }

    useEffect(() => {
        getSpeech(selectedSent);
    }, [selectedSent]);

    // AudioPlay handler
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    function handlePlay() {
        console.log("play");
        audioRef.current.play();
        setIsPlaying(true);
    }
    function handlePause() {
        console.log("pause");
        audioRef.current.pause();
        setIsPlaying(false);
    }
    const handleEnded = () => {
        setIsPlaying(false);
    };
    ///

    return sentenceList.map((sentence, index) => (
        <>
            <StudyScriptSpeech
                key={index}
                selectedSent={selectedSent}
                sentence={sentence}
                handleSetSelectedSent={handleSetSelectedSent}
                isPlaying={isPlaying}
                handleEnded={handleEnded}
                handlePlay={handlePlay}
                handlePause={handlePause}
            />
            <audio ref={audioRef} onEnded={handleEnded} src={blob} />
        </>
    ));
}
export default StudyScriptItem;
