import React, { useState, useRef } from "react";
import HearingIcon from "@mui/icons-material/Hearing";
// function StudyScriptSpeech(sentence) {
   
//         const writeFile = util.promisify(fs.writeFile);
//         await writeFile(outputFile, response.audioContent, "binary");
//         console.log(`Audio content written to file: ${outputFile}`);
//     }

function StudyScriptSpeech(sentence) {
    const [base64EncodedAudio, setbase64EncodedAudio] = useState("")

      // tts api 실행 함수
      async function getSpeech(sentence) {
        const textToSpeech = require("@google-cloud/text-to-speech");
        // const fs = require("fs");
        // const util = require("util");

        const client = new textToSpeech.TextToSpeechClient();

        /**
         * TODO(developer): Uncomment the following lines before running the sample.
         */
        // const text = 'Text to synthesize, eg. hello';
        // const outputFile = 'Local path to save audio file to, e.g. output.mp3';

        const request = {
            input: { text: sentence },
            voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
            audioConfig: { audioEncoding: "MP3" },
        };
        const [response] = await client.synthesizeSpeech(request);
        setbase64EncodedAudio(response)
      }

      // AudioPlay handler
        const [isPlaying, setIsPlaying] = useState(false);
        const audioRef = useRef(null);

        const handlePlay = () => {
            audioRef.current.play();
            if(!base64EncodedAudio) {
              getSpeech(sentence)   
            } else {
              setIsPlaying(true);
            }
        };
        const handlePause = () => {
            audioRef.current.pause();
            setIsPlaying(false);
        };
        // const handleEnded = () => {
        //   setIsPlaying(false);
        // };
      



        return (
          <>
            <audio
              ref={audioRef}
              // onEnded={handleEnded}
              src={`data:audio/mpeg;base64,${base64EncodedAudio}`}
            />
            {isPlaying ? (
              <HearingIcon onClick={handlePause}>Pause</HearingIcon>
            ) : (
              <HearingIcon onClick={handlePlay}>Play</HearingIcon>
            )}
          </>
        );
      };

export default StudyScriptSpeech;
