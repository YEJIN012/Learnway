import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import CommonSelectLanguage from "../../ui/CommonSelectLanguage"
import Paper from "@mui/material/Paper";
import { display, flexbox, padding } from "@mui/system";

const StyledTextInput = styled.input`
    width: 100%;
    height: 20px;
    font-size: 16px;
    margin: 10px;
`;
const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

function EditProfile() {
    const [language, setLanguage] = useState("KOREAN")  // 초기값 userInfo.languageId로 수정
    console.log(language)


    return (
        <Paper
            elevation={3}
            children={
                <>
                    <CommonSelectLanguage language={language} setLanguage={setLanguage} width={"100%"} height={"20px"} />
                    <StyledTextInput placeholder="username" />
                    <StyledTextInput placeholder="username" />
                    <BtnWrapper>
                        <Button id="5" fontSize={"1vw"} textValue={"Cancel"} width="7.079vw" radius={"5px"}></Button>
                        <Button id="4" fontSize={"1vw"} textValue={"Save"} width="7.079vw" radius={"5px"}></Button>
                    </BtnWrapper>
                </>
            }
        sx={{ borderRadius: "35px", width: "30vw", height: "50vh", display:"flex", flexDirection:"column",boxSizing:"border-box", paddingX:"2vw", paddingY:"5vw"}}
            
        />
    );
}

export default EditProfile;
