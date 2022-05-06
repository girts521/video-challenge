import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import VideoThumb from "../Components/VideoThumb/VideoThumb";

const Container = styled.main`
  width: 90vw;
  margin: 10px auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(100px, 300px));
  grid-template-rows: repeat(auto-fill, 200px);
  grid-gap: 20px;
  justify-content: center;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(100px, 300px));
  }
`;

const Home: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("user logged in");
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
      } else {
        console.log("user logged out");
        // User is signed out
        // navigate to login
        navigate("/login");
      }
    });

  } , []);



  return (
    <Container>
      <VideoThumb
      videoName='jelly'
        videoImage="images/jelly1.png"
        videoUrl="https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_10MB.mp4"
      />

      <VideoThumb
      videoName="sintel"
        videoImage="images/sintel1.png"
        videoUrl="https://test-videos.co.uk/vids/sintel/mp4/av1/1080/Sintel_1080_10s_10MB.mp4"
      />

      <VideoThumb
    videoName="bigBuck"
        videoImage="images/bigBuck1.png"
        videoUrl="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4"
      />
    </Container>
  );
};

export default Home;
