import React, { useState } from "react";
import styled from "styled-components";
import MyPageContent from "./MyPageContent";

const Btn = styled.button`
    width: 166px;
    height: 56px;
    font-size: 20px;
    font-weight: 700;
    color: #005aa7;
    border: 3px solid transparent;
    border-radius: 999px;
    background-image: linear-gradient(#fefdf7, #fefdf7),
        linear-gradient(to left, #005aa7, #fefdf7);
    background-origin: border-box;
    background-clip: content-box, border-box;
    cursor: pointer;
`;
const SelectedBtn = styled.button`
    width: 166px;
    height: 56px;
    font-size: 20px;
    font-weight: 700;
    color: #fefdf7;
    background-color: #005aa7;
    border-radius: 999px;
    border: transparent;
    shadow-color: #005aa7;
    box-shadow: 0px 3px 8px 0px rgba(0, 90, 167, 1);
    cursor: pointer;
`;
const BtnWrapper = styled.div`
    margin-right: 20%;
    margin-left: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

function MyPageTab() {
    const [content, setContent] = useState("PROFILE");

    const Menu = ["PROFILE", "FRIENDS", "STUDY"];
    return (
        <div>
            <BtnWrapper>
                {Menu.map((title, index) =>
                    content === title ? (
                        <SelectedBtn
                            key={index}
                            onClick={() => setContent(title)}
                        >
                            {title}
                        </SelectedBtn>
                    ) : (
                        <Btn key={index} onClick={() => setContent(title)}>
                            {title}
                        </Btn>
                    )
                )}
            </BtnWrapper>
            <MyPageContent content={content} />
        </div>
    );
}

export default MyPageTab;
