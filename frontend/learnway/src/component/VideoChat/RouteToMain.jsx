import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//메인페이지로 이동할때까지 머무를 시간 설정
const delayTime = 3000;

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
            ):
            //다른 그림으로 바꿔야 하면 아래 span부분만 대체 가능
            (
                <span>화상 통화가 종료되었습니다.</span>
            )
            }
        </>
    )
} export default RouteToMain;