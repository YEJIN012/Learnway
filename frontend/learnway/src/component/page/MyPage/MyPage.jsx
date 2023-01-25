import React from "react";
import styled from "styled-components";
import NavBar from "../../ui/NavBar";
import MyPageBtn from "./MyPageBtn";
import MyPageContent from "./MyPageContent"
import { useState } from "react";

const StyledBody = styled.div`
    margin-top: 65px;
    margin-left: 110px;
    margin-right: 110px;
`;

const Wrapper = styled.div`
    margin-right: 20%;
    margin-left: 20%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ContentWrapper = styled.div`
    margin-top: 65px;
    margin-right: 15%;
    margin-left: 15%;
    border: 1px solid;
`

function Mypage() {
    const [content, setContent] = useState('PROFILE');
    const Menu = [
        'PROFILE', 'FRIENDS', 'STUDY' ,
    ]
    return (
        <div>
            <NavBar />
            <StyledBody>
                <Wrapper>
                    {Menu.map((title, index) => (
                        <MyPageBtn
                            key={index}
                            title={title}
                            onClick={() => setContent(title)}
                            content={content}
                        />
                    ))}
                </Wrapper>
                <ContentWrapper>
                    <MyPageContent content={content}></MyPageContent>

                </ContentWrapper>
            </StyledBody>
        </div>
    );
}
export default Mypage;
