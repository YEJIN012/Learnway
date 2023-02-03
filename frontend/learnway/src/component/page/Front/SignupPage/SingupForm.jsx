import React, { useEffect, useState } from 'react';
import InputBox from '../Input';
import AuthEamil from './AuthEamil';
import Button from '../../../ui/Button';


export default function SignupForm({getUserinfo}) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState();
  const [pw, setPw] = useState("");
  const [confirmPw, setconfirmPw] = useState(""); 
  const [birthday, setbirthday] = useState("");
  const [lagnguae, setlagnguae] = useState("");
  const [disabled, setDisabled] = useState(true);

  // 이메일 인증이 되면 email 갱신
  const getEmail = (email) => {
    setEmail(email)
  }

  // 이메일 값이 들어오면 Next button 활성화
  useEffect(() => {
    if (email){
      setDisabled(false)
    }
  }, [email])
  console.log(email)


  // form에 값이 다 들어와서 Next Button을 누르면 부모 컴포넌트에 모든 값을 emit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (pw === confirmPw) {
      const data = {
          name: username,
          userEmail: email,
          userPwd: pw,
          // confirmPw: confirmPw,
          birthDay: birthday,
          language: lagnguae,       // 랭귀지 id  체크
          badUser: false,
          bio: "",
          imgUrl: "",
          providerId: "",
          provider: "",
          // interest: [],
        };
        getUserinfo(data)           // 정제된 데이터를 부모 컴포넌트에 보내준다.
      }
    else {
      alert("비밀번호가 다릅니다.")
    }
  };

  return(
    <div>
      <AuthEamil getEmail = {getEmail}></AuthEamil>
      {/* <InputBox id="email" type="email" title="E-mail" placeholder="abcdef@dfd.com" value={email} disabled={disabled} onChange={(e) => {setEmail(e.target.value)}}></InputBox> */}
      <form onSubmit={handleSubmit}>
        <InputBox id="username" type="txt" title="User Name(ENG)" placeholder="hanbin" value={username} onChange={(e) => {setUsername(e.target.value)}}></InputBox>
        <InputBox id="password" type="password" title="Password" placeholder="********" value={pw} onChange={(e) => {setPw(e.target.value)}}></InputBox>
        <InputBox id="confirmPw" type="password" title="Confirm Password" placeholder="********" value={confirmPw} onChange={(e) => {setconfirmPw(e.target.value)}}></InputBox>
        <InputBox id="birthday" type="date" title="Birthday" value={birthday} onFocus="(this.type='date')" onChange={(e) => {setbirthday(e.target.value)}}></InputBox>
        <InputBox id="lagnguae" type="text" title="Lagnguae" placeholder="Korean" value={lagnguae} onChange={(e) => {setlagnguae(e.target.value)}}></InputBox>
        <Btn id="0" txt="Next" disabled={disabled}></Btn>
      </form>
    </div>
  )
}


function Btn(props){
  const {id, txt, disabled, func} = props;
  return (
    <Button 
      id= {id} 
      width="13.16vw" 
      height="5vh" 
      fontSize="0.83vw" 
      textWeight="700" 
      radius="2vh" 
      textValue= {txt}
      disabled= {disabled}
      // onClick={() => {
      //   func()
      // }}
    >
    </Button>
  )
}