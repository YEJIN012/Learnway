import React, { useState } from "react";
import Calendar from "react-calendar";
import StudyScripts from "./StudyScripts";
import 'react-calendar/dist/Calendar.css';
import "../../ui/mypage.css";

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    // console.log(moment(value).format("YYYY년 MM월 DD일"));
    return (
        <Calendar onChange={onChange} value={value} />
    );
}

function Study() {
    return (
        <div className="wrapper-row">
            <div>
                <div className="subtitle">Calendar</div>
                <div className="white-card">
                    <MyCalendar />
                </div>
            </div>
            <div>
                <StudyScripts/>
            </div>
        </div>
    );
}

export default Study