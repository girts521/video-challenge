import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-top: 1rem;
  text-transform: capitalize;
`;

const VideoContainer = styled.main`
  position: relative;
  width: 90vw;
  height: 60vh;
  border: 1px solid #ccc;
  margin: 20px auto;
  background-color: black;
`;

const VideoOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  z-index: 1;
`;

type RelatedVideoType = {
  videoImg: string;
};

const RelatedVideo = styled.div<RelatedVideoType>`
  width: 40%;
  height: 30%;
  margin: 10px;
  background-image: url(${(props: RelatedVideoType) => props.videoImg ? props.videoImg : "images/placeholder.png"});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

const VideoOverlayToggle = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  z-index: 2;
  font-size: 0.8rem;
  font-weight: bold;
  color: #fff;
  &:hover {
    color: #ccc;
  }
`;

const ToggleComments = styled.div`
  background-color: #ccc;
  border: none;
  border-radius: 7px;
  padding: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  width: 90vw;
  margin: 0 auto;
  text-align: center;
  &:hover {
    background-color: #ddd;
  }
`;

const Comments = styled.section`
  width: 50vw;
  margin: 20px auto;

  h1 {
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
    margin: 1rem;
  }
`;

const Comment = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* align-items: center; */
  padding: 10px;
  margin: 10px;
  border-bottom: 1px solid #ccc;

  :last-child {
    border-bottom: none;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
    /* margin: 7px; */
    padding: 7px;
  }

  p {
    font-size: 1rem;
    padding: 7px;
  }
`;

const CreateComment = styled.div`
  margin: 30px auto;
  width: 90vw;

  input {
    width: 50vw;
    margin: 5px auto;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 7px;
    font-size: 1rem;
    outline: none;
  }

  textarea {
    width: 50vw;
    height: 10vh;
    border: 1px solid #ccc;
    border-radius: 7px;
    padding: 5px;
    font-size: 1rem;
    margin: 5px auto;
    resize: none;
  }

  button {
    background-color: #ccc;
    border: none;
    border-radius: 7px;
    padding: 5px;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    width: 50vw;
    margin: 0 auto;
    text-align: center;
    &:hover {
      background-color: #ddd;
      box-shadow: 0px 0px 5px #ccc;
    }
  }
`;

const commentsArray = {
  jelly: [
    {
      name: "John",
      comment: "I loved this jelly video",
    },

    {
      name: "Jane",
      comment: "I liked this jelly video too",
    },
    {
      name: "Jack",
      comment: "I really liked this jelly video",
    },
  ],

  bigBuck: [
    {
      name: "John",
      comment: "I loved this big  buck bunny video",
    },

    {
      name: "Jane",
      comment: "I liked this big  buck bunny video too",
    },
    {
      name: "Jack",
      comment: "I really liked big  buck bunny this video",
    },
  ],

  sintel: [
    {
      name: "John",
      comment: "I loved this sintel video",
    },

    {
      name: "Jane",
      comment: "I liked this sintel video too",
    },
    {
      name: "Jack",
      comment: "I really liked sintel this video",
    },
  ],
};

const Video: React.FC = () => {
  //get videoId from url
  const urlParams = useParams();
  const videoId = urlParams.videoId;
  const navigate = useNavigate();

  //state for toggling comments
  const [toggleComments, setToggleComments] = useState(false);

  //state for creating comment
  const [commentCreated, setCommentCreated] = useState(false);

  //state for incorrent comment
  const [incorrectComment, setIncorrectComment] = useState(false);

  //state for toggling related videos
  const [toggleRelatedVideos, setToggleRelatedVideos] = useState(false);

  //username and comment value with useRef
  const username = useRef<HTMLInputElement>(null);
  const comment = useRef<HTMLTextAreaElement>(null);

  //function to create comment
  const createComment = () => {
    if (username.current?.value.length && comment.current?.value.length) {
      const newComment = {
        name: username.current.value,
        comment: comment.current.value,
      };

      if (videoId === "jelly") {
        commentsArray.jelly.push(newComment);
      } else if (videoId === "bigBuck") {
        commentsArray.bigBuck.push(newComment);
      } else if (videoId === "sintel") {
        commentsArray.sintel.push(newComment);
      }

      username.current.value = "";
      comment.current.value = "";
      setCommentCreated(true);
    } else {
      setIncorrectComment(true);
    }
  };

  //function to redirect after clicking on related video
  const redirect = (videoName: string) => {
    navigate(`/video/${videoName}`);
  };

  //update comments section after comment is created
  useEffect(() => {
    if (commentCreated) {
      setTimeout(() => {
        setCommentCreated(false);
      }, 1000);
    }

    if (incorrectComment) {
      setTimeout(() => {
        setIncorrectComment(false);
      }, 1000);
    }
  }, [commentCreated, incorrectComment]);

  return (
    <>
      <Heading>{videoId}</Heading>

      <VideoContainer>
        <VideoOverlayToggle
          onClick={() => {
            setToggleRelatedVideos(!toggleRelatedVideos);
          }}
        >
          Show Related Videos
        </VideoOverlayToggle>
        {toggleRelatedVideos && (
          <VideoOverlay>
            <RelatedVideo
              onClick={() => {
                redirect("jelly")
                setToggleRelatedVideos(false);
              }}
              videoImg={`/images/jelly1.png`}
            />

            <RelatedVideo
              onClick={() => {
                redirect("bigBuck")
                setToggleRelatedVideos(false);
              }}
              videoImg={`/images/bigBuck1.png`}
            />

            <RelatedVideo
              onClick={() => {
                redirect("sintel")
                setToggleRelatedVideos(false);
              }}
              videoImg={`/images/sintel1.png`}
            />
          </VideoOverlay>
        )}

        {videoId === "jelly" && (
          <ReactPlayer
            url={
              "https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_10MB.mp4"
            }
            width={"100%"}
            height={"100%"}
            controls={true}
          />
        )}

        {videoId === "bigBuck" && (
          <ReactPlayer
            url={
              "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_10MB.mp4"
            }
            width={"100%"}
            height={"100%"}
            controls={true}
          />
        )}

        {videoId === "sintel" && (
          <ReactPlayer
            url={
              "https://test-videos.co.uk/vids/sintel/mp4/av1/1080/Sintel_1080_10s_10MB.mp4"
            }
            width={"100%"}
            height={"100%"}
            controls={true}
          />
        )}
      </VideoContainer>

      <ToggleComments
        onClick={() => {
          setToggleComments(!toggleComments);
        }}
      >
        {" "}
        Toggle Comments{" "}
      </ToggleComments>

      {toggleComments && (
        <Comments>
          <h1>Comments</h1>

          {videoId === "jelly" &&
            commentsArray.jelly.map((comment) => {
              return (
                <Comment key={Math.random()}>
                  <h3>{comment.name}</h3>
                  <p>{comment.comment}</p>
                </Comment>
              );
            })}

          {videoId === "bigBuck" &&
            commentsArray.bigBuck.map((comment) => {
              return (
                <Comment key={Math.random()}>
                  <h3>{comment.name}</h3>
                  <p>{comment.comment}</p>
                </Comment>
              );
            })}

          {videoId === "sintel" &&
            commentsArray.sintel.map((comment) => {
              return (
                <Comment key={Math.random()}>
                  <h3>{comment.name}</h3>
                  <p>{comment.comment}</p>
                </Comment>
              );
            })}

          <CreateComment>
            {incorrectComment && <p>Please fill in all fields</p>}
            <input ref={username} type="text" placeholder="Username" />
            <textarea
              ref={comment}
              placeholder="Your comment"
              cols={30}
              rows={10}
            ></textarea>
            <button
              onClick={() => {
                createComment();
              }}
            >
              Create
            </button>
          </CreateComment>
        </Comments>
      )}
    </>
  );
};
export default Video;
