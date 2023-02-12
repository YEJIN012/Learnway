import styled from "styled-components";
import Paper from "@mui/material/Paper";

const CardTop = styled.div`
    box-sizing: border-box;
    padding: 3vh;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 30%;
    min-height: 17vh;
    background: linear-gradient(286.15deg, #91a8d0, #f0eee9);
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    box-sizing: border-box;
    padding: 5% 15%;
    display: flex;
    flex-direction: column;
`;
const Name = styled.div`
    font-size: 3.3vh;
    font-weight: 700;
    margin-top: 1.5vh;
`;

function ProfileCard({ header, name, body, width, height }) {
    return (
        <Paper
            elevation={3}
            children={
                <>
                    <CardTop>{header}</CardTop>
                    <CardBottom>
                        <Name>{name}</Name>
                        {body}
                    </CardBottom>
                </>
            }
            sx={{
                borderRadius: "35px",
                width: width || "100%",
                height: height || "inherit",
                minHeight: "60vh",
            }}
        />
    );
}

export default ProfileCard;
