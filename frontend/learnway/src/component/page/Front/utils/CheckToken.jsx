import { useEffect, useState } from "react"
import { getCookieToken, removeCookieToken, setRefreshToken } from "./Cookie";
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_TOKEN } from "../actions/types";
import { accessToken, requestToken } from "../actions/userAction";


export function CheckToken(key) {
  const [isAuth, setIsAuth] = useState('Loaded');
  const tokenData = useSelector(state => state.TokenReducer);
  const refreshToken = getCookieToken();
  const dispatch = useDispatch();
  
  useEffect(() => {
    const checkAuthToken = async () => {
      // refreshToken이 undefined이면 accessToken 삭제
      if (refreshToken===undefined) {
        dispatch({type: DELETE_TOKEN})
        setIsAuth('Failed');
      } else {// refreshToken이 존재
        // access 토큰이 존재하고, 기간이 만료되지 않았으면 Success 
        if ( tokenData.authenticated && new Date().getTime() < tokenData.expireTime){
          setIsAuth('Success');
        } else { // 그렇지 않으면
            // refreshToken을 통해 토큰 재발급
            const addToken = {accessToken: tokenData.accessToken ,refreshToken: refreshToken}
            const response = await requestToken(addToken);
            response.payload
              .then((res) => {
                const status = res.status
                const msg = res.msg
                console.log(msg)
                // 토큰 발급이 성공하면 토큰 갱신
                if (status === 200) {
                  setRefreshToken(res.token.refreshToken);
                  const getaccessToken = accessToken(res.token);
                  dispatch({type: getaccessToken.type, payload: getaccessToken.payload});
                  setIsAuth('Success');
                } else { // 실패하면 모든 토큰 지우고 intro로 돌려보내기
                  dispatch({ type: DELETE_TOKEN });
                  removeCookieToken();
                  setIsAuth('Failed');
                }
              })
        }
      }
    };
    checkAuthToken();
  }, [ refreshToken, dispatch, key ]);
  return{
    isAuth
  }
}