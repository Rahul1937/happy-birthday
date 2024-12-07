import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Gallery from "./components/Gallery";
import HappyBirthday from "./components/HappyBirthday";
import Wishes from "./components/Wishes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/happy-birthday" element={<HappyBirthday />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/wishes" element={<Wishes />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
