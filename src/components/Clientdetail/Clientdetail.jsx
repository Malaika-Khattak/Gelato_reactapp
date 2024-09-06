import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Clientdetail.css";
import less_icon from "../../assests/less_icon.svg";
import uparrow from "../../assests/arrows.png";
import downarrow from "../../assests/down-arrow.png";
import cross_icon from "../../assests/cross_icon.png";

const Clientdetail = ({ setshowlogin }) => {
  const location = useLocation();
  const { startdate, selectedTimeSlot } = location.state || {};
  const navigate = useNavigate();
  const [seedetail, setseedetail] = useState(false);
  const [bookbtn, setbookbtn] = useState(false);

  const handlebackclick = () => {
    navigate(-1);
  };

  return (
    <div className="client">
      <div className="backwardbutton" onClick={handlebackclick}>
        <img src={less_icon} alt="" />
        <p>Back</p>
      </div>
      <div className="information">
        <div className="client_info">
          <h1>Client Details</h1>
          <p>Tell us a bit about yourself</p>
          <div className="loginn">
            Already have an account?
            <a
              onClick={() => {
                setshowlogin(true);
              }}
            >
              Log In{" "}
            </a>{" "}
            for faster booking.
          </div>
          <div className="detail">
            <div className="name_email">
              <div className="namee">
                <label>Name *</label>
                <input type="text" name="" id="" />
              </div>
              <div className="email">
                <label>Email *</label>
                <input type="email" name="" id="" />
              </div>
            </div>

            <div className="phone_msg">
              <label>Phone Number</label>
              <input type="text" name="" id="" />
              <div className="msg">
                <label>Add your Message</label>
                <input type="text" name="" id="" className="msg" />
              </div>
            </div>
          </div>
        </div>
        <div className="booking_detail">
          <div className="btn">
            <p>Booking Details</p>
            {seedetail === false ? (
              <img
                src={uparrow}
                alt=""
                srcset=""
                onClick={() => {
                  setseedetail(true);
                }}
              />
            ) : (
              <img
                src={downarrow}
                alt=""
                srcset=""
                onClick={() => {
                  setseedetail(false);
                }}
              />
            )}
          </div>
          <div className={seedetail === false ? "show_detail" : "hide"}>
            <p className="show_cream">ICE CREAM CART</p>
            <p>
              {startdate.toDateString()} at {selectedTimeSlot}
            </p>
            <p>Staff Member #1</p>
            <p>4 hr</p>
          </div>
          <div className="payment">
            <p className="pay">Payment Details</p>
            <div className="total">
              <p>Total</p>
              <span>$200</span>
            </div>

            <button
              type="button"
              onClick={() => {
                setbookbtn(true);
              }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
      <div className={bookbtn === true ? "confirm_cartbook" : "hide"}>
        <div className="confirm">
          <img
            src={cross_icon}
            onClick={() => {
              setbookbtn(false);
            }}
            alt="Close"
          />
          <h1>
            YOUR CART BOOKING IS CONFIRMED. THANK YOU FOR BOOKING OUR ICE CREAM
            CART
          </h1>
          <button
            type="button"
            onClick={() => {
              setbookbtn(false);
            }}
            alt="Close"
          >
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clientdetail;
