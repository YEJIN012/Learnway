import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionEnd from './SessionEnd'
//메인페이지로 이동할때까지 머무를 시간 설정
const delayTime = 4000;

function RouteToMain() {
    const [isTimeout, setIsTimeout] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let timer = setTimeout(() => { setIsTimeout(true) }, delayTime)
    }, [])
    
    return (
        <>
            {isTimeout === true ?
            (
                navigate("/", { replace: true })
                ):(
                    <SessionEnd></SessionEnd>
            )
            }
        </>
    )
} export default RouteToMain;