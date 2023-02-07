import styled from 'styled-components';
import LoginForm from './LoginForm';
import BackgroundFrame from '../Background';


export default function Login (props) {

  return (
    <BackgroundFrame
      bg = {
          <LoginForm></LoginForm>
      } ment1= "Sign Into"
        ment2 = "Your Account">
    </BackgroundFrame>
  )
}
