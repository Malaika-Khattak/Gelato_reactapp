import React, { useEffect, useState } from "react";
import "./Booking.css";
import back from "../../assests/icecone.jpeg";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useNavigate } from "react-router-dom";
import Bookcart from "../Bookcart/Bookcart";

const Booking = () => {
  const navigate = useNavigate();

  const [img, setImg] = useState(window.innerWidth <= 480);
  const [arrow, setarrow] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setImg(window.innerWidth <= 480);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handlescroll = () => {
      const scrollposition = window.scrollY;
      const windowheight = window.innerHeight;
      const documentheight = document.body.scrollHeight;

      if (scrollposition > documentheight * 0.5 - windowheight * 0.5) {
        setarrow(true);
      } else {
        setarrow(false);
      }
    };

    window.addEventListener("scroll", handlescroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handlescroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="booking">
      <div className="booking_heading">
        <p>CATERING & MORE</p>
        <p className="heading">EVENTS</p>
      </div>
      <div className="booking_book">
        <div className="top">
          <div className="top_content">
            <div className="top_content_text">
              <div>
                <p className="head">THE BEST ICE CREAM</p>
                <p className="cursive">For the best party!</p>
              </div>

              <p className="parag">
                Looking to throw the ultimate party? Look no further than our
                exquisite ice cream selection! Our creamy, delicious ice cream
                is crafted to delight every palate, ensuring your party is the
                talk of the town. With a variety of flavors ranging from classic
                vanilla and rich chocolate to exotic mango and tangy raspberry
                sorbet, there's something for everyone.
              </p>
            </div>

            <div className="book">
              <div>
                <p
                  className="cart"
                  onClick={() => {
                    navigate("/bookcart");
                  }}
                >
                  ICE CREAM CART
                </p>
                <p>4 hr</p>
                <p>$200</p>
                <button
                  onClick={() => {
                    navigate("/bookcart");
                  }}
                >
                  BOOK NOW
                </button>
              </div>
            </div>
          </div>
        </div>

        {
          <div className="under">
            <img src={back} alt="" />
          </div>
        }
      </div>
      {arrow && <div className="showarrow" onClick={scrollToTop}></div>}
    </div>
  );
};

export default Booking;
