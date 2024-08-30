import React, { useState, useEffect } from "react";
import "./Body.css";
import straw from "../../assests/straw.png";
import scones from "../../assests/scones.jpeg";
import outdoor from "../../assests/outdoor.jpg";
import macarons from "../../assests/macarons.jpg";
import icecone from "../../assests/icecone.png";
import Apricot from "../../assests/Apricot.png";
import Chocolate from "../../assests/Chocolate.png";
import Strawberry from "../../assests/Strawberry.png";
import blue from "../../assests/blue.png";
import Menta from "../../assests/Menta.png";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Body = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState(window.innerWidth <= 480);

  useEffect(() => {
    const handleResize = () => {
      setImg(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 767) {
      gsap.to(".size", {
        y: 200,
        rotation: 360,
        duration: 3,
        repeat: -1,
        yoyo: true,
      });
    }
  }, [img]); // Add img as a dependency to re-run the effect on resize

  return (
    <>
      <div className="body">
        <div className="backlayer">
          <div className="backlayer1">
            <img src={straw} alt="" className="size" />
          </div>
        </div>
        <div className="upperlayer">
          <div className="upperlayer1">
            <div className="upper3-content">
              <div className="content1">
                <h1>OUR FLAVORS</h1>
                <p className="cursive">Fresh n' Tasty!</p>
              </div>
              <p>
                Welcome to Gelato Heaven, where every scoop is a journey through
                a world of exquisite flavors! Our ice cream shop boasts a
                delightful array of both classic and innovative flavors, crafted
                to tantalize your taste buds.
              </p>

              <button
                onClick={() => {
                  navigate("/flavor");
                }}
              >
                MENU
              </button>
            </div>
            <img src={scones} alt="" />
          </div>
          <div className="upperlayer2">
            <p className="enjoy">ENJOY</p>
            <p className="dairy">DAIRY FREE</p>
            {img && <img src={straw} alt="" />}
            <button
              onClick={() => {
                navigate("/orderonline");
              }}
            >
              Order Online
            </button>
          </div>
          <div className="upperlayer3">
            <div className="upper3-content">
              <div className="content1">
                <h1>OUR PLACE</h1>
                <p className="cursive">Ice cream by the sea</p>
              </div>
              <p>
                Welcome to Gelato Heaven, where not only can you indulge in our
                delicious array of ice cream flavors, but you can also enjoy
                your treat in our charming outdoor seating area.
              </p>
              <button
                onClick={() => {
                  navigate("/about");
                }}
              >
                READ MORE
              </button>
            </div>
            <img src={outdoor} alt="" />
          </div>
          <div className="upperlayer4">
            <p className="enjoy">GET YOURS</p>
            <p className="dairy">WE DELIVER</p>
            {img && <img src={blue} alt="" />}
            <button
              onClick={() => {
                navigate("/orderonline");
              }}
            >
              Order Online
            </button>
          </div>
          <div className="upperlayer5">
            <div className="upper3-content">
              <div className="content1">
                <h1>DESSERTS</h1>
                <p className="cursive">Ice cream goodies</p>
              </div>
              <p>
                From our decadent ice cream sandwiches, where rich, velvety ice
                cream is nestled between freshly baked cookies, to our
                irresistible ice cream cakes, perfect for any celebration,
                there's something for every sweet tooth
              </p>
              <button
                onClick={() => {
                  navigate("/flavor");
                }}
              >
                MENU
              </button>
            </div>
            <img src={macarons} alt="" />
          </div>
        </div>
      </div>
      <div className="lowerbody">
        <div className="lowerbody_upper">
          <div className="scoop-container">
            <img src={Strawberry} alt="" className="scoop s1 s" />
            <img src={Chocolate} alt="" className="scoop s2 s" />
          </div>
          <img src={icecone} alt="" className="s icecone" />
          <div className="scoop-container">
            <img src={Menta} alt="" className="scoop s4 s" />
            <img src={Apricot} alt="" className="scoop s5 s" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Body;
