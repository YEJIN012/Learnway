import React from "react";
import styled from "styled-components";
import ProfileCard from "./ProfileCard";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row-reverse;
    margin-left: 12px;
    margin-right: 12px;
    width: 60%;
`;

const Subtitle = styled.div`
    left: 6.43%;
    right: 34.05%;
    height: 60px;
    bottom: 91.04%;
    font-weight: 300px;
    font-size: 30px;
    line-height: 32px;
    display: flex;
    align-items: center;
`;
const Card = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    height: 600px;
    left: 0px;
    top: 70px;
    border-radius: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

// const StyledTextInput = styled.input`
//     width: 100%;
//     height: 20px;
//     font-size: 16px;
//     margin: 10px;
// `;

// function TextInput(props) {
//     // const { placeholder, value, onChange } = props
//     const { placeholder } = props
//     return (
//     )
// }

function EditProfile() {
    return (
        <Wrapper>
            <div>
                <Subtitle>Edit profile</Subtitle>
                <Card>
                    프로필편집
                    {/* <TextInput placeholder="username" />
                <p>
                    <TextInput placeholder="username" />
                    <TextInput placeholder="username" />
                </p>
                <TextInput placeholder="username" />
                <TextInput placeholder="username" />
                <TextInput placeholder="username" /> */}
                </Card>
            </div>

            <ProfileCard profile={1} user={0} />
        </Wrapper>
    );
}

export default EditProfile;
