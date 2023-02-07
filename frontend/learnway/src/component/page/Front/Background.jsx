import React from "react";
import styled from "styled-components";

const Bg = styled.div`
width: 100vw;
height: 100vh;
display: flex;
background-size: cover;
background-image: linear-gradient(to right, #005aa7,#fffde4);
`

export default function BackroundFrame ({bg}) {
  return(
    <Bg >{bg}</Bg>
  )
}