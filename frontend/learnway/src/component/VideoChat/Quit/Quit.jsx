import { useTranslation } from 'react-i18next';
import React, { useState } from "react";
import styled from "styled-components";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import AllButton from "../../ui/AllButton";
import ImgBye from "./src/quitImg.png";

const Frame = styled.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    position:absolute;
`;

const Msg = styled.strong`
    font-family :  "Raleway", sans-serif;
    font-size:1.5vw;
    margin-bottom : 3vw;
`;

const Picture = styled.img`
    height: 23vmax;
    display: flex;
    flex-direction: column-reverse;
`;

const Ref = styled.a`
    position : absolute;
    bottom : 0.5%;
    left : 1%;
    font-size:0.3vw;
    color:#DCD6D6;
    text-decoration-line: none;
`;

function Quit({ getQuitFlag }) {
    const [quitFlag, setQuitFlag] = useState(0);
    const { t } = useTranslation();

    function quit() {
        setQuitFlag(1);
    }

    getQuitFlag(quitFlag);

    return (
        <CommonFrame
            header={<Title title={t('Quit')} />}
            body={
                <Frame>
                    <Picture src={ImgBye} />
                    <Ref href="https://kr.freepik.com/">Designed by Freepik</Ref>

                    <Msg>{t('Do you want to leave random matching?')}</Msg>
                    <AllButton onClick={quit} id="4" radius={"30px"} width={"8vw"} height={"2.5vw"} fontSize={"1vw"} textValue="OK" />

                </Frame>
            }>
        </CommonFrame>
    );
};
export default Quit;
