import React, { useState } from "react";
import styled, { css } from "styled-components";
import ReactPlayer from "react-player";
import { useNavigate  } from "react-router-dom";

type MyProps = {
  image?: string;
  playing: Boolean;
};

const VideoContainer = styled.div<MyProps>`
  display: flex;
  justify-content: center;

  height: 200px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  ${(props) =>
    props.playing
      ? ""
      : css`
          background-image: url(${(props: MyProps) =>
            props.image ? props.image : "images/placeholder.png"});
        `}

  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  :hover {
    transform: scale(1.1);
    transition: all 0.4s ease-in-out;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
  }
`;

const VideoThumb: React.FC<{ videoUrl: string; videoImage: string, videoName: string }> = ({
  videoUrl,
  videoImage,
  videoName
}) => {

    const navigate = useNavigate();
  const [video, setVideo] = useState(false);


  const redirect = () => {
      //redirect to video page base on name
        navigate(`/video/${videoName}`);
  }

  return (
    <VideoContainer
    onClick={redirect}
      playing={video}
      onMouseEnter={() => {
        setVideo(true);
      }}
      onMouseLeave={() => {
        setVideo(false);
      }}
      image={videoImage}
    >
      {video && (
        <ReactPlayer
          url={videoUrl}
          autoPlay
          playing={true}
          width={"100%"}
          height={"100%"}
        />
      )}
    </VideoContainer>
  );
};

export default VideoThumb;
