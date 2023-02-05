import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AWS from "aws-sdk";

const Img = styled.img`
    width: ${(props) => 
        props.width || '75px'};
    height: ${(props) => 
        props.width || '75px'};
    border-radius: 50%;
`

function ProfileImg(props) {
    // src : cloud.aws.s3.bucket.url~
    const { src, width } = props;

    // s3 bucket 이미지 읽어오기
    AWS.config.update({
        accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
        region: process.env.REACT_APP_S3_REGION,
    });
    const s3 = new AWS.S3();
    const [imageUrl, setImageUrl] = useState("");
    // s3.listBuckets()
    //     .promise()
    //     .then((data) => {
    //         console.log("S3 : ", JSON.stringify(data, null, 2));
    //     });
    
    useEffect(() => {
        const params = {
            Bucket: "learnway",
            Key: "fac88aa1aaf644e28c109cfd96250b68.png",
        };

        s3.getSignedUrlPromise("getObject", params, (err, url) => {
            if (err) {
                console.error(err);
                return;
            }

            setImageUrl(url);
            console.log(url);
        });
    }, []);
    return <Img src={imageUrl} width={width} />;
}

export default ProfileImg