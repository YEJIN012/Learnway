import React, { useState } from "react";
import styled from "styled-components";
import MyPageContent from "./MyPageContent";
import Button from "../../ui/Button";


const BtnWrapper = styled.div`
    padding-top: 65px;
    padding-bottom: 65px;
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
                    content === title ? 
                        <Button
                            key={index}
                            id="6"
                            textValue={title}
                            onClick={() => setContent(title)}
                        />
                     : 
                        <Button
                            key={index}
                            id="7"
                            textValue={title}
                            onClick={() => setContent(title)}
                        />
                )}
            </BtnWrapper>
            <MyPageContent content={content} />
        </div>

    );
}

export default MyPageTab;
