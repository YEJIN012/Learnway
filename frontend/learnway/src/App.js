import React from "react";
import Intro from "./component/page/Intro";
import Home from "./component/page/Home";
import MyPage from "./component/page/MyPage/MyPage";
import Logout from "./component/page/Logout";
import Login from "./component/page/Login";
import NavBar from "./component/ui/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* <NavBar/> */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
