import styled from 'styled-components';
import LoginForm from './LoginForm';
import BackgroundFrame from '../Background';
import icon from '../img/googleIcon.jpg'
/*
1. location.search : 쿼리스트링에서 ? 뒤에 있는 값을 가져옴
2. 즉 여기서는 url? 'token= "queryString" 에서 queryString을 가져온다는 말임
3. 따라서 queryString이 붙어서 온 경우는 그것을 catch 해서 로그인 시켜주기 => 토큰은 로컬스토리지에 저장하고 axios 요청해서 뭐든 하고 메인페이지로
4. queryString이 붙어서 오지 않은 경우는 회원이 아니므로 회원가입 폼으로 옮겨주자.
5. 
*/

const GooIcon = styled.button`
  background-image: url(${icon});
  background-size: cover;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;


export default function Login () {
  
  const OpenForm = () => {window.location.href = "https://i8a408.p.ssafy.io/api/oauth2/authorization/google"}
  return (
    <BackgroundFrame
      bg = {
        <>
          <LoginForm />
          <GooIcon onClick={OpenForm} text="로그인"/>
        </>
      } ment1= "Sign Into"
      ment2 = "Your Account" />
  )
}
    
