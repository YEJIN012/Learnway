import React, { useEffect, useState } from "react";
import "../../ui/mypage.css";
import moment from "moment";
import axios from "axios";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ScriptsAccordions(props) {
    const studyList = props.studyList;
    console.log(studyList);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return studyList.map((study, index) => (
        <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
        >
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: "33%", flexShrink: 0 }}>
                    friendID: {study.friendId}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                    {study.script}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {study.script}
                </Typography>
            </AccordionDetails>
        </Accordion>
    ));
}

function StudyScripts(props) {
    const { selectedDate } = props;
    const [studyList, setstudyList] = useState([]);

    function getScripts({ date }) {
        axios
            .get(
                "https://i8a408.p.ssafy.io/v2/api-docs/study/day",
                { date: { date }, userEmail: "12@gmail.com" }
            )
            .then(function (res) {
                setstudyList(res.data.studyList);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getScripts(selectedDate);
    }, []);
    // }, [selectedDate]);
    // React Hook useEffect has a missing dependency: 'selectedDate'. Either include it or remove the dependency array ???????????????

    return (
        <div className="-column">
            <div>
                <div className="subtitle">Scripts</div>
                {moment(selectedDate).format("YYYY년 MM월 DD일")}
            </div>
            <ScriptsAccordions studyList={studyList} />
        </div>
    );
}

export default StudyScripts;
