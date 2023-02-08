import React from "react";
import Home from "./component/page/MainPage/Home";
import MyPage from "./component/page/MyPage/MyPage";
import Intro from "./component/page/Front/Intro";
import Login from "./component/page/Front/LoginPage/Login";
import Signup from "./component/page/Front/SignupPage/SignUp";
import FindPwd from "./component/page/Front/FindPassword/FindPwd";
import Loading from "./component/page/Loading/LoadingPage"
import RandomMatch from "./component/page/Loading/RandomMatch"
import Test from "./component/VideoChat/TestPage"
import TestPage from "./component/chat/TestPage"
import GoogleSignup from "./component/page/Front/LoginSocial/GoogleSignup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>

                <Route path="/test" element={<Test/>}></Route>
                <Route path="/testchat" element={<TestPage/>}></Route>
                <Route path="/loading" element={<Loading />}></Route>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/find_password" element={<FindPwd />}></Route>
                <Route path="/loading/match" element={<RandomMatch />}></Route>
                <Route path="/googlesignup" element={<GoogleSignup />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
