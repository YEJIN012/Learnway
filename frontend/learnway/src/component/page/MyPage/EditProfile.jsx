import React from "react";
import styled from "styled-components";

const StyledTextInput = styled.input`
    width: 100%;
    height: 20px;
    font-size: 16px;
    margin: 10px;
`;


function EditProfile() {
    return (
        <div className="white-card-list">
            <StyledTextInput placeholder = "username" />
            <StyledTextInput placeholder = "username" />
        </div>
        
    );
}

export default EditProfile;
