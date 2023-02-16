import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import InputBox from '../Input';
import Button from '../../../ui/Button';
import { request } from "../utils/axios";
import EmailIcon from '@mui/icons-material/Email';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const InputbtmFrame = styled.div`
  display: flex;
  justify-content: space-between; 
  align-items: flex-end;
`;


export default function AuthEamil({getEmail}) {
  const [email, setEmail] = useState("");
  const [auth, setAuth] = useState(false);
  const [authcode, setAuthcode] = useState("")
  const [disabled, setDisabled] = useState("")
  
  const { t } = useTranslation();

  const URL = '/users/verify'
  
  // 서버에 인증번호 요청이 되면 인증번호 입력 인풋창 보여주기
  const chkAuthcode = () => {
    request("get", URL + `?user_email=${email}&find_code=1`, email)
    // request("get", URL + `?user_email=${email}`, email)
      .then ((res) => {
        const status = res.status;
        const msg = res.msg;
        if (status === 200) {
          setAuth(true)                  
        } else if (status === 202) {
          alert(t('This email has already been registered.'))
        }
      })
      .catch((err) => console.log(err))
  };
  
  // 인증번호 식별 요청
  const handleSubmit = (e) => {
    e.preventDefault();
    request("post", URL + `?code=${authcode}&user_email=${email}&find_code=1`, email)
      .then((res) => {
          const status = res.status;
          if(status === 200){ // 인증번호가 맞으면 email을 emit해주고 Next 버튼을 활성화
            getEmail(email)
            setDisabled(true)               // 이메일 인증이 완료되면 버튼과 인풋태그 비활성화
            alert(t('The authentication numbers match'))
          }  else {
            alert(t('The authentication numbers do not match.'))
          }
        })
      .catch((err) => console.log(err))
  };


  return (
    <>
      <InputbtmFrame>
        <InputBox 
          id="email" 
          type="email" 
          title={t('E-mail')} 
          inputWidth="220px"
          inputHeight="25px"
          placeholder="abcdef@dfd.com" 
          margin="5px 0px 5px 0px"
          value={email} 
          disabled={disabled}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          icon= {<EmailIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}}  />} 
        />
        <Button 
          id="0" 
          width="80px" 
          height="28px" 
          fontSize="12px" 
          textWeight="700" 
          radius="10px" 
          textValue= {t('Send')} 
          disabled={disabled}
          margin="5px 0px 5px 0px"
          
          onClick={chkAuthcode}
          />
      </InputbtmFrame>
      <form onSubmit={handleSubmit}>
        {
          auth === true
          ? (
            <InputbtmFrame>
              <InputBox 
                id="authcode" 
                type="text"
                title={t('Verification code')} 
                inputWidth="220px"
                inputHeight="25px"
                placeholder="123456" 
                margin="5px 0px 5px 0px"
                disabled={disabled}
                value={authcode} 
                onChange={(e) => {
                  setAuthcode(e.target.value)
                  }}
                icon= {<LockOpenIcon sx={{margin: "0px 5px 3px 5px", color: "#615e5f", opacity: "0.5"}}  />}
                />
              <Button
                id = "0"
                width="80px"
                height="28px" 
                fontSize="12px"
                textWeight="700"
                radius="10px"
                textValue={t('Confirm')}
                margin="5px 0px 5px 0px"
                disabled={disabled}
                />
            </InputbtmFrame>
          )
          : null
        }
      </form>
    </>
  )
};
