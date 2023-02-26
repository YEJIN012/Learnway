import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import logo from "../../page/Front/img/logo_skyblue.png";
import styled, { keyframes } from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../page/Front/utils/axios"

const print = keyframes`
    0% {
        transform: translateY(-510px);
    }
    35% {
        transform: translateY(-395px);
    }
    70% {
        transform: translateY(-140px);
    }
    100% {
        transform: translateY(0);
    }
`;

const Receipts = styled.div`
width: 100%;
display: flex;
align-items: center;
flex-direction: column;
transform: translateY(-510px);

animation-duration: 2.5s;
animation-delay: 500ms;
animation-name: ${print};
animation-fill-mode: forwards;
`;
const Lang = styled.div`
    width: 30%;
    height: 10vh;
    font-size: 3.5vh;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
`;

const Text = styled.div`
    display: block;
    font-size: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: 600;
`;

const Interest = styled.div`
    height: 2em;
    width: inherit;
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: -8px;
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-radius: 20px;
    background-color: #f0f0f0;
    font-weight: bold;
    font-size: 1.05em;
`;

const Frame = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    background-image: linear-gradient(to right, #91a8d0, #f0eee9);
`;

const FrameBody = styled.div`
font-family: "Ubuntu", sans-serif;
    
height: 100vh;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #1c1c1c;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`;

const TicketSystem = styled.main`
max-width: 385px;
`;

const Top = styled.div`
display: flex;
    align-items: center;
    flex-direction: column;
`;
const Title = styled.h1`
font-weight: normal;
font-size: 1.4vw;
margin-bottom: 3vh;
color: #fff;
`;
const Printer = styled.div`
width: 100%;
height: 20px;
border: 5px solid #fff;
border-radius: 10px;
box-shadow: 1px 3px 3px 0px rgba(0, 0, 0, 0.2);
`;
const ReceiptWrapper = styled.div`
overflow: hidden;
margin-top: -10px;
padding-bottom: 10px;
`;

const Receipt = styled.div`
padding: 25px 30px;
text-align: left;
min-height: 200px;
width: 88%;
background-color: #fff;
border-radius: 10px 10px 20px 20px;
box-shadow: 1px 3px 8px 3px rgba(0, 0, 0, 0.2);
`;
const Img = styled.img`

`;
const Route = styled.div`
display: flex;
justify-content:space-evenly;
align-items: center;
margin: 30px 0;
`;
const PlaneIcon = styled.svg`
width: 30px;
height: 30px;
transform: rotate(90deg);
`;
const Path = styled.path`

`;
const Details = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
justify-content: space-between;
`;
const Item = styled.div`
flex-direction: column;
min-width: 70px;
margin-left: 2vw;
overflow: hidden;
`;
const Span = styled.span`
font-size: 0.8em;
color: rgba(28, 28, 28, 0.7);
font-weight: 500;
`;
const H3 = styled.h3`
margin-top: 10px;
margin-bottom: 25px;
`;
const ReceiptQrCode = styled.div`
padding: 25px 30px;
text-align: left;
min-height: 200px;
width: 88%;
background-color: #fff;
border-radius: 10px 10px 20px 20px;
box-shadow: 1px 3px 8px 3px rgba(0, 0, 0, 0.2);
height: 110px;
min-height: unset;
position: relative;
border-radius: 20px 20px 10px 10px;
display: flex;
align-items: center;
`;

const Description = styled.div`
margin-left: 20px;
`;

const H6 = styled.h6``;

function RandomMatch() {
    const myInfo = useSelector((state) => state.AuthReducer);
    const oppoInfo = useSelector((state) => state.OpponentReducer);

    const { roomId, recorder } = useParams();

    const [friendCnt, setFriendCnt] = useState("");
    const [isTimeout, setIsTimeout] = useState(false);

    const navigate = useNavigate();
    const { t } = useTranslation();

    const delayTime = 7000;

    async function getFriendCnt() {
        await request("get", `/api/friend/count?userEmail=${oppoInfo.userEmail}`).then((res) => {
            setFriendCnt(res.friendCnt);
        })
    }

    function interestRernderer(array) {
        let result = "";
        if (array) {
            for (let i = 0; i < array.length; i++) {
                result += "#" + array[i].field + "  ";
            }
        }
        return result;
    }

    function redirect() {
        if (isTimeout === true) {
            navigate(
                `/openvidu/${roomId}/${myInfo.userEmail}/${oppoInfo.userEmail}/${recorder}/${oppoInfo.language.languageId}/${myInfo.language.languageId}`,
                { replace: true }
            );
            window.location.reload();
        }
    }

    useEffect(() => {
        let timer = setTimeout(async () => {
            setIsTimeout(true);
        }, delayTime);
        getFriendCnt();
    }, []);

    return (
        <>
            {isTimeout === true ? (
                redirect()
            ) : (
                <Frame>
                    <FrameBody>
                        <TicketSystem>
                            <Top>
                                <Title>
                                    {t("😊 We succeeded in random matching based on your interest")}
                                    <br />
                                    {t("✈️ Please get ready to board now")}
                                </Title>
                                <Printer />
                            </Top>
                            <ReceiptWrapper>
                                <Receipts>
                                    <Receipt>
                                        <Img src={logo} alt="" width={"150"} />

                                        <Route>
                                            <Lang>{myInfo.language.name}</Lang>
                                            <PlaneIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
                                                <Path fill="#91a8d0" d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z" />
                                            </PlaneIcon>
                                            <Lang>
                                                {oppoInfo.language.name}
                                            </Lang>
                                        </Route>
                                        <Details>
                                            <Item>
                                                <Span>Name</Span>
                                                <H3>{oppoInfo.name}</H3>
                                            </Item>
                                            <Item>
                                                <Span>Birth</Span>
                                                <H3>{oppoInfo.birthDay}</H3>
                                            </Item>
                                            <Item>
                                                <Span>Email</Span>
                                                <H6>{oppoInfo.userEmail}</H6>
                                            </Item>
                                            <Item>
                                                <Span>Friends</Span>
                                                <H3>{friendCnt}</H3>
                                            </Item>
                                        </Details>
                                        <Details>
                                            <Item>
                                                <Span>Bio</Span>
                                                <H3>{oppoInfo.bio}</H3>
                                            </Item>
                                        </Details>
                                    </Receipt>
                                    <ReceiptQrCode>
                                        <ProfileImg src={oppoInfo.imgUrl} />
                                        <Description>
                                            <Text>
                                                {t("Hi🙌")}
                                            </Text>
                                            <Text>
                                                {t("Our interest is")}
                                            </Text>
                                            <Interest>
                                                {interestRernderer(oppoInfo.interests)}
                                            </Interest>
                                        </Description>
                                    </ReceiptQrCode>
                                </Receipts>
                            </ReceiptWrapper>
                        </TicketSystem>
                    </FrameBody>
                </Frame>
            )}
        </>
    );
}

export default RandomMatch;
