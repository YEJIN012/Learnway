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
    background: linear-gradient(to right, #f0eee9, #91a8d0);
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    box-sizing: border-box;
    padding: 5% 15%;
    display: flex;
    flex-direction: column;
    background-color:transparent;
`;
const Name = styled.div`
    font-size: 3.3vh;
    font-weight: 700;
    margin-top: 1.5vh;
    text-align: center;
    // text-decoration-line: underline;
    // text-decoration-style: wavy;
`;

function ProfileCard({ header, name, body, width, height, className }) {
    return (
        <Paper

            elevation={3}
            children={
                <>
                    <CardTop>{header}</CardTop>
                    <CardBottom className={className}>
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
                // backgroundColor:"transparent",
            }}
        />
    );
}

export default ProfileCard;
