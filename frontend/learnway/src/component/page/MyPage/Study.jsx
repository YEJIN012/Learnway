import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "axios";
import StudyScripts from "./StudyScripts";
import "react-calendar/dist/Calendar.css";
import "../../ui/mypage.css";

function MyCalendar(props) {
    const [value, setValue] = useState(new Date());
    console.log(`value : ${value}`)
    const [month, setMonth] = useState(value.getMonth() + 1);
    const [mark, setMark] = useState({}); // 해당월에 기록되어있는 일별 학습량 {기록이 남은 일자: 학습량}

    // 해당 월 학습일자(학습량) 조회
    function getMonthlyLog({ month }) {
        axios
            .get(
                "https://3e43af35-aeee-496c-af8a-0128d780e1a7.mock.pstmn.io/study/month",
                { params: { userEmail: "12@gmail.com", month: month } }
            )
            .then(function (res) {
                const data = res.data.mon_cnt;
                console.log(data);
                const logDay = {};
                for (let i = 1; i < data.length + 1; i++) {
                    if (data[i] !== 0) {
                        logDay[i] = data[i]; // {기록이 남은 일자: 학습량}으로 재가공
                    }
                }
                setMark(logDay);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    // 선택한 일이 바뀌면 월 교체.
    useEffect(() => setMonth(value.getMonth() + 1), [value]);
    // 선택한 월이 바뀔때만 월별 학습량 조회
    useEffect(() => {
        getMonthlyLog(month);
    }, [month]);

    // console.log(moment(value).format("YYYY년 MM월 DD일"));
    return (
        <div>
            <Calendar
                style={{ height: 500 }}
                className="white-card"
                onChange={setValue}
                value={value}   // 선택된 일자
                showNeighboringMonth={false}
                tileClassName={({ date, view }) => {
                    // 해당 달의 일자에만 표시
                    if (date.getDate() in mark) {
                        if (mark[date.getDate()] < 3) {
                            return "highlight-low";
                        } else if (mark[date.getDate()] >= 3) {
                            return "highlight-high";
                        }
                    }
                }}
            />
            <StudyScripts selectedDate={value} />
        </div>
    );
}

function Study() {
    return (
        <div className="wrapper-row">
            <div>
                <div className="subtitle">Calendar</div>
                <div>
                    <MyCalendar />
                </div>
            </div>
        </div>
    );
}

export default Study;
