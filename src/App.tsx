import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Routes, Route, Link } from "react-router-dom";

import Nav from "./Components/Nav";
import Home from "./Pages/Home";
import Video from "./Pages/Video";
import Login from "./Pages/Login";

import "./reset.css";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/video/:videoId" element={<Video />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;
