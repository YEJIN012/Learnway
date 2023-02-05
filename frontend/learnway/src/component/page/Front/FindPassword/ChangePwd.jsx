import React, { useState, useEffect } from 'react';
import InputBox from "../Input"
import Button from '../../../ui/Button';
import { request } from '../utils/axios';
import { useNavigate } from "react-router-dom";



export default function ChangePwd({email}) {
  const navigate = useNavigate()
  
  const [newPwd, setNewPwd] = useState("");
  const [confirmNewPwd, setConfirmNewPwd] = useState(""); 
  const [disabled, setDisabled] = useState(true);

  // 비밀번호와 비밀번호 확인 모두 입력 했을 때, 버튼 활성화
  useEffect(()=> {
    if (newPwd && confirmNewPwd) {
      setDisabled(false)
    }
  },[newPwd,confirmNewPwd])

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
          alert(res.msg)
          navigate('/login')
        })
        .catch((err) => alert("통신오류 잠시 후 이용해 주세요!") )
    }
    else { 
      alert("비밀번호가 다릅니다.")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputBox id="New Password" type="password" title="New Password" placeholder="********" value={newPwd} onChange={(e) => {setNewPwd(e.target.value)}}></InputBox>
      <InputBox id="Confirm New Password" type="password" title="Confirm New Password" placeholder="********" value={confirmNewPwd} onChange={(e) => {setConfirmNewPwd(e.target.value)}}></InputBox>
      <Button id = "0" width="13.16vw" height="5vh" fontSize="0.83vw" textWeight="700" radius="2vh" textValue="Change" disabled={disabled} ></Button>
    </form>
  )
}

