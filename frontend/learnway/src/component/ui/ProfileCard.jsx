import styled from "styled-components";
import Paper from "@mui/material/Paper";

const CardTop = styled.div`
    box-sizing: border-box;
    padding: 15%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 30%;
    background: linear-gradient(
        286.15deg,
        rgba(0, 90, 167, 0.5) 0%,
        rgba(254, 253, 228, 0.5) 100%
    );
    border-radius: 35px 35px 0px 0px;
`;
const CardBottom = styled.div`
    box-sizing: border-box;
    padding: 4vw 8vw;
    display: flex;
    flex-direction: column;
`;
const Name = styled.div`
    font-size: 2vw;
    font-weight: 700;
    margin-bottom: 0vh;
`

function ProfileCard({ header,name,body,width,height }) {

    return (
        <Paper
            elevation={3}
            children={
                <>
                    <CardTop>
                        {header}
                    </CardTop>
                    <CardBottom>
                        <Name>{name}</Name>
                        {body}
                    </CardBottom>
                </>
            }
            sx={{ borderRadius: "35px", width: width || "30vw", height: height ||"50vh" }}
        />
    );
    
}

export default ProfileCard;
