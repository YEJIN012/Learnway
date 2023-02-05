import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import Button from "../../ui/Button";
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import EditIcon from "@mui/icons-material/Edit";

const Friends = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.5vw;
    border: solid 1px black;
`;
const FriendNumber = styled.span`
    font-size: 2vh;
    border: solid 1px black;
`;
const Text = styled.span`
    font-size: 1.2vh;
    color: #000000;
`;
const ImgIcon = styled.div`
    display: flex;
    flex-direction: row;
    align-items: end;
`;

function editImg() {}

function GetFriendCnt(userEmail) {
    const [friendCnt, setFriendCnt] = useState("");
    axios
        .get("api/friend/count", {
            params: { userEmail: userEmail },
        })
        // handle success
        .then(function (res) {
            console.log("getFriendsNum");
            setFriendCnt(res.data.friendCnt);
        })
        .catch(function (error) {
            console.log(error);
        });
    return friendCnt;
}

function Profile() {
    const userInfo = useSelector((state) => state.AuthReducer);
    const selectFile = useRef(); // Icon onClick에 input File을 달기 위한 ref

    const [imgBase64, setImgBase64] = useState(""); // 미리보기 파일
    const [imgFile, setImgFile] = useState(""); // 찐 이미지 저장 파일

    const handleChangeFile = (event) => {
        console.log(event.target.files);

        if (event.target.files) {
            let reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            // 1. 파일을 읽어 버퍼에 저장합니다.
            // 파일 상태 업데이트
            reader.onloadend = () => {
                // 2. 읽기가 완료되면 아래코드가 실행됩니다.
                const base64 = reader.result;
                console.log(base64);
                if (base64) {
                    var base64Sub = base64.toString();

                    setImgBase64(base64);
                    //  setImgBase64(newObj);
                    // 파일 base64 상태 업데이트
                    console.log(imgBase64)
                }
            };
        }
    };

    return (
        <ProfileCard
            width="100%"
            header={
                <>
                    <input
                        type="file"
                        accept=".jpg, .png"
                        style={{ display: "none" }}
                        ref={selectFile} //input에 접근 하기위해 useRef사용
                        onChange={handleChangeFile}
                    />
                    <ImgIcon>
                        <ProfileImg
                            tmpsrc={imgBase64}
                            src={userInfo.imgUrl}
                            width="8vh"
                        />
                        <EditIcon
                            onClick={() => selectFile.current.click()}
                            cursor="pointer"
                        />
                    </ImgIcon>
                    <Friends>
                        <FriendNumber>
                            {GetFriendCnt(userInfo.userEmail)}
                        </FriendNumber>
                        Friends
                    </Friends>
                    {imgBase64 && (
                        <Button
                            id="4"
                            fontSize={"1vw"}
                            textValue={"Save"}
                            width="7.079vw"
                            radius={"5px"}
                        ></Button>
                    )}
                </>
            }
            name={userInfo.name}
            body={
                <>
                    <InputGroup
                        flex="column"
                        textValue="Email"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.userEmail}</Text>}
                    ></InputGroup>
                    <InputGroup
                        flex="column"
                        textValue="Birthday"
                        fontSize="1.5vh"
                        margin="10% 0vw 0vw 0vw"
                        inputWidth="auto"
                        inputHeight="auto"
                        obj={<Text>{userInfo.birthday}</Text>}
                    ></InputGroup>
                </>
            }
        />
    );
}

export default Profile;
