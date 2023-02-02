import React, { useState } from "react";
import interest from "../../../ui/Interest.json"
import SelectBtn from "./InterestIcon";
import styled from 'styled-components';



const SelectFrame = styled.div`
  width: 382px;
  height: 599px;
  display: flex;
  flex-wrap: wrap;
  margin: 138px 71px 0px 0px;

`;

export default function InterestSelect() {
  const textdata = interest.interests
  var [lst, setLst] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  
  return (
    <div>
      <h4>선택창</h4>
      <SelectFrame>
        {
          textdata.map((e, idx) => {
            return (
              <SelectBtn
                key={idx}
                id={idx} 
                disabled="" 
                icon={textdata[idx].field} 
                chk={lst[idx]} 
                onClick= {() => {
                  const tmplst = [...lst]
                  tmplst[idx] = (lst[idx] + 1) % 2
                  setLst(tmplst)
                }}
              ></SelectBtn>
            )}
          ) 
        }
      </SelectFrame>
    </div>
  )
}


// chk = 1 : button 클릭
// chk = 0 : button 미클릭