import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import Button from "../../ui/Button";
import CommonSelectLanguage from "../../ui/CommonSelectLanguage";
import Paper from "@mui/material/Paper";
import InputBox from "../Front/Input";

const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;
const RowWrapper = styled.div`
    display: flex;
    flex-direction: row;
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

// AuthReducer userInfo 갱신 호출함수
function UpdateUserInfo(props) {
    const dispatch = useDispatch();
    axios
        .get("api/users", {
                params: { userEmail: props },
            })
            // handle success
            .then(function (res) {
                console.log(res)
                dispatch(res.data).payload.then((res) => {
                    console.log(res)
                })
            })
            .catch(function (error) {
                console.log(error);
            });

}

function EditProfile() {
    const userInfo = useSelector((state) => state.AuthReducer);
    const languageBox = useSelector((state) => state.UerInfoReducer);
    const [username, setUsername] = useState(userInfo.name);
    // const [pw, setPw] = useState(userInfo.userPwd);
    // const [confirmPw, setConfirmPw] = useState("");
    const [interests, setInterests] = useState(
        interestRernderer(userInfo.interests)
    );
    const [language, setLanguage] = useState(userInfo.language.name); // language.name
    const [bio, setBio] = useState(userInfo.bio);

    // cancel 클릭시 호출되는 form reset함수
    function handleResetForm(e) {
        e.preventDefault();
        setUsername(userInfo.name);
        setInterests(interestRernderer(userInfo.interests));
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
            interests: userInfo.interests,
            // 고정 정보
            imgUrl: "",
            userEmail: userInfo.userEmail,
            birthDay: userInfo.birthday,
            badUser: userInfo.badUser,
            providerId: userInfo.providerId,
            provider: userInfo.provider,
            userId: userInfo.userId,
            userPwd: "",
        };

        const blob = new Blob([JSON.stringify(data)], {
            type: "application/json"
        })
        formData.append('image', "");
        formData.append('userDto',blob);

        console.log(data);
        axios
            .put("api/users/modify"
            , formData
            , {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            ).then(function (res) {
                console.log(res.data.msg);
                // 회원정보 수정 완료시, userInfo state 갱신.
                UpdateUserInfo(userInfo.userEmail)
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
                    <form onSubmit={handleSubmit}>
                        <InputBox
                            id="username"
                            type="text"
                            title="User Name(ENG)"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
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
                        <CommonSelectLanguage
                            title="Language"
                            language={language}
                            setLanguage={setLanguage}
                            height={"20px"}
                        />
                        <RowWrapper>
                            <InputBox
                                id="interests"
                                type="text"
                                title="Interests"
                                value={interests}
                                disabled="disabled"
                            ></InputBox>
                            <Button
                                id="1"
                                fontSize={"1vw"}
                                textValue={"Change"}
                                width="7.079vw"
                                radius={"5px"}
                            ></Button>
                        </RowWrapper>
                        <div>Bio</div>
                        <textarea
                            name="Bio"
                            onChange={(e) => {
                                setBio(e.target.value);
                            }}
                            value={bio}
                        ></textarea>
                        <BtnWrapper>
                            <Button
                                id="5"
                                fontSize={"1vw"}
                                textValue={"Cancel"}
                                width="7.079vw"
                                radius={"5px"}
                                onClick={handleResetForm}
                            ></Button>
                            <Button
                                id="4"
                                fontSize={"1vw"}
                                textValue={"Save"}
                                width="7.079vw"
                                radius={"5px"}
                                onClick={handleSubmit}
                            ></Button>
                        </BtnWrapper>
                    </form>
                </>
            }
            sx={{
                borderRadius: "35px",
                height: "50vh",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                paddingX: "2vw",
                paddingY: "5vw",
            }}
        />
    );
}

export default EditProfile;
