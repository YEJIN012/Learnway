import React, { useState, useRef } from "react";
import styled from "styled-components";
import HearingIcon from "@mui/icons-material/Hearing";
import { Pause } from "@mui/icons-material";
import axios from "axios";
import StudyScriptSpeech from "./StudyScriptSpeech";

const Sentence = styled.div`
padding-bottom: 1vh;
margin: 1vh;
border-bottom: 1px solid #cccccc;
font-size: 1.5vh;
cursor:pointer;
`
// GOOGLE KEY 인증 및 tts api 실행 함수
var gapi = require("gapi");
function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/cloud-platform"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey(`${process.env.REACT_APP_GOOGLE_KEY}`);
    return gapi.client.load("googleapi/$discovery/rest?version=v1")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
  // Make sure the client is loaded and sign-in is complete before calling this method.
  function getSpeech(props) {
    return gapi.client.texttospeech.text
        .synthesize({
            resource: {
                input: {
                    text: `${props}`,
                },
                voice: {
                    languageCode: "ko-KR",
                    name: "ko-KR-Wavenet-A",
                    ssmlGender: "FEMALE",
                },
                audioConfig: {
                    audioEncoding: "MP3",
                },
            },
        })
        .then(
            function (response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
            },
            function (err) {
                console.error("Execute error", err);
            }
        );
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
// async function getSpeech(sentence) {

//     try {
//         const response = await axios.post(
//             "googleapi/v1/text:synthesize?key=9f3f4a40a8164a68e24d1eafde13cddb517cbd16",
//             {
//                 "input": {
//                     "text" : sentence,
//                 },
//                 "voice": {
//                     "languageCode": "en-gb",
//                     "name": "en-GB-Standard-A",
//                     "ssmlGender": "FEMALE",
//                 },
//                 "audioConfig": {
//                     "audioEncoding" : "MP3",
//                 },
//             }
//         );
//         // handle success
//         console.log(response);
//         console.log("getSpeech");
//         return response.audioContent;
//     } catch (error) {
//         // handle error
//         console.log(error);
//     }
// }



function StudyScriptItem({ script }) {

    const [selectedSent, setSelectedSent] = useState("");
    function handleSetSelectedSent(props) {
        setSelectedSent(props);
    }

    const sentenceList = script.split("./");

    const [base64EncodedAudio, setBase64EncodedAudio] = useState("");

    // AudioPlay handler
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    function handlePlay() {
        console.log("play");
        if (!base64EncodedAudio) {
            setBase64EncodedAudio(getSpeech(selectedSent));
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    }
    function handlePause() {
        console.log("pause");
        audioRef.current.pause();
        setIsPlaying(false);
    }
    // const handleEnded = () => {
    //   setIsPlaying(false);
    // };

    return sentenceList.map((sentence, index) => (
        <>
            {/* <audio
                ref={audioRef}
                // onEnded={handleEnded}
                src={`data:audio/mpeg;base64,${base64EncodedAudio}`}
            /> */}
            <Sentence
                key={index}
                onClick={() => handleSetSelectedSent(sentence)}
                sentence={selectedSent}
            >
                {sentence}

                {/* {isPlaying ? (
                    <Pause onClick={handlePause} sx={{ scale: 0.8 }}>
                        Pause
                    </Pause>
                ) : (
                    <HearingIcon onClick={handlePlay} sx={{ scale: 0.8 }}>
                        Play
                    </HearingIcon>
                )} */}
            </Sentence>
        </>
    ));
}
export default StudyScriptItem;
