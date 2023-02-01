import React, { useState } from "react";
import styled from "styled-components";

import InputGroup from "../../ui/InputGroup";
import CommonFrame from "../CommonComponent/CommonFrame";
import Title from "../CommonComponent/CommonTitle";
import TFBtnSet from "../CommonComponent/TFBtnSet";
const Frame = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:42vw;
`;

const PreInput = styled.input`
    width:${props => props.inputWidth || '2vw'};
    height:${props => props.inputheight || 'inherit'};
    font-size:1.5vw;
    
    border:none;
    border-radius:5px;
    background:#D9D9D9;
    color:#9B8383
`;

const PreInputGroup = styled.div`
width:22vw;
height:inherit;
display:flex;
flex-direction:row;
justify-content:space-between;
`;

const ChkBoxGroup = styled.div`
    width:inherit;
    height:inherit;
    border-radius:5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border:solid 1px #000000;
`;

const LargeInput = styled.textarea`
    width:inherit;
    height:inherit;
`;

const Label = styled.div`
display: flex;
flex-direction: row;
font-size: 1.2vw;
`;

const ChkBox = styled.input``;

function Report() {
    const [reportType, setReportType] = useState([]);
    const [reportDetail, setReportDetail] = useState("");
    const [reportDate, setReportDate] = useState(new Date())

    function submit(val1, val2) {
        //paste api call logic
        alert(String(val1) + String(val2));
    }

    function cancelSubmit() {
        setReportType([]);
        setReportDetail("");
        document.getElementById("detailBox").value = '';
        setReportDate(new Date());
    }

    function chkboxEventCtrl(event, val) {
        if (event.target.checked) {
            setReportType([...reportType, val]);
        } else {
            setReportType(reportType.filter((element) => element !== val))
        }
    }

    function ChkBoxComponent({ value, text }) {
        return (
            <Label>
                <ChkBox
                    type="checkbox"
                    value={value}
                    onChange={(e) => { chkboxEventCtrl(e, value) }}
                    checked={reportType.includes(value) ? true : false}>
                </ChkBox>
                {text}
            </Label>
        );
    };

    function renderCheckBoxComponent() {
        let result = [];

        const labelContent = [
            ["Sexual access", <br />, "(sexual harassment, forced conversation, pornographic broadcasts, etc)"],
            ["verbal abuse", <br />, "(abuse, disparaging remarks, etc)"],
            ["Harmful or dangerous acts", <br />, "(events of curelty, such as inciting terrorism, arson, torture, etc)"],
            ["Investment and multi-level corecion"],
            ["act of causing span or confusion"]
        ]
        for (let i = 0; i < 5; i++) {
            result.push(<ChkBoxComponent value={i} text={labelContent[i]}></ChkBoxComponent>)
        }
        return result;
    }

    //console.log(reportType, reportDetail)
    return (
        <CommonFrame
            header={<Title title={"Report"}></Title>}
            body={
                <Frame>
                    <InputGroup
                        flex="row"
                        textValue="Issue Time"
                        fontSize="1.7vw"
                        fontColor="#000000"
                        inputWidth="inherit"
                        inputHeight="2vw"
                        obj={
                            <PreInputGroup>
                                <PreInput type="text" id="reportDate" inputWidth="8vw" inputHeight="1.7vw" value={`${reportDate.getFullYear()}. ${String(reportDate.getMonth()).padStart(2, '0')}. ${String(reportDate.getDate()).padStart(2, '0')}`} readOnly></PreInput>
                                <PreInput type="text" id="reportTime" inputWidth="12vw" inputHeight="1.7vw" value={`${String(reportDate.getHours()).padStart(2, '0')}:${String(reportDate.getMinutes()).padStart(2, '0')}:${String(reportDate.getSeconds()).padStart(2, '0')} UTC${(parseInt(reportDate.getTimezoneOffset()) > 0) ? "-" + String(parseInt(reportDate.getTimezoneOffset()) / (-60)) : "+" + String(parseInt(reportDate.getTimezoneOffset()) / (-60))}`} readOnly></PreInput>
                            </PreInputGroup>
                        }>
                    </InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Report Type"
                        fontSize="1.7vw"
                        fontColor="#000000"
                        inputWidth="41vw"
                        inputHeight="16vw"
                        obj={
                            <ChkBoxGroup>
                                {renderCheckBoxComponent()}
                            </ChkBoxGroup>
                        }>
                    </InputGroup>

                    <InputGroup
                        flex="column"
                        textValue="Other"
                        fontSize="1.7vw"
                        fontColor="#000000"
                        inputWidth="41vw"
                        inputHeight="10vw"
                        obj={
                            <LargeInput id="detailBox" onChange={(e) => { setReportDetail(e.target.value) }}></LargeInput>
                        }>
                    </InputGroup>

                    <TFBtnSet
                        radius="5px"
                        width="6vw"
                        height="2vw"
                        fontSize="1vw"
                        function_ok={() => { submit(reportType, reportDetail) }}
                        function_cancel={() => { cancelSubmit() }}>
                    </TFBtnSet>
                </Frame>
            }>
        </CommonFrame>

    )
};
export default Report;
