import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-content-title">
          <h3>HAND CRAFTED</h3>
          <p className="title">ICE CREAM</p>
          <button onClick={() => navigate("/orderonline")}>OUR FLAVOR</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
