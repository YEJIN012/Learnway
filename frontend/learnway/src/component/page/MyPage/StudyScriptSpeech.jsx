import React, { useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { Pause, PlayArrow } from "@mui/icons-material";

const SentenceFrame = styled.div`
    display: grid;
    grid-template-columns: 7fr 1fr;
    padding-bottom: 0.5vh;
    padding-top: 0.5vh;
    padding-left: 1vw;
    border-bottom: 1px solid #cccccc;
    font-size: 1.5vh;
    &:hover {
        background: #e9e9e9;
        font-weight: 600;
    }
`;
const SubFrame1 = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const SubFrame2 = styled.div`
    display: flex;
    align-items: center;
`;

function StudyScriptSpeech(props) {
    const { selectedSent, sentence, handleSetSelectedSent } = props;

    const [blob, setBlob] = useState("");

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

            // papago langcode -> google langcode
            const lang = langCode[response.data.langCode];

            // 2. google TTS api axios
            try {
                const response = await axios.post(
                    `/googleapi/v1/text:synthesize?key=${process.env.REACT_APP_GOOGLE_KEY}`,
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

                // 3. decode the base64 encoded string to a Uint8Array
                const binary = atob(response.data.audioContent);
                const byteArray = new Uint8Array(binary.length);
                for (let i = 0; i < binary.length; i++) {
                    byteArray[i] = binary.charCodeAt(i);
                }
                const tmp = new Blob([byteArray], { type: "audio/mp3" });
                setBlob(URL.createObjectURL(tmp));
            } catch (error) {
                // console.error(`tts error : ${error}`);
                setBlob("");
            }
        } catch (error) {
            // console.log(`detectLangs error : ${error}`);
        }
    }

    // AudioPlay handler 함수
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    function handlePlay() {
        audioRef.current.play();
        setIsPlaying(true);
    }
    function handlePause() {
        audioRef.current.pause();
        setIsPlaying(false);
    }
    const handleEnded = () => {
        setIsPlaying(false);
    };

    function clicked(props) {
        handleSetSelectedSent(props);
        getSpeech(sentence);
    }

    return (
        <SentenceFrame>
            <SubFrame1 onClick={() => clicked(sentence)}>{sentence}</SubFrame1>

            <audio ref={audioRef} onEnded={handleEnded} src={blob} />
            {(selectedSent === sentence) && blob ? (
                <SubFrame2>
                    {isPlaying ? (
                        <Pause
                            onClick={handlePause}
                            sx={{ scale: 0.7 }}
                            cursor="pointer"
                        >
                            Pause
                        </Pause>
                    ) : (
                        <PlayArrow
                            onClick={handlePlay}
                            sx={{ scale: 0.7 }}
                            cursor="pointer"
                        >
                            Play
                        </PlayArrow>
                    )}
                </SubFrame2>
            ) : (
                <div></div>
            )}
        </SentenceFrame>
    );
}
export default StudyScriptSpeech;
