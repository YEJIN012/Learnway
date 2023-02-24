import styled from 'styled-components';
import LoginForm from './LoginForm';
import BackgroundFrame from '../Background';
import icon from '../img/googleIcon.jpg';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { interestLst, languageLst } from '../actions/userAction';
import { useEffect } from 'react';

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
  const dispatch = useDispatch()

  // 홈페이지 시작시 언어정보와 취향설정 정보를 스토어에 저장해둔다.
  useEffect(() => {
    const langdata = languageLst()
    const interstdata = interestLst()
    langdata.payload.then((res) => dispatch({ type: langdata.type, payload: res.language }))
    interstdata.payload.then((res) => dispatch({ type: interstdata.type, payload: res.interests }))
  }, [])

  
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
    
