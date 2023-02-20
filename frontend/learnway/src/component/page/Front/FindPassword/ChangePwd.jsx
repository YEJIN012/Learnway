import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import InputBox from "../Input"
import Button from '../../../ui/Button';
import { request } from '../utils/axios';
import { useNavigate } from "react-router-dom";
import LockOpenIcon from '@mui/icons-material/LockOpen';

const BtnFrame = styled.div`
  text-align : right;
  margin-right: 0px;
  margin-bottom: 20px;  
`;

const PwReChk = styled.span`
color: #ff0000;
font-size: 0.1vw;
margin-left: 3vw;
`;

const InputForm = styled.form`

`;

export default function ChangePwd({email}) {
  const navigate = useNavigate()
  
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState(""); 
  const [disabled, setDisabled] = useState(true);
  const { t } = useTranslation();

  // 비밀번호와 비밀번호 확인 모두 입력 했을 때, 버튼 활성화
  useEffect(()=> {
    if (newPwd && confirmNewPwd) {
      setDisabled(false)
    }
  },[newPwd,confirmNewPwd])

  function pwRuleChk(str){
    //영어 숫자 특수문자 혼합 8문자 이상 
    const pattern_eng = /[a-zA-Z]/;
    const pattern_num = /[0-9]/;
    const pattern_spec = /[~!@#$%^&*()_+|<>?:{}]/;
    if(str==="" || (str.length > 8 && ((pattern_spec.test(str))&&(pattern_num.test(str))&&(pattern_eng.test(str)))))
    {
      console.log("settt")
      return(null)
    }
    else{
      return(<PwReChk style={{ fontSize: "10px"}}>Set password more than 8 characters including special character</PwReChk>)
    }
  }


  // 비밀번호와 비밀번호 확인이 같으면 비밀번호 수정 후, login 페이지 이동
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPwd === confirmNewPwd) {
      const data = {
      newPassword: newPwd,
      newPasswordConfirm: confirmNewPwd,
      userEmail: email
      };
      console.log(data)
      request("put", "/users/modify/userPwd", data)
        .then((res) => {
          console.log(res.msg)
          alert("Success")
          navigate('/login')
        })
        .catch((err) => alert(t('A network error has occurred. The request has failed.')));

    }
    else { 
      alert(t('🚨Please double check your password!!🚨'))
    }
  }

  return (
    <InputForm onSubmit={handleSubmit}>
      <InputBox 
        id="New Password" 
        type="password" 
        title={t('New Password')} 
        placeholder="********" 
        value={newPwd} 
        onChange={(e) => setNewPwd(e.target.value)}
        icon= {<LockOpenIcon sx={{margin: "0px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}}  />} 
        margin = "30px 0px 0px 0px"
      />
        {pwRuleChk(newPwd)}
      <InputBox 
        id="Confirm New Password" 
        type="password" 
        title={t('Confirm New Password')}
        placeholder="********" 
        value={confirmNewPwd} 
        onChange={(e) => setConfirmNewPwd(e.target.value)}
        icon= {<LockOpenIcon sx={{margin: "40px 5px 8px 5px", color: "#615e5f", opacity: "0.5"}}  />} 
      />
      <BtnFrame>
        <Button
          id = "0"
          width="185px"
          height="39px"
          fontSize="12px"
          textWeight="700"
          radius="10px"
          textValue="Change"
          margin="30px 0px 0px 0px"
          disabled={disabled}
        />
      </BtnFrame>
    </InputForm>
  )
}
