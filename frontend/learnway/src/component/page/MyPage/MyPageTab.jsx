import React, { useState } from "react";
import styled from "styled-components";
import MyPageContent from "./MyPageContent";
import Button from "../../ui/Button";


const BtnWrapper = styled.div`
    padding-top: 5vh;
    padding-bottom: 5vh;
    margin-right: 10vw;
    margin-left: 10vw;
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
                            // fontSize="90%"
                            // width="18vw"
                            // height="5vh"
                        />
                     : 
                        <Button
                            key={index}
                            id="7"
                            textValue={title}
                            onClick={() => setContent(title)}
                            // fontSize="90%"
                            // width="18vw"
                            // height="5vh"
                        />
                )}
            </BtnWrapper>
            <MyPageContent content={content} />
        </div>

    );
}

export default MyPageTab;
