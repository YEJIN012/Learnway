import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import { Fab } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

// import Button from '../../../ui/Button';
const Frame = styled.div`
    margin: 10vw
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr
    top: 20vw;
`;
const InnerFrame = styled.div`
    border: 1px solid;
`;
const TranslateBtn = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
`;
const TextFrame = styled.textarea`
    radius: 5px;
`;

const languageCode = {

}

function Translate() {
    const [value, setValue] = useState("");
    const [translatedContent, setTranslatedContent] = useState("");

    async function getTranslate(props) {
        console.log(props)
        try {
            const response = await axios.post(
                "papagoapi/v1/papago/n2mt",
                {
                    source: "ko",
                    target: "en",
                    text: props,
                },
                {
                    headers: {
                        "X-Naver-Client-Id": "6I2yVts_Y4w2l3KgivdN",
                        "X-Naver-Client-Secret": "KyR4gJtOdH",
                        // "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            // handle success
            console.log(response.data.message.result.translatedText);
            setTranslatedContent(response.data.message.result.translatedText);
            console.log("getTranslate");
        } catch (error) {
            // handle error
            console.log(error);
        }
    }

    const handleTranslate = (e) => {
        e.preventDefault();
        console.log(value);
        getTranslate(value);
        console.log("handler");
    };

    const onCheckEnter = (e) => {
        if(e.key === 'Enter') {
          getTranslate(value)
        }
    };

    return (
        <CommonFrame
            header={<Title title={"Translate"}></Title>}
            body={
                <Frame>
                    <InnerFrame>
                        <form onSubmit={handleTranslate}>
                            <TextFrame
                                value={value}
                                onChange={(e) => {
                                    setValue(e.target.value);
                                }}
                                placeholder="Enter the content to translate."
                                // onKeyPress={onCheckEnter}
                            ></TextFrame>
                            <TranslateBtn>
                                <button type="submit">translate</button>
                            </TranslateBtn>
                        </form>
                    </InnerFrame>
                    <InnerFrame>{translatedContent}</InnerFrame>
                    
                </Frame>
            }
        ></CommonFrame>
    );
}

export default Translate;
