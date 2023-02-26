import { OpenVidu } from "openvidu-browser";
import styled, { css } from "styled-components";
import axios from "axios";
import React, { Component } from "react";
import "./externalCss/VideoChatMain.css";
import Video from "./OvVideo";
import Translate from "./Translate/Translate";
import Report from "./Report/Report";
import Quit from "./Quit/Quit";
import SearchProfile from "./Friend/SearchProfile";
import Youtube from "./Youtube/Youtube";
import FloatingBtn from "./CommonComponent/FloatingBtn";
import RouteToMain from './RouteToMain';
import { motion } from "framer-motion";
import {useParams} from 'react-router-dom';
import BGAll from "../page/Front/introbackground/BGAll";


function withParams(Component){
    return props => <Component {...props} params={useParams()}/>
}

const Frame = styled.div`
  width: 100vw;
  height: 100vh;
  display: fle;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
`;

const FloatingBtnArea = styled.div`
  bottom: 1vw;
  right: 17vw;
`;

const VideoArea = styled.div`
  // height: 95vh;
  width: 95vw;
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
`;

const VideoFrame = styled(motion.div)`
  ${(props) =>
    props.fixSizeId >= 0 &&
    props.fixSizeId <= 4 &&
    css`
      display: flex;
      flex-direction: column;
      justify-content: center;
    `};
`;
const MyVideoFrame = styled.div`
  ${(props) =>
    props.fixSizeId === 9 &&
    css`
      width: 95vw;
      height: 95vh;
    `};
  ${(props) =>
    props.fixSizeId === 4 &&
    css`
      width: 30vw;
      height: 30vh;
    `}
  ${(props) =>
    props.fixSizeId >= 0 &&
    props.fixSizeId <= 3 &&
    css`
      width: 45vw;
      height: 45vh;
    `}
background:none;
`;

const OppoVideoFrame = styled.div`
  ${(props) =>
    props.fixSizeId === 9 &&
    css`
      position: fixed;
      z-index: 1;
      top: 3vw;
      left: 10vw;
      width: 20vw;
      height: 20vh;
    `}
  ${(props) =>
    props.fixSizeId === 4 &&
    css`
      position: unset;
      width: 30vw;
      height: 30vh;
    `}
${(props) =>
    props.fixSizeId >= 0 &&
    props.fixSizeId <= 3 &&
    css`
      position: unset;
      width: 45vw;
      height: 45vh;
    `}


background:none;
`;

const APPLICATION_SERVER_URL = process.env.NODE_ENV === "production" ? "" : "/api/video/";

class VideoChatMain extends Component {
  constructor(props) {
    super(props);
        this.state = {
            mySessionId: undefined,
            myUserName: undefined,
            oppoUserName: undefined,
            recorder:undefined,
            session: undefined,
            mainStreamManager: undefined, 
            publisher: undefined,
            subscribers: [],
            menu: 9,
            quitflag: 0,
            recordingId:undefined,
            oppolang:undefined,
            myLanguage:undefined,
            isStop:false
        };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.joinSession = this.joinSession.bind(this);
  }
  

  handleSetMenu(menuid) {
    if (this.state.menu === menuid) {
      this.setState({
        menu: 9,
      });
   
    } else {
      this.setState({
        menu: menuid,
      });
    }
  }
  
  getQuitFlag(flag) {
    if (flag === 1) {
      this.setState({
        menu: 9,
      });
      this.setState(
        {
          quitflag: 1,
        },
        () => {
          this.leaveSession();
        }
      );

    }}

     storeData(){
         let {sessionId, myId, oppoId, recorder, oppolang, mylang} = this.props.params;
        
         this.setState({
            mySessionId:sessionId,
            myUserName:myId,
            oppoUserName:oppoId,
            recorder:recorder,
            oppolang:oppolang,
            myLanguage:mylang
        })
      
    }

    componentDidMount() {
        window.addEventListener("beforeunload", this.onbeforeunload);
      
        this.storeData();
        this.joinSession();
    }
    
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onbeforeunload);
    }

    deleteSubscriber(streamManager) {
      let subscribers = this.state.subscribers;
      let index = subscribers.indexOf(streamManager, 0);
      if (index > -1) {
          subscribers.splice(index, 1);
          this.setState({
              subscribers: subscribers,
          });
      }
  }

onbeforeunload(event) {
  event.preventDefault();
  event.returnValue='';
   //this.leaveSession();
 }

 handleChangeUserName(e) {
   this.setState({
     myUserName: e.target.value,
   });
 }

 handleMainVideoStream(stream) {
   if (this.state.mainStreamManager !== stream) {
     this.setState({
       mainStreamManager: stream,
     });
   }
 }
    handleChangeSessionId(e) {
        this.setState({
          mySessionId: e.target.value,
        });
      }

      deleteSubscriber(streamManager) {
        let subscribers = this.state.subscribers;
        let index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            subscribers.splice(index, 1);
            this.setState({
                subscribers: subscribers,
            });
        }
    }

  deleteRoom(id) {
    axios
      .delete(`/api/chat/room/${id}`)
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  joinSession() {

    this.OV = new OpenVidu();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        mySession.on("streamCreated", (event) => {
          console.log("event" + event);
          if((this.state.subscribers).length < 1){
           
            var subscriber = mySession.subscribe(event.stream, undefined);
            var subscribers = this.state.subscribers;
            subscribers.push(subscriber);

            
            //여기 부분 레코드 시작 함수
            if(this.state.recorder === 'true' && this.state.isStop === false){
              console.log("음성 레코드 시작", this.state.isStop);
              this.startRecording();
            }
            console.log(this.state.subscribers)
            this.setState({
              subscribers: subscribers,
            });
          }
          });
          
        mySession.on("streamDestroyed", (event) => {
          //내 입장에서 상대방이 나갔을 때 레코드 중지 함수
          if(this.state.recorder === 'true' && this.state.isStop === false){
            this.stopRecording();
          }
          this.deleteSubscriber(event.stream.streamManager);
          this.leaveSession();
        });

        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        this.getToken().then((token) => {
        
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
            
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
              
                resolution: `${"1280"}x${"720"}`,
                frameRate: 30,
                insertMode: "APPEND",
                mirror: false, 
              });

      
              mySession.publish(publisher);

           
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter(
                (device) => device.kind === "videoinput"
              );
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });

            })
            .catch((error) => {
              console.log(
                "There was an error connecting to the session:",
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {

    const mySession = this.state.session;

    //내가 나갔을 때 녹화 종료
    if(this.state.recorder === 'true'&& this.state.isStop === false){
      console.log("음성 녹화 종료:내가 나감")
      this.stopRecording();
    }
    if (mySession) {
    setTimeout(()=>mySession.disconnect(),3000);
      
    }

    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: "SessionA",
      myUserName: "Participant" + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });

  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

    render() {
        const menuList = {
            0: <Report user={this.state.oppoUserName}/>,
            1: <Quit getQuitFlag={this.getQuitFlag.bind(this)}/>,
            2: <SearchProfile user={this.state.oppoUserName}/>,
            3: <Translate/>,
            4: (
                <Youtube
                    myId={this.state.myUserName}
                    oppoId={this.state.oppoUserName}
                />
            ),
        };
        return (<>
                <FloatingBtn handleSetMenu={this.handleSetMenu.bind(this)} func={this.leaveSession}/>
            <Frame>
                <FloatingBtn
                    handleSetMenu={this.handleSetMenu.bind(this)}
                    func={this.leaveSession}
                />

      
                <VideoArea>
                    {this.state.session === undefined ? (
                        <RouteToMain/>
                    ) : null}

                    {menuList[this.state.menu]}
                    
                    {this.state.session !== undefined ? (
                        <VideoFrame
                            id="video-container"
                            layout
                            fixSizeId={this.state.menu}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              duration: 0.8,
                              delay: 0.1,
                              ease: [0, 0.71, 0.2, 1.01]
                            }}
                        >
                            {this.state.publisher !== undefined ? (
                                
                                <Video streamManager={this.state.publisher} pubsub={'small'} size={this.state.menu} />
                                
                                ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                
                                <Video streamManager={sub}  pubsub={'large'}  size = {this.state.menu}/>
                                
                                ))}
                        </VideoFrame>
                    ) : null}
                </VideoArea>
        
                </Frame>
                <BGAll id = {0}/>
    </>         
        );
    }
    
    
    async getToken() {
        const sessionId = await this.createSession(this.state.mySessionId);
        return await this.createToken(sessionId);
    }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.sessionId;
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data;
  }

  async startRecording() {
    await axios.post(APPLICATION_SERVER_URL+ "recording/start", 
    {
      session: this.state.mySessionId,
      outputMode: "COMPOSED", 
      hasAudio: true,
      hasVideo: false,
    }).then((res=>{
      this.setState({recordingId: res.data});   //레코딩 아이디
    }))
  }

  async stopRecording() {
    await axios.post(
      APPLICATION_SERVER_URL+ "recording/stop",
      {
        userEmail:this.state.myUserName,
        friendEmail:this.state.oppoUserName,
        recordId: this.state.recordingId,  //녹화 종료할 때 레코딩 아이디 준다.
        userLanguageId:this.state.myLanguage,
        friendLanguageId:this.state.oppolang
      }
    ).then((res)=>{
      this.setState({
        isStop:true
      })
    })
  }


}

export default withParams(VideoChatMain);
