import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const Wrapper = styled.div`
    margin-left: 12px;
    margin-right: 12px;
    width: 40%;
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
    margin-top: 10px;
    height: 600px;
    left: 0px;
    top: 70px;
    border-radius: 35px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

function MyCalendar() {
    const [value, onChange] = useState(new Date());
    // console.log(moment(value).format("YYYY년 MM월 DD일"));
    return (
        <div>
            <Calendar onChange={onChange} value={value} />
        </div>
    );
}

function StudyCalendar(params) {
    return (
        <Wrapper>
            <Subtitle>Calendar</Subtitle>
            <Card>
                <MyCalendar/>
            </Card>
        </Wrapper>
    );
}

export default StudyCalendar