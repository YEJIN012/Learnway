import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

// import Button from '../../../ui/Button';
const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 5fr 6fr;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: -1px 2px 9px -1px #b5b5b5;
`;
const InnerFrame = styled.div`
  border: 1px solid;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  height: 80%;
`;

const TranslateBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
`;
const TextFrame = styled.textarea`
  width: 95%;
  height: 100%;
  border-radius: 5px;
  resize: none;
`;

const TranslateArea = styled.div`
  height: 80%;
  width: 95%;
  border: 1px solid;
  border-radius: 5px;
`;

function Translate() {
  const [value, setValue] = useState(""); // 검색 내용
  const [translatedContent, setTranslatedContent] = useState(""); // 번역 내용
  const languageCode = {}; ////// source target 언어 코드 매칭 dic 생성필요

  async function getTranslate(props) {
    console.log(props);
    try {
      const response = await axios.post(
        "papagoapi/v1/papago/n2mt",
        {
          ////// user정보를 바탕으로 언어코드 변경 필요
          source: "ko",
          target: "en",
          text: props,
        },
        {
          headers: {
            "X-Naver-Client-Id": `${process.env.REACT_APP_NAVER_ID}`,
            "X-Naver-Client-Secret": `${process.env.REACT_APP_NAVER_SECRET}`,
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
    if (e.key === "Enter") {
      getTranslate(value);
    }
  };

  return (
    <Frame>
      <InnerFrame>
        <h1>Translate</h1>
      </InnerFrame>
      <InnerFrame>
        <Form onSubmit={handleTranslate}>
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
        </Form>
      </InnerFrame>
      <InnerFrame>
        <TranslateArea>{translatedContent}</TranslateArea>
      </InnerFrame>
    </Frame>
  );
}

export default Translate;
