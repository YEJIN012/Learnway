import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
// import Button from '../../../ui/Button';
const Frame = styled.div`
    display: grid;
    grid-template-columns: auto 100px 1fr 2fr
    position: absolute;
    top: 20vw;
`;
const InnerFrame = styled.div`

    border: 1px solid;
`;
const TextFrame = styled.textarea`
    radius: 5px;

`

function Translate() {
    const [value, setValue] = useState("");
    const [translatedContent, setTranslatedContent] = useState("");

    async function getTranslate(props) {
        const {content} = props
        try {console.log(content)
            const response = await axios.post(
                "https://openapi.naver.com/v1/papago/n2mt",
                {
                    source: "ko",
                    target: "en",
                    text: content,
                },
                {
                    headers: {
                        "X-Naver-Client-Id": "6I2yVts_Y4w2l3KgivdN",
                        "X-Naver-Client-Secret": "KyR4gJtOdH",
                        "Access-Control-Allow-Origin": "*",
                    },
                }
            );
            // handle success
            console.log(response.data);
            setTranslatedContent(response.data);
            console.log("getTranslate");
        } catch (error) {
            // handle error
            console.log(error);
        }
    }

    const handleTranslate = (e) => {
        e.preventDefault();
        console.log(value)
        getTranslate(value);
        console.log("handler");
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
                            >
                            </TextFrame>
                            <input type="submit" value="Translate" />
                        </form>
                    </InnerFrame>
                    <InnerFrame>
                        {translatedContent}
                    </InnerFrame>
                </Frame>
            }
        ></CommonFrame>
    );
}

export default Translate;
