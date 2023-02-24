import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Button from "../../ui/Button";
import CommonSelectLanguage from "../../ui/CommonSelectLanguage";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InputBox from "../Front/Input";
import Interest from "../Front/SignupPage/Interest";
import { Settings } from "@mui/icons-material";
import { request } from "../../page/Front/utils/axios";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "35px",
    p: 4,
};

const RowWrapper = styled.div`
    display: flex;
    align-items: end;
`;

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: end;
`;

function EditProfile() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.AuthReducer);
    const languageBox = useSelector((state) => state.UserInfoReducer);
    const [username, setUsername] = useState(userInfo.name);
    const [language, setLanguage] = useState(userInfo.language.name);
    const [bio, setBio] = useState(userInfo.bio);
    const [interests, setInterests] = useState(userInfo.interests);

    const { t } = useTranslation();

    // Interest Modal Handler
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    // ChangeInterestComp 완료시 setInterest 호출하는 함수
    function ChangeInterest(props) {
        setInterests(props);
    }

    // cancel 클릭시 호출되는 form reset함수
    function handleResetForm(e) {
        e.preventDefault();
        setUsername(userInfo.name);
        setInterests(userInfo.interests);
        setLanguage(userInfo.language.name);
        setBio(userInfo.bio);
    }

    function interestRernderer(array) {
        let result = "";
        if (array) {
            for (let i = 0; i < array.length; i++) {
                result += "#" + t(array[i].field) + "  ";
            }
        }
        return result;
    }

    // save 클릭시 호출되는 form 제출함수(userDto 편집)
    function handleSubmit(e) {
        e.preventDefault();

        function makeLanguageData() {
            console.log(languageBox);
            for (let i = 0; i < languageBox.language.length; i++) {
                if (languageBox.language[i].name === language) {
                    console.log(languageBox.language[i]);
                    return languageBox.language[i];
                }
            }
        }
        console.log(username);
        if (username !== userInfo.name) {
            request("get", `/users/dupName?name=${username}`).then((res) => {
                console.log(res);
                if (res.msg === "사용중인 닉네임입니다. ") {
                    alert(t("This is a duplicate name."));
                }
                return;
            });
        }

        // Make FormData
        const formData = new FormData();
        const data = {
            // 편집 가능 정보
            language: makeLanguageData(),
            bio: bio,
            name: username,
            interests: interests,
            // 고정 정보
            imgUrl: "",
            userEmail: userInfo.userEmail,
            birthDay: userInfo.birthDay,
            badUser: userInfo.badUser,
            providerId: userInfo.providerId,
            provider: userInfo.provider,
            userId: userInfo.userId,
            userPwd: "",
        };
        console.log(data);
        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json",
        });
        formData.append("image", "");
        formData.append("userDto", blob);

        axios
            .put("api/users/modify", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(function (res) {
                console.log(res.data);
                alert(t("Successfully edited profile Info"));
                // 회원정보 수정 api 완료시, redux userInfo state 갱신.
                dispatch({ type: "UPDATE_USER", payload: res.data.user });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Paper
            elevation={3}
            children={
                <>
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-evenly",
                        }}
                    >
                        <InputBox
                            id="username"
                            type="text"
                            title={t("User Name(ENG)")}
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            titleFontSize="1.8vh"
                            titleHeight="2.5vh"
                            titleWidth="20vw"
                            inputWidth="17vw"
                            inputHeight="4.8vh"
                            margin="0px"
                            border="solid 0.6px black"
                        ></InputBox>
                        <RowWrapper>
                            <InputBox
                                id="interests"
                                type="text"
                                title={t("Interests")}
                                value={interestRernderer(interests)}
                                disabled="disabled"
                                backgroundColor="#dbdbdb"
                                titleFontSize="1.8vh"
                                titleHeight="2.5vh"
                                titleWidth="20vw"
                                inputWidth="17vw"
                                inputHeight="4.8vh"
                                margin="0px"
                            ></InputBox>
                            <Settings
                                sx={{
                                    position: "absolute",

                                    marginBottom: "1.25vh",
                                    marginLeft: "16vw",
                                    width: "20px",
                                    height: "20px",
                                }}
                                onClick={() => {
                                    handleOpen();
                                }}
                                cursor="pointer"
                            />
                        </RowWrapper>
                        <CommonSelectLanguage
                            title={t("language")}
                            radius="6px"
                            opacity="0.5"
                            selectFontSize="1.8vh"
                            inputWidth="20vw"
                            width="21vw"
                            height="5vh"
                            margin="0px"
                            language={language}
                            selectHeight="2.5vh"
                            setLanguage={setLanguage}
                        />
                        <div>
                            <div
                                style={{
                                    width: "20vw",
                                    height: "2.5vh",
                                    fontSize: "1.8vh",
                                    opacity: "0.5",
                                }}
                            >
                                {t("Bio")}
                            </div>
                            <textarea
                                style={{
                                    width: "20.6vw",
                                    height: "6vh",
                                    borderRadius: "6px",
                                    resize: "none",
                                }}
                                name="Bio"
                                onChange={(e) => {
                                    setBio(e.target.value);
                                }}
                                value={bio}
                            ></textarea>
                        </div>
                        <BtnWrapper>
                            <Button
                                id="5"
                                fontSize="0.9vw"
                                textValue={t("Cancel")}
                                width="7.079vw"
                                margin="10px 10px 0px 10px"
                                radius="5px"
                                onClick={handleResetForm}
                            ></Button>
                            <Button
                                id="4"
                                fontSize="0.9vw"
                                textValue={t("Save")}
                                width="7.079vw"
                                margin="10px 10px 0px 10px"
                                radius="5px"
                                onClick={handleSubmit}
                            ></Button>
                        </BtnWrapper>
                    </form>

                    {/* interest select Componente Modal */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Interest
                                flag="edit"
                                ChangeInterest={ChangeInterest}
                                handleclose={handleClose}
                            />
                        </Box>
                    </Modal>
                </>
            }
            sx={{
                borderRadius: "35px",
                height: "60vh",
                boxSizing: "border-box",
                paddingX: "5vw",
                paddingY: "4vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                width: "37.65vw",
            }}
        />
    );
}

export default EditProfile;
