import React from "react";
import Home from "./component/page/MainPage/Home";
import MyPage from "./component/page/MyPage/MyPage";
import Logout from "./component/page/Logout";
import NavBar from "./component/ui/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            {/* <NavBar/> */}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/mypage" element={<MyPage />}></Route>
                <Route path="/logout" element={<Logout />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
