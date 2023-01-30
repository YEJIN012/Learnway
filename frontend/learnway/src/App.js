import React from "react";
import Home from "./component/page/MainPage/Home";
import MyPage from "./component/page/MyPage/MyPage";
import Intro from "./component/page/Front/Intro";
import Login from "./component/page/Front/Login";
import Logout from "./component/page/Front/Logout";
import Loading from "./component/page/Loading/LoadingPage"
import VideoChatMain from "./component/page/VideoChat/VideoChatMain";
import Test from "./component/page/VideoChat/TestPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                
                <Route path="/" element={<Test/>}></Route>
                
                <Route path="/video" element = {<VideoChatMain/>}></Route>
                <Route path="/loading" element={<Loading />}></Route>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>ㅋ
            </Routes>
        </BrowserRouter>
    );
}

export default App;
