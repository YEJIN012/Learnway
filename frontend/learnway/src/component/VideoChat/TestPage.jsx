import React from "react";
import styled from "styled-components";
import Translate from './Translate';
import Report from './Report';
import CommonFrame from './CommonFrame'
import Leave from './Leave'
//화상 채팅방용 테스트 페이지
function TestPage(){
    return(
        //화상 카메라가 들어갈 영역
        <CommonFrame title={"Title"} body={<Leave></Leave>}></CommonFrame>
        //위젯이 들어갈 영역
    );
};
export default TestPage;
