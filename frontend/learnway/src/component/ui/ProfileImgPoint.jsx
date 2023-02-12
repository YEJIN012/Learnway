import React from "react";
import ProfileImg from "../ui/ProfileImg";


function ProfileImgPoint({imgUrl, width}) {
    return (
            <ProfileImg src={imgUrl} width={width} />

    );
}
export default ProfileImgPoint;
