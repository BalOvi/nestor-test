import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GroupsPage from "./pages/GroupsPage";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/groups" element={<GroupsPage />} />
    </Routes>
  </Router>
);

export default App;
