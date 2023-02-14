import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import Button from "../../ui/Button"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { useSelector } from "react-redux";
import { width } from "@mui/system";
axios.defaults.headers["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows:  0.3fr 3fr 0.3fr 3fr;
  padding-left: 5%;
  padding-right: 5%;
  
`;
const InnerFrame = styled.div`
  // border: 1px solid;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  height: 80%;

`;
const TextFrame = styled.textarea`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 18px;
`;

const TranslateArea = styled.textarea`
  height: 80%;
  width: 100%;
  border-radius: 5px;
  resize: none;
  font-size: 18px;
`;

const ButtonFrame = styled.div`
  display: flex;
  flex-direction: row-reverse;
`
function Translate() {
  const myInfo = useSelector((state) => state.AuthReducer)
  console.log(myInfo)
  const oppoInfo = useSelector((state) => state.OpponentReducer)
  console.log(oppoInfo)
  const [value, setValue] = useState(""); // 검색 내용
  const [translatedContent, setTranslatedContent] = useState(""); // 번역 내용
  const [seletlang, setSelectlang] = useState("")  
  const [resultLang, setResultLang] = useState("")


  useEffect(() => {
    if (seletlang) {
      setResultLang(seletlang=== myInfo.language.code ? oppoInfo.language.name : myInfo.language.name)
    }  
  }, [seletlang])
  

  async function getTranslate(props) {
    console.log(props);
    try {
      const response = await axios.post(
        "papagoapi/v1/papago/n2mt",
        {
          ////// user정보를 바탕으로 언어코드 변경 필요
          source: seletlang === myInfo.language.code ? myInfo.language.code : oppoInfo.language.code,
          target: seletlang === myInfo.language.code ? oppoInfo.language.code : myInfo.language.code,
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

  const handleChangeSelect = (e) => {
    setSelectlang(e.target.value);
  };

  const handleChangeText = (e) => {
      setValue(e.target.value);
  }

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      getTranslate(value);
    }
  };

  return (
    <CommonFrame
      header = {<Title title={"Translate"}></Title>}
      body={
        <Frame>
          <InnerFrame>
          {/* <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seletlang}
          label="Age"
          onChange={handleChangeSelect}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select> */}
        <FormControl sx={{margin:"10px 2px 6px 0px", width:"30%"}}>

          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          value={seletlang}
          onChange={handleChangeSelect}
          displayEmpty
          label="Language"
          sx={{color:"#91a8d0"}}
          // inputProps={{ 'aria-label': 'Without label' }}
          > 
          <MenuItem value={myInfo.language.code}>{myInfo.language.name}</MenuItem>
          <MenuItem value={oppoInfo.language.code}>{oppoInfo.language.name}</MenuItem>
        </Select>
          </FormControl>
            {/* <h3>{"한국어"}</h3> */}
          </InnerFrame>
          <InnerFrame>
            <Form onSubmit={handleTranslate}>
              <TextFrame
                  value={value}
                  onChange={handleChangeText}
                  placeholder="Enter the content to translate."
                  // onKeyPress={onCheckEnter}
              ></TextFrame>
              <ButtonFrame>
                <Button type="submit" margin={"10px 0px"} id ="4" radius={"5px"} width={"inherit"} height={"3vw"} fontSize={"1.5vw"} textValue="translate"></Button>
              </ButtonFrame>
            </Form>
          </InnerFrame >
          <InnerFrame>
            <h3>{resultLang}</h3>
          </InnerFrame>
          <InnerFrame>
              <TranslateArea disabled>{translatedContent}</TranslateArea>
          </InnerFrame>
      </Frame>  
    }/>
  );
}

export default Translate;
