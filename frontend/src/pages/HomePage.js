import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="container">
      <h1>Group and People Management</h1>
      <Link to="/people" className="btn btn-primary">
        Manage People
      </Link>
      <Link to="/groups" className="btn btn-primary ms-3">
        Manage Groups
      </Link>
    </div>
  );
};

export default HomePage;
