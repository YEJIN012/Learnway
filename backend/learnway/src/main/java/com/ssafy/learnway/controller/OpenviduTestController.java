package com.ssafy.learnway.controller;

import io.openvidu.java.client.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;

@RestController
public class OpenviduTestController {
    @GetMapping("/")
    public String home() throws OpenViduJavaClientException, OpenViduHttpException, MalformedURLException {
        OpenVidu openvidu = new OpenVidu("https://ec2-13-125-118-73.ap-northeast-2.compute.amazonaws.com/", "test");
        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = openvidu.createSession(properties);

//        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
//                .type(ConnectionType.WEBRTC)
//                .role(OpenViduRole.PUBLISHER)
//                .data("user_data")
//                .build();
//        Connection connection = session.createConnection(connectionProperties);
//        String token = connection.getToken(); // Send this string to the client side

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.IPCAM)
                .rtspUri("rtsp://http://localhost:8080/:7777/path")
                .adaptativeBitrate(true)
                .onlyPlayWithSubscribers(true)
                .networkCache(2000)
                .build();
// "session" being a Session object
        Connection ipcamConnection = session.createConnection(connectionProperties);
        String token = ipcamConnection.getToken(); // Send this string to the client side

        return token;
    }




}
