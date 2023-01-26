import React from "react";
import styled from "styled-components";
import Button from "../../ui/Button";

const StyledTextInput = styled.input`
    width: 100%;
    height: 20px;
    font-size: 16px;
    margin: 10px;
`;
const BtnWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

function EditProfile() {
    return (
        <div className="white-card list">
            <StyledTextInput placeholder="username" />
            <StyledTextInput placeholder="username" />
            <BtnWrapper>
                <Button id="5" fontSize={"7.792vw"} textValue={"Cancel"} width="20%"></Button>
                <Button id="4" fontSize={"100%"} textValue={"Save"} width="20%"></Button>
            </BtnWrapper>
        </div>
    );
}

export default EditProfile;
