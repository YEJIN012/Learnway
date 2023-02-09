import React from "react";
import NavBar from "../../ui/NavBar";
import Body from "./Body";
import Body2 from "./Body2";
import Animation from "./MainAnimation";

function Home(params) {
    return (
        <div>
            <NavBar></NavBar>
            <Animation></Animation>
            {/* <Body></Body> */}
            <Body2></Body2>
        </div>
    );
}
export default Home;
