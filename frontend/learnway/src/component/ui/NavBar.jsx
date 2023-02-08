import React, { useEffect } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfo, deleteToken } from "../page/Front/actions/userAction";
import { removeCookieToken } from "../page/Front/utils/Cookie";

const Wrapper = styled.div`
    background-color: #fffde4;
    height: 30px;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const Img = styled.div`
    display: flex;
    height: 100%;
`;
const Menu = styled.div`
    display: flex;
    font-size: 20px;
`;
const MenuBtn = styled.div`
    display: flex;
    margin-right: 30px;
    margin-left: 20px;
    text-decoration:  underline; 
    cursor: pointer;
`;

function NavBar(params) {
    // 토큰 보유 확인
    // const accesstoken = useSelector(state => state.TokenReducer);
    // console.log(accesstoken)
    // const refreshToken = getCookieToken();
    // console.log(refreshToken)
    // console.log(useSelector(state => state.AuthReducer))
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userEmail = useSelector(state => state.AuthReducer.userEmail)
    console.log(userEmail)

    const Logout = () => {

        deleteInfo()
        dispatch(deleteToken())
                    
        // refresh 토큰 삭제
        removeCookieToken();
    
        // logout 시 login 창으로
        navigate('/intro');

        // // user Info 삭제
        // deleteInfo(userEmail).payload
        //     .then((res) => {
        //         const status = res.status
        //         console.log(res.message)
        //         if ( status === 200 ){
        //             console.log(res)
        //             // access 토큰 삭제
        //             dispatch(deleteToken())
                    
        //             // refresh 토큰 삭제
        //             removeCookieToken();
                
        //             // logout 시 login 창으로
        //             navigate('/intro');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err)
        //         alert("서버통신 실패")
        //     })
        }
    // useEffect( () => {
    //     Logout();
    // }, [])

    return (
        <Wrapper>
            <NavLink to="/">
                <Img>
                    <img src="/logo.png" alt="" />
                </Img>
            </NavLink>
            <Menu>
                <MenuBtn onClick={()=> navigate('/mypage')}>
                    MyPage
                </MenuBtn>
                <MenuBtn onClick={Logout}>
                    Logout
                </MenuBtn>
            </Menu>
        </Wrapper>
    );
}
export default NavBar;
