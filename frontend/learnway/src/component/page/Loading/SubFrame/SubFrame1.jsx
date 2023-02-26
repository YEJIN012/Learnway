import React from "react";
import styled,{keyframes} from "styled-components";

const Frame = styled.div`
margin-left: 3vw;
width: 40vw;
/* height: 70vh; */
/* border: solid 1px black; */
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Text = styled.div`
margin-bottom: 7vw;
font-size: 3vw;
font-weight: 700;
display: flex;
justify-content: center;
`;
const TestObj = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const animeTextUp = keyframes`
  0% { top: 0; } 
  12.5% { top: -1rem; }
  20% { top: 0 } 
  40% { top: 0 } 
  60% { top: 0 } 
  80% { top: 0 } 
  100% { top: 0 }
  `;
const TestSpan = styled.span`
  position: relative;
  animation: ${animeTextUp} 2s infinite;
  /* font-family: "nanumSquareNeo"; */

  &:nth-of-type(1) {
    animation-delay: 0.1s;
  }

  &:nth-of-type(2) {
    animation-delay: 0.2s;
  }

  &:nth-of-type(3) {
    animation-delay: 0.3s;
  }

  &:nth-of-type(4) {
    animation-delay: 0.4s;
  }

  &:nth-of-type(5) {
    animation-delay: 0.5s;
  }

  &:nth-of-type(6) {
    animation-delay: 0.6s;
  }

  &:nth-of-type(7) {
    animation-delay: 0.7s;
  }

  &:nth-of-type(8) {
    animation-delay: 0.8s;
  }
`;


const Sign = styled.div`
scale: 0.7;
height:100%;
padding-top: 10px;
width:100%;
background: #ffffff transparent;
position: relative;
display: flex;
flex-direction: column;
justify-content: center;
overflow: hidden;
`;

const Moving = styled.div`
width: 56.98vw;
-webkit-animation: move 1.2s infinite;
-moz-animation: move 1.2s infinite;
-o-animation: move 1.2s infinite;
-ms-animation: move 1.2s infinite;
animation: move 1.2s infinite;
`;

const SuitCase = styled.div`
height: 15vw;
width: 24.65vw;
background:  #7E90AF;
border-radius: 2vw;
float: left;
`;

const Handle = styled.div`
background:  #7E90AF;
height: 4.9vw;
width: 9.47vw;
border-top-right-radius: 1.63vw;
border-top-left-radius: 1.63vw;
position: absolute;
margin-left: 7.67vw;
margin-top: -4.73vw;
`;

const RollBox = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
margin-top: 3vw;
`;

const RollThingy = styled.div`
height: 4.73vw;
width: 4.73vw;
border-radius: 50%;
background:  #7E90AF;
`;

function SubFrame1() {
    return (
        <Frame>
            <Sign>
                <Text>
                    <TestObj>
                        <TestSpan>M</TestSpan>
                        <TestSpan>A</TestSpan>
                        <TestSpan>T</TestSpan>
                        <TestSpan>C</TestSpan>
                        <TestSpan>H</TestSpan>
                        <TestSpan>I</TestSpan>
                        <TestSpan>N</TestSpan>
                        <TestSpan>G</TestSpan>
                    </TestObj>
                </Text>
                <Moving>
                    <SuitCase>
                        <Handle />
                    </SuitCase>
                    <SuitCase>
                        <Handle />
                    </SuitCase>
                </Moving>
                <RollBox>
                    <RollThingy />
                    <RollThingy />
                    <RollThingy />
                    <RollThingy />
                    <RollThingy />
                </RollBox>
            </Sign>
        </Frame>
    );
}
export default SubFrame1;
