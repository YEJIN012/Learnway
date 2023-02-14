import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteInfo } from "../page/Front/actions/userAction";
import { removeCookieToken } from "../page/Front/utils/Cookie";
import { DELETE_INFO } from "../page/Front/actions/types";
import logo from "../page/Front/img/logo_skyblue.png";
import blueAirplane from '../page/Front/img/sky_airplane.png'; 

const Wrapper = styled.div`
    height: 1.7vw;
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    // box-shadow: 0px 2px 10px #EFEFEF;
    // background-color : #fff;
    // opacity:0.9;
    // border-bottom: 0.2rem solid #DBDBDB;
    width:95vw;
    margin: 0.3vw auto;
`;
const Img = styled.div`
    display: flex;
    height: 100%;
    margin-top:0.3vw;
`;
const Menu = styled.div`
    display: flex;
    font-size: 1vw;
    color : #91a8d0;
    font-weight : bolder;
    // text-shadow:2px 10px #EFEFEF;
    text-shadow: 2px 2px 2px #E3E1E1;
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

                    alert("Good bye See you again!!🤣")
                    // logout 시 login 창으로
                    navigate('/');
                }
            })
            .catch((err) => {
                console.log(err)
                .catch((err) => alert("🚨A network error has occurred. The request has failed.🚨"));
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
                {/* <img style={{position:"absolute", marginTop:'3vw',right:'1.6vw'}}src={blueAirplane} alt="" /> */}
            </Menu>
        </Wrapper>
    );
}
export default NavBar;
