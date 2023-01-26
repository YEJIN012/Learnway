import React from "react";
import Intro from "./component/page/Intro";
import Home from "./component/page/Home";
import MyPage from "./component/page/MyPage/MyPage";
import Logout from "./component/page/Logout";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/intro" element={<Intro />}></Route>
                <Route path="/" element={<Home />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
