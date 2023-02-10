import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import ProfileImg from "../../ui/ProfileImg";
import StudyScriptItem from "./StudyScriptItem";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";
import moment from "moment/moment";

const Scripts = styled.div`
    height: 50vh;
    display: flex;
    flex-direction: column;
`;

function ScriptsAccordions(props) {
    const studyList = props.studyList;
    console.log(studyList);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (studyList) {
        return studyList.map((study, index) => (
            <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{ width: "37.65vw", borderRadius: "35px" }}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        // borderRadius: "35px",
                    }}
                >
                    <Typography
                        sx={{
                            width: "5vw",
                            fontSize: "1vw",
                            flexShrink: 0,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <ProfileImg src={study.profileDto.imgUrl} width="4vh" />
                        {study.profileDto.name}
                    </Typography>
                    <Typography
                        sx={{
                            color: "text.secondary",
                            fontSize: "1vw",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px",
                        }}
                    >
                        {study.script.slice(0, 10)}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "1vw",
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "30px",
                        }}
                    >
                        {moment(study.createDate).format("YYYY년 MM월 DD일")}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ height: "30vh" }} overflow={"scroll"}>
                        <StudyScriptItem script={study.script} />
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ));
    }
}

function StudyScripts(props) {
    const store = useSelector((state) => state.AuthReducer);
    const { selectedDate } = props;
    const [studyList, setstudyList] = useState([]);

    function getScripts(props) {
        console.log("getScripts");
        console.log(props);
        const date = moment(props).format("YYYY-MM-DD");
        console.log(date, typeof date);
        axios
            .post("api/study/day", {
                date: date,
                userEmail: store["userEmail"],
            })
            .then(function (res) {
                setstudyList(res.data.studyList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getScripts(selectedDate);
    }, [selectedDate]);

    return (
        <Scripts>
            <ScriptsAccordions studyList={studyList} />
        </Scripts>
    );
}

export default StudyScripts;
