import React from 'react';
import styled from 'styled-components';

const Center = styled.div`
  margin: auto;
`;

const Table = styled(Center)`
  width: 100%;
  height: 10vh;
  background-color: #d4e5ff;
  display: flex;
  align-items: center;
`;

const MonitorWrapper = styled(Center)`
  background: #050321;
  width: 90%;
  height: 90%;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.3);
`;

const Monitor = styled(Center)`
  width: 80%;
  height: 70%;
  background-color: #344151;
  overflow: hidden;
  white-space: nowrap;
  box-shadow: inset 0px 5px 10px 2px rgba(0, 0, 0, 0.3);
`;

const Text = styled.p`
  font-size: 10vh;
  position: relative;
  display: inline-block;
  animation: move 8s infinite linear;
  color: #EBB55F;
`;

const CamNotice = () => (
    <Table>
      <MonitorWrapper>
        <Monitor>
          <Text>
          대화 입장 전, 웹캠 상태 확인 및 점검을 할 수 있습니다.
          </Text>
        </Monitor>
      </MonitorWrapper>
    </Table>
);

export default CamNotice;