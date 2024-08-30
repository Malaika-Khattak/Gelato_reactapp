import React from "react";
import "./Footer.css";
import facebook from "../../assests/facebook.png";
import instagram from "../../assests/instagram.png";
import twitter from "../../assests/twitter.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <div className="upp">
          <div className="footer-left-text">
            <h3>ADDRESS</h3>
            <p>500 Terry Francine </p>
            <p>St.San Francisco,</p>
            <p>CA 94158</p>
          </div>
          <div className="footer-left-text">
            <h3>CONTACT</h3>
            <p>info@mysite.com</p>
            <p>Tel: 123-456-7890</p>
          </div>
          <div className="footer-left-text">
            <h3>HOURS</h3>
            <p>OPEN DAILY</p>
            <p>8AM-10PM</p>
          </div>
        </div>
        <div className="down">
          <p>©2035 by Gelato. Powered and secured by Gelato</p>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-right-input">
          <h1>MAILING LIST</h1>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your email here*"
          />
          <button>SUBSCRIBE</button>
        </div>
        <div className="social-media">
          <img src={facebook} alt="" />
          <img src={twitter} alt="" />
          <img src={instagram} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
