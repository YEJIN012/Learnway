import React, { useState } from "react";
import styled from "styled-components";
import MyPageContent from "./MyPageContent";
import { useTranslation } from 'react-i18next';
import Button from "../../ui/Button";


const BtnWrapper = styled.div`
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-right: 10vw;
    margin-left: 10vw;
    display: flex;
    flex-direction: row;
    justify-content:  space-evenly;
`;

function MyPageTab() {
    const { t } = useTranslation();
    const [content, setContent] = useState('PROFILE');

    const Menu = ['PROFILE','FRIENDS', 'STUDY'];
    return (
        <div>
            <BtnWrapper>
                {Menu.map((title, index) =>
                    content === title ? 
                        <Button
                            key={index}
                            id="6"
                            textValue={t(title)}
                            onClick={() => setContent(title)}
                        />
                     : 
                        <Button
                            key={index}
                            id="7"
                            textValue={t(title)}
                            onClick={() => setContent(title)}
                        />
                )}
            </BtnWrapper>
            <MyPageContent content={content} />
        </div>

    );
}

export default MyPageTab;
