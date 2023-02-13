import { OpenVidu } from "openvidu-browser";
import styled, { css } from "styled-components";
import axios from "axios";
import React, { Component } from "react";
import "./VideoChatMain.css";
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
import {connect} from 'react-redux';


function withParams(Component){
    return props => <Component {...props} params={useParams()}></Component>
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
  height: 95vh;
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


let socketId = null;
const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "/api/video/";
class VideoChatMain extends Component {
  constructor(props) {
    super(props);

        // These properties are in the state's component in order to re-render the HTML whenever their values change
        this.state = {
            mySessionId: undefined,
            myUserName: undefined,
            oppoUserName: undefined,
            recorder:undefined,
            session: undefined,
            mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
            publisher: undefined,
            subscribers: [],
            menu: 9,
            quitflag: 0,
            socketId: undefined,
            recordingId:undefined,
            oppolang:undefined,
            myLanguage:undefined
        };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.joinSession = this.joinSession.bind(this);
    //this.handleSetMenu = this.handleSetMenu(this);
    //this.getQuit = this.handleQuit.bind(this);
    this.makeRoom = this.makeRoom.bind(this);
    //this.store = this.makeRoom.bind(this);
    //this.storeData = this.storeData.bind(this);
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

      console.log("flag is " + flag);
    }}

     storeData(){
         let {sessionId, myId, oppoId, recorder, oppolang, mylang} = this.props.params;
         console.log(sessionId, myId, oppoId, recorder);
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
        this.joinSession();
        this.makeRoom();
        this.storeData();
    }
    
    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onbeforeunload);
    }


onbeforeunload(event) {
   this.leaveSession();
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

  async makeRoom() {
    const res = await axios.post(`/api/youtube/create`, {
      userEmail: this.state.myUserName,
      friendEmail: this.state.oppoUserName,
    });
    this.setState({
      socketId: res.data.roomId,
    });
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
    
    //this.makeRoom()
    //console.log("소켓아이디" + socketId)
    //get room id fot websocket
    //this.makeRoom(this.state.oppoUserNameS)
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // --- 2) Init a session ---

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        // --- 3) Specify the actions when events take place in the session ---
        //console.log("mySession", mySession)
        // On every new Stream received...
        mySession.on("streamCreated", (event) => {
          console.log("event" + event);
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);
          
          //여기 부분 레코드 시작 함수
          if(this.state.recorder === 'true'){
            console.log("음성 레코드 시작");
            this.startRecording();
          }
          console.log(this.state.subscribers)
          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
        });

        // On every Stream destroyed...
        mySession.on("streamDestroyed", (event) => {
          // Remove the stream from 'subscribers' array
          console.log(event)
          
          
          //내 입장에서 상대방이 나갔을 때 레코드 중지 함수
          if(this.state.recorder === 'true'){
            console.log("음성녹음 중지(상대방 나감)")
            this.stopRecording();
          }
          setTimeout(()=>this.deleteSubscriber(event.stream.streamManager), 3000);
          
          //console.log(this.state.subscribers)
        });

        // On every asynchronous exception...
        mySession.on("exception", (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // T+he source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                //resolution: `${window.screen.availWidth}x${window.screen.availHeight}`, // The resolution of your video
                resolution: `${"1280"}x${"720"}`, // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
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

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });

              //todo
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
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    //내가 나갔을 때 녹화 종료
    if(this.state.recorder === 'true'){
      console.log("음성 녹화 종료:내가 나감")
      this.stopRecording();
    }
    if (mySession) {
    setTimeout(()=>mySession.disconnect(),3000);
      
    }

    // Empty all properties...
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
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
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
        console.log(this.state.socketId);
        console.log(this.state.oppoUserName);
        //const matchData = {sessionId : 'abdhfhueh', myId : "aaa@ssafy.com", oppoId:"bbb@ssafy.com"};
        //        const mySessionId = this.state.mySessionId;
        //        const myUserName = this.state.myUserName;
        console.log(this.state.menu);
        const menuList = {
            0: <Report user={this.state.oppoUserName}></Report>,
            1: <Quit getQuitFlag={this.getQuitFlag.bind(this)}></Quit>,
            2: <SearchProfile user={this.state.oppoUserName}></SearchProfile>,
            3: <Translate></Translate>,
            4: (
                <Youtube
                    sockId={this.state.socketId}
                    myId={this.state.myUserName}
                    oppoId={this.state.oppoUserName}
                ></Youtube>
            ),
        };
        return (<>
                <FloatingBtn handleSetMenu={this.handleSetMenu.bind(this)} func={this.leaveSession}></FloatingBtn>
            <Frame>
                <FloatingBtn
                    handleSetMenu={this.handleSetMenu.bind(this)}
                    func={this.leaveSession}
                ></FloatingBtn>

      
                <VideoArea>
                    {this.state.session === undefined ? (
                        <RouteToMain></RouteToMain>
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
                                
                                <Video streamManager={this.state.publisher} pubsub={'pub'} size={this.state.menu} />
                                
                                ) : null}
                            {this.state.subscribers.map((sub, i) => (
                                
                                <Video streamManager={sub}  pubsub={'sub'}  size = {this.state.menu}/>
                                
                                ))}
                        </VideoFrame>
                    ) : null}
                </VideoArea>
        
                </Frame>
    </>
        );
    }
    
    
    async getToken() {
        console.log("gg" + this.state.mySessionId);
        console.log("gg" + this.state.myUserName);
        
        const sessionId = await this.createSession(this.state.mySessionId);
        console.log(sessionId);
        return await this.createToken(sessionId);
    }

  async createSession(sessionId) {
    //await this.makeRoom()

    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data.sessionId; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("token:" + response.data);

    return response.data; // The token
  }

  async startRecording() {
    console.log(this.state.mySessionId,this.state.myUserName, this.state.oppoUserName, this.state.recorder, this.state.oppolang)
    console.log(this.state.oppoInfo);
    await axios.post(APPLICATION_SERVER_URL+ "recording/start", 
    {
      session: this.state.mySessionId,
      outputMode: "COMPOSED", 
      hasAudio: true,
      hasVideo: false,
    }).then((res=>{
      console.log(res);
      this.setState({recordingId: res.data});   //레코딩 아이디
    }))
  }

  async stopRecording() {
    console.log(this.state.mySessionId,this.state.myUserName, this.state.oppoUserName, this.state.recordingId, this.state.oppolang)
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
      console.log(res);  //성공 or 실패
    })
  }
}

export default withParams(VideoChatMain);
