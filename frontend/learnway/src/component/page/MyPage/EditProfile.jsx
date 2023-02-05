import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../ui/Button";
import CommonSelectLanguage from "../../ui/CommonSelectLanguage"
import Paper from "@mui/material/Paper";

const StyledTextInput = styled.input`
    height: 20px;
    font-size: 16px;
    margin: 10px;
`;
const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

function EditProfile() {
    const userInfo = useSelector((state) => state.AuthReducer);
    const [language, setLanguage] = useState(userInfo.language.name)
    console.log(language)

    return (
        <Paper
            elevation={3}
            children={
                <>
                    <CommonSelectLanguage language={language} setLanguage={setLanguage} height={"20px"} />
                    <StyledTextInput placeholder="username" />
                    <StyledTextInput placeholder="username" />
                    <BtnWrapper>
                        <Button id="5" fontSize={"1vw"} textValue={"Cancel"} width="7.079vw" radius={"5px"}></Button>
                        <Button id="4" fontSize={"1vw"} textValue={"Save"} width="7.079vw" radius={"5px"}></Button>
                    </BtnWrapper>
                </>
            }
            sx={{
                borderRadius: "35px",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                paddingX: "2vw",
                paddingY: "5vw"
            }}
            
        />
    );
}

export default EditProfile;
