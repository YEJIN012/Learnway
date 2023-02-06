import React, { useEffect, useState } from 'react';
import InterestSelect from './InterestSelect';
import { interestLst } from "../actions/userAction";
import { useDispatch } from "react-redux";



export default function Interest({userinfo}) {
  const dispatch = useDispatch();
  const [itdata, setItdata] = useState("")


  // 취향 정보 서버에서 받아오기
  useEffect(() => {
    dispatch(interestLst()).payload
      .then((res) => {
        console.log(res.msg);
        const status = res.status;
        if (status === 202) {
          setItdata(res.interests)
      }
    })
      .catch((err) => console.log(err))
  },[])


  return (
    <div>
      <h1>나는 취향설정이야</h1>
      <InterestSelect userinfo={userinfo} itdata={itdata}></InterestSelect>
    </div>
  )
}