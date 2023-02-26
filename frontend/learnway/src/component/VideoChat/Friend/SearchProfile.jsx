import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {request} from "../../page/Front/utils/axios"
import ProfileCard from "../../ui/ProfileCard";
import ProfileImg from "../../ui/ProfileImg";
import InputGroup from "../../ui/InputGroup";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";
import CakeIcon from "@mui/icons-material/Cake";
import LanguageIcon from "@mui/icons-material/Language";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./ProfileCss.css";

import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Frame = styled.div`
    font-family: "Raleway", sans-serif;
    margin-left: 2.5vw;
    margin-top: 1.7vw;
`;

const UserName = styled.div`
    text-align: center;
    font-size: 1.3vw;
`;

const TimeLi = styled.li``;
const TimeUl = styled.ul`
    list-style: none;
    padding-left: 0;
    margin-left: 0;
    font-size: 1.9vh;
`;

function SearchProfile(props) {
    const { t } = useTranslation();

    // 내정보
    const myInfo = useSelector((state) => state.AuthReducer);
    // 상대방 정보
    const userInfo = useSelector((state) => state.OpponentReducer)

    function addFriend(me, oppo) {
        request("post","/api/friend",{userEmail: me,friendEmail: oppo}).then((res)=>{
            const data = res;

            if (data.status === 200) {
                alert(t("Add Friends Successfully"));
            } else {
                alert(t("Failed to add friends") + String(data.status));
            }
        })
    }

    function interestRernderer(array) {
        let result = "";

        for (let i = 0; i < array.length; i++) {
            result += "#" + array[i].field + "  ";
        }

        return result;
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.5,
                delay: 0.1,
                ease: [0.5, 0.71, 0.98, 1.01],
            }}
        >
            <Frame>
                <ProfileCard
                    className="timeline"
                    header={
                        <div style={{ overflow: "auto" }}>
                            <div>
                                <ProfileImg
                                    src={userInfo.imgUrl}
                                    width={"8vw"}
                                />
                                <PersonAddIcon
                                    onClick={() =>
                                        addFriend(myInfo.userEmail, props.user)
                                    }
                                    cursor="pointer"
                                    sx={{ scale: "1.3", color: "#615e5fea" }}
                                />
                                <UserName>{userInfo.name}</UserName>
                            </div>
                        </div>
                    }
                    body={
                        <div>
                            <TimeUl>
                                <TimeLi>
                                    <InputGroup
                                        icon={
                                            <EmailIcon
                                                className="time-wrapper"
                                                sx={{
                                                    color: "#615e5f",
                                                    opacity: "0.5",
                                                    height: "2vh",
                                                }}
                                            />
                                        }
                                        flex="column"
                                        textValue={t("E-mail")}
                                        fontSize="1.8vh"
                                        fontColor="#000000"
                                        margin="2.5vh 0vw 0vw 0vw"
                                        inputWidth="auto"
                                        inputHeight="auto"
                                        obj={
                                            <div className="flag">
                                                {userInfo.userEmail}
                                            </div>
                                        }
                                        className="direction-r"
                                    ></InputGroup>
                                </TimeLi>

                                <TimeLi>
                                    <InputGroup
                                        icon={
                                            <CakeIcon
                                                sx={{
                                                    color: "#615e5f",
                                                    opacity: "0.5",
                                                    height: "2vh",
                                                }}
                                            />
                                        }
                                        flex="column"
                                        textValue={t("Birthday")}
                                        fontSize="1.8vh"
                                        fontColor="#000000"
                                        margin="2.5vh 0vw 0vw 0vw"
                                        inputWidth="auto"
                                        inputHeight="auto"
                                        obj={
                                            <div className="flag">
                                                {userInfo.birthDay}
                                            </div>
                                        }
                                        className="direction-r"
                                    ></InputGroup>
                                </TimeLi>

                                <TimeLi>
                                    <InputGroup
                                        icon={
                                            <LanguageIcon
                                                sx={{
                                                    color: "#615e5f",
                                                    opacity: "0.5",
                                                    height: "2vh",
                                                }}
                                            />
                                        }
                                        flex="column"
                                        textValue={t("language")}
                                        fontSize="1.8vh"
                                        fontColor="#000000"
                                        margin="2.5vh 0vw 0vw 0vw"
                                        inputWidth="auto"
                                        inputHeight="3vh"
                                        obj={
                                            <div className="flag">
                                                {userInfo.language.name}
                                            </div>
                                        }
                                        className="direction-l"
                                    ></InputGroup>
                                </TimeLi>

                                <TimeLi>
                                    <InputGroup
                                        icon={
                                            <TextSnippetIcon
                                                sx={{
                                                    color: "#615e5f",
                                                    opacity: "0.5",
                                                    height: "2vh",
                                                }}
                                            />
                                        }
                                        flex="column"
                                        textValue={t("Bio")}
                                        fontSize="1.8vh"
                                        fontColor="#000000"
                                        margin="2.5vh 0vw 0vw 0vw"
                                        inputWidth="auto"
                                        inputHeight="7vh"
                                        obj={
                                            <div className="flag">
                                                {userInfo.bio}
                                            </div>
                                        }
                                        className="direction-r"
                                    ></InputGroup>
                                </TimeLi>

                                <TimeLi>
                                    <InputGroup
                                        icon={
                                            <FavoriteIcon
                                                sx={{
                                                    color: "#615e5f",
                                                    opacity: "0.5",
                                                    height: "2vh",
                                                }}
                                            />
                                        }
                                        flex="column"
                                        textValue={t("Interests")}
                                        fontSize="1.8vh"
                                        fontColor="#000000"
                                        margin="2.5vh 0vw 0vw 0vw"
                                        inputWidth="auto"
                                        inputHeight="auto"
                                        obj={
                                            <div className="flag">
                                                {interestRernderer(
                                                    userInfo.interests
                                                )}
                                            </div>
                                        }
                                        className="direction-l"
                                    ></InputGroup>
                                </TimeLi>
                            </TimeUl>
                        </div>
                    }
                    width="39vw"
                    height="90vh"
                />
            </Frame>
        </motion.div>
    );
}
export default SearchProfile;
