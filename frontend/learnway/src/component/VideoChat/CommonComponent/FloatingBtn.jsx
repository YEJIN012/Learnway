import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TranslateIcon from "@mui/icons-material/Translate";
import BadgeIcon from "@mui/icons-material/Badge";
import LogoutIcon from "@mui/icons-material/Logout";
import WbTwilightIcon from "@mui/icons-material/WbTwilight";
import { Action, Fab } from "react-tiny-fab";

export default function FloatingBtn(props) {
    const { handleSetMenu } = props;
    const [selected, setSelected] = useState("");
    const handleSetSelected = (props) => {
        handleSetMenu(props);
        if (props === selected) {
            setSelected()
        } else {
            setSelected(props);
        }
    };
    const menuList = {
        "Report" : <WbTwilightIcon sx={{color: "#005AA7"}}/>,
        "Leave" : <LogoutIcon sx={{ color: "#005AA7"}}/>,
        "Your Profile": <BadgeIcon sx={{ color: "#005AA7"}}/>,
        "Translate" : <TranslateIcon sx={{ color: "#005AA7"}}/>,
        "Youtube" : <YouTubeIcon sx={{ color: "#005AA7"}}/>,
    };
    // console.log(Object.keys(menuList));
    return (
        <>
            <Fab icon={<AddIcon />} mainButtonStyles={{backgroundColor:"#005AA7"}} >
                {Object.keys(menuList).map((e, index) => (
                        <Action
                            style={(index === selected) ? {backgroundColor:"#ffffff", scale:"1.2"} : {backgroundColor:"#e9e9e9"}}
                            key={index}
                            text={e}
                            onClick={() => handleSetSelected(index)}
                        >
                            {menuList[e]}
                        </Action>
                ))}
            </Fab>
        </>
    );
}