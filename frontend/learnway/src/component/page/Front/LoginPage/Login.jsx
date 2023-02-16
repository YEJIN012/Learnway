import styled from 'styled-components';
import LoginForm from './LoginForm';
import BackgroundFrame from '../Background';
import icon from '../img/googleIcon.jpg';
import { useTranslation } from 'react-i18next';

const LineFrame = styled.div`
  width: 380px;
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Line = styled.p`
  size: 10px;
  opacity: 0.3;
`;

const GooFrame = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const GooIcon = styled.button`
  border-color: white;
  background-image: url(${icon});
  background-size: cover;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export default function Login () {
  const { t } = useTranslation();
  
  const OpenForm = () => {window.location.href = "https://i8a408.p.ssafy.io/api/oauth2/authorization/google"};
  return (
    <BackgroundFrame
      bg = {
        <>
          <LoginForm />
          <LineFrame>
            <Line style={{ fontSize: "10px"}}>---------------------------------</Line>
            <Line style={{ fontSize: "10px"}}> {t('Or Login Using')} </Line>
            <Line style={{ fontSize: "10px"}}>---------------------------------</Line>
          </LineFrame>
          <GooFrame>
            <GooIcon onClick={OpenForm} text="로그인"/>
          </GooFrame>
        </>
      } ment1= {t('Sign Into')}
        ment2 = {t('Your Account')}
        height= "570px" 
    />
  )
}
    
