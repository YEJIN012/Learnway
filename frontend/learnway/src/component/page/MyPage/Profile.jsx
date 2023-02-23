import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import EditIcon from "@mui/icons-material/Edit";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import SaveIcon from "@mui/icons-material/Save";

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.5vh;
`;
const FriendNumber = styled.span`
    font-size: 2vh;
`;
const Text = styled.span`
    font-size: 2vh;
    color: #000000;
`;
const ImgIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

const ProfileIcon = {
    color: "#615e5f",
    opacity: "0.5",
    height: "2vh",
};

function GetFriendCnt(userEmail) {
    const [friendCnt, setFriendCnt] = useState("");
    axios
        .get("/api/friend/count", {
            params: { userEmail: userEmail },
        })
        .then(function (res) {
            setFriendCnt(res.data.friendCnt);
        })
        .catch(function (error) {
            console.log(error);
        });
    return friendCnt;
}

function Profile() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.AuthReducer);
    const selectFile = useRef(); // Icon onClick에 input File을 달기 위한 ref

    const [imgBase64, setImgBase64] = useState(""); // 미리보기 파일
    const [imgFile, setImgFile] = useState(""); // 선택한 이미지 파일

    const { t } = useTranslation();

    // 선택이미지 미리보기
    const handleChangePreview = (e) => {
        console.log(e.target.files);
        if (e.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            // 1. 파일을 읽어 버퍼에 저장합니다.
            // 파일 상태 업데이트
            reader.onloadend = () => {
                // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                const base64 = reader.result;
                if (base64) {
                    var base64Sub = base64.toString();
                    setImgBase64(base64Sub);
                    // 파일 base64 상태 업데이트
                    console.log(imgBase64);
                }
            };
            setImgFile(e.target.files[0]);
            console.log(imgFile);
        }
    };

    // save 클릭시 호출되는 form 제출함수(image 편집)
    function handleSubmit() {
        console.log(imgFile);
        userInfo.userPwd = "";
        console.log(userInfo);
        const formData = new FormData();
        const blob = new Blob([JSON.stringify(userInfo)], {
            type: "application/json",
        });
        formData.append("image", imgFile);
        formData.append("userDto", blob);

        axios
            .put("api/users/modify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (res) {
                console.log(res.data.msg);
                alert(t("Successfully edited profile image"));
                // 회원정보 수정 api 완료시, redux userInfo state 갱신.
                dispatch({ type: "UPDATE_USER", payload: res.data.user });
            })
            .catch(function (error) {
                console.log(error);
            });
        formData.append("image", imgFile);
        formData.append("userDto", blob);

        axios
            .put("/api/users/modify", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(function (res) {
                alert("Successfully edited profile image");
                // 회원정보 수정 api 완료시, redux userInfo state 갱신.
                dispatch({ type: "UPDATE_USER", payload: res.data.user });
                setImgBase64("");
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <ProfileCard
            width="100%"
            header={
                <>
                    <input
                        type="file"
                        accept=".jpg, .png"
                        style={{ display: "none" }}
                        ref={selectFile} //EditIcon 에서 input에 접근 하기위해 useRef사용
                        onChange={handleChangePreview}
                    />
                    <ImgIcon>
                        <ProfileImg
                            tmpsrc={imgBase64} //선택한 파일이 있으면 -> tmpsrc로 임시선택 이미지(imgBase64)를 내려줌 - 미리보기
                            src={userInfo.imgUrl}
                            width="9vh"
                        />
                        <EditIcon
                            onClick={() => selectFile.current.click()}
                            cursor="pointer"
                            sx={{ rotate: "-5deg", fontSize: "medium" }}
                        />
                        {imgBase64 && (
                            <SaveIcon
                                color="#DAAAA9"
                                onClick={handleSubmit}
                                cursor="pointer"
                                sx={{ fontSize: "medium" }}
                            ></SaveIcon>
                        )}
                    </ImgIcon>

                    <Friends>
                        <FriendNumber>
                            {GetFriendCnt(userInfo.userEmail)}
                        </FriendNumber>
                        {t("FRIENDS")}
                    </Friends>
                </>
            }
            name={userInfo.name}
            body={
                <>
                    <InputGroup
                        icon={<EmailIcon sx={ProfileIcon} />}
                        flex="column"
                        textValue={t("E-mail")}
                        fontSize="1.5vh"
                        fontColor="#7c7c7c"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        icon={<CakeIcon sx={ProfileIcon} />}
                        flex="column"
                        textValue={t("Birthday")}
                        fontSize="1.5vh"
                        fontColor="#7c7c7c"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birthDay}</Text>}
                    ></InputGroup>
                </>
            }
        />
    );
}

export default Profile;
