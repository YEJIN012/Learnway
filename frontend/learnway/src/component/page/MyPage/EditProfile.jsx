import React, { useState } from "react";
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

function interestRernderer(array) {
    let result = "";
    if (array) {
        for (let i = 0; i < array.length; i++) {
            result += "#" + array[i].field + "  ";
        }
    }
    return result;
}

function EditProfile() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.AuthReducer);
    const languageBox = useSelector((state) => state.UserInfoReducer);
    const [username, setUsername] = useState(userInfo.name);
    const [language, setLanguage] = useState(userInfo.language.name); // language.name
    const [bio, setBio] = useState(userInfo.bio);
    // const [pw, setPw] = useState(userInfo.userPwd);
    // const [confirmPw, setConfirmPw] = useState("");
    const [interests, setInterests] = useState(userInfo.interests);

    // Interest Modal
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

        // Make FormData
        const formData = new FormData();
        const data = {
            // 편집 가능 정보
            // userPwd: pw,
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
                alert("Successfully edited profile Info");
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
                            title="User Name(ENG)"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            titleFontSize="1.8vh"
                            titleHeight="2.5vh"
                            titleWidth="20vw"
                            inputWidth="20vw"
                            inputHeight="5vh"
                            margin="0px"
                        ></InputBox>
                        {/* <RowWrapper>
                            <InputBox
                                id="password"
                                type="password"
                                title="New Password"
                                value={pw}
                                onChange={(e) => {
                                    setPw(e.target.value);
                                }}
                            ></InputBox>
                            <InputBox
                                id="confirmPw"
                                type="password"
                                title="Confirm Password"
                                value={confirmPw}
                                onChange={(e) => {
                                    setConfirmPw(e.target.value);
                                }}
                            ></InputBox>
                        </RowWrapper> */}
                        <RowWrapper>
                            <InputBox
                                id="interests"
                                type="text"
                                title="Interests"
                                value={interestRernderer(interests)}
                                disabled="disabled"
                                titleFontSize="1.8vh"
                                titleHeight="2.5vh"
                                titleWidth="20vw"
                                inputWidth="20vw"
                                inputHeight="5vh"
                                margin="0px"
                            ></InputBox>
                            <Settings
                                sx={{
                                    marginBottom: "1.25vh",
                                    marginLeft: "0.5vw",
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
                            title="Language"
                            radius="6px"
                            opacity="0.5"
                            selectFontSize="1.8vh"
                            inputWidth="20vw"
                            width="20vw"
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
                                    opacity:"0.5",
                                }}
                            >
                                Bio
                            </div>
                            <textarea
                                style={{ width: "20vw", height:"6vh" }}
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
                                fontSize="1vw"
                                textValue="Cancel"
                                width="7.079vw"
                                margin="10px 10px 0px 10px"
                                radius="5px"
                                onClick={handleResetForm}
                            ></Button>
                            <Button
                                id="4"
                                fontSize="1vw"
                                textValue="Save"
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
                height: "55vh",
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
