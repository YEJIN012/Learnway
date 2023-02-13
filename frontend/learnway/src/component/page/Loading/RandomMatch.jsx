import React, { useEffect, useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./RandomMatch.css";
import logo from "../../page/Front/img/logo_skyblue.png";
import styled from "styled-components";
import ProfileImg from "../../ui/ProfileImg";
import { useNavigate, useParams } from "react-router-dom";
import ProfileImgPoint from "../../ui/ProfileImgPoint";

const Lang = styled.div`
    width: 30%;
    height: 10vh;
    font-size: 7vh;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
`;

const Text = styled.div`
    display: block;
    font-size: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: 600;
`;

const Interest = styled.div`
    height: 2em;
    width: inherit;
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-left: -8px;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    padding-left: 0.5em;
    padding-right: 0.5em;
    border-radius: 20px;
    background-color: #f0f0f0;
    font-weight: bold;
    font-size: 1.05em;
`;

export default function RandomMatch(props) {
    const myInfo = useSelector((state) => state.AuthReducer);
    const oppoInfo = useSelector((state=>state.OpponentReducer));
    // const { oppoId, sessionId } = props;
    //const oppoId = "learnwaytest@gmail.com";
    const {roomId} = useParams();
    
    const [friendCnt, setFriendCnt] = useState("");
    //const [oppoInfo, setOppoInfo] = useState(opusr);
    //setOppoInfo(opusr)
    const delayTime = 7000;
    const [isTimeout, setIsTimeout] = useState(false);
    const navigate = useNavigate();
    console.log(oppoInfo, roomId)
    

        async function getFriendCnt() {
            try {
                const res = await axios.get("/api/friend/count", {
                    params: { userEmail: oppoInfo.userEmail },
                });
                console.log(res);
                setFriendCnt(res.data.friendCnt);
            } catch (error) {
                console.log(error);
            }
        }
    
        /*
        async function getUserInfo() {
            try {
                const res = await axios

                // 화상 상대방 Info
                .get(`/api/users/profile/${oppoId}`);

            console.log(res.data);
            const data = res.data.profile;

            setOppoInfo({
                name: data.name,
                email: data.userEmail,
                birth: data.birthDay,
                friends: "",
                img: data.imgUrl,
                lang: data.language,
                interest: data.interests,
                bio: data.bio,
            });
            console.log(oppoInfo);
            console.log(oppoInfo.img);
            console.log(oppoInfo.interest);
        } catch (err) {
            console.log(err);
        }
    }
*/
    function interestRernderer(array) {
        let result = "";
        if (array) {
            for (let i = 0; i < array.length; i++) {
                result += "#" + array[i].field + "  ";
            }
        }
        return result;
    }

    function redirect(){
        if(isTimeout === true){
            navigate(`/openvidu/${roomId}/${myInfo.userEmail}/${oppoInfo.userEmail}`,{replace: true})
            window.location.reload();
                
        }
    }


    useLayoutEffect(() => {
        let timer = setTimeout(async () => {
            setIsTimeout(true);
        }, delayTime);
        //getUserInfo();
        getFriendCnt();
    }, []);
    console.log(isTimeout)
    return (
        <>
            {isTimeout === true ? (
                
                redirect()
                
                ) : (
                    <div className="frame">
                    <div className="framebody">
                        <main className="ticket-system">
                            <div className="top">
                                <h1 className="title">
                                    😊 We succeeded in random matching based on
                                    your interest
                                    <br />
                                    ✈️ Please get ready to board now
                                </h1>
                                <div className="printer" />
                            </div>
                            <div className="receipts-wrapper">
                                <div className="receipts">
                                    <div className="receipt">
                                        <img src={logo} alt="" width={"150"} />

                                        <div className="route">
                                            <Lang>{myInfo.language.code}</Lang>
                                            <svg
                                                className="plane-icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 510 510"
                                            >
                                                <path
                                                    fill="#91a8d0"
                                                    d="M497.25 357v-51l-204-127.5V38.25C293.25 17.85 275.4 0 255 0s-38.25 17.85-38.25 38.25V178.5L12.75 306v51l204-63.75V433.5l-51 38.25V510L255 484.5l89.25 25.5v-38.25l-51-38.25V293.25l204 63.75z"
                                                />
                                            </svg>
                                            <Lang>{oppoInfo.language.code}</Lang>
                                        </div>
                                        <div className="details">
                                            <div className="item">
                                                <span>Name</span>
                                                <h3>{oppoInfo.name}</h3>
                                            </div>
                                            <div className="item">
                                                <span>Birth</span>
                                                <h3>{oppoInfo.birthDay}</h3>
                                            </div>
                                            <div className="item">
                                                <span>Email</span>
                                                <h6>{oppoInfo.userEmail}</h6>
                                            </div>
                                            <div className="item">
                                                <span>Friends</span>
                                                <h3>{friendCnt}</h3>
                                            </div>
                                        </div>
                                        <div className="details">
                                            <div className="item">
                                                <span>Bio</span>
                                                <h3>{oppoInfo.bio}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="receipt qr-code">
                                        <ProfileImgPoint
                                            src={oppoInfo.imgUrl}
                                        ></ProfileImgPoint>
                                        <div className="description">
                                            <Text>Hi🙌</Text>
                                            <Text>Our interest is</Text>
                                            <Interest>
                                                {interestRernderer(
                                                    oppoInfo.interests
                                                )}
                                            </Interest>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}
