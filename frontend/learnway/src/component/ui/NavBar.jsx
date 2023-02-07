import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

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
`;

function NavBar(params) {
    return (
        <Wrapper>
            <NavLink to="/">
                <Img>
                    <img src="/logo.png" alt="" />
                </Img>
            </NavLink>
            <Menu>
                <MenuBtn>
                    <NavLink to="/mypage">MyPage</NavLink>
                </MenuBtn>
                <MenuBtn>
                    <NavLink to="/logout">Logout</NavLink>
                </MenuBtn>
            </Menu>
        </Wrapper>
    );
}
export default NavBar;
