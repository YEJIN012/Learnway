import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfo } from "../page/Front/actions/userAction";
import { removeCookieToken } from "../page/Front/utils/Cookie";
import { DELETE_INFO } from "../page/Front/actions/types";
import logo from "../page/Front/img/logo_skyblue.png";

const Wrapper = styled.div`
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
    font-size: 23px;
    color : #91a8d0;
    font-weight : bolder;
`;
const MenuBtn = styled.div`
    &:hover{  
        color : #DAAAA9
    }
    display: flex;
    margin-right: 30px;
    margin-left: 20px;
    text-decoration:  none; 
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

    const Logout = () => {

        // user Info 삭제
        deleteInfo(userEmail).payload
            .then((res) => {
                const status = res.status
                if ( status === 200 ){
                    // refresh 토큰 삭제
                    removeCookieToken();
                    // 취향정보, 언어정보 초기화, 유저정보, access 토큰 모두 삭제
                    dispatch({type: DELETE_INFO, payload: null})

                    // logout 시 login 창으로
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err)
                alert("서버통신 실패")
            })
        }

    return (
        <Wrapper>
            <NavLink to="/">
                <Img>
                    <img src={logo} alt="" />
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
