// src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Ping from "./pages/Ping";
import Post from "./pages/Post";

function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/ping">Ping Form</Link> | <Link to="/post">Post Form</Link>
      </nav>

      <Routes>
        <Route path="/ping" element={<Ping />} />
        <Route path="/post" element={<Post />} />
        <Route path="*" element={<div>Select Ping or Post Form</div>} />
      </Routes>
    </div>
  );
}

export default App;
