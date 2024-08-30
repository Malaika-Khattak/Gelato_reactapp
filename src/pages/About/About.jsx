import React from "react";
import "./About.css";
import outdoor from "../../assests/outdoor.jpg";

const About = () => {
  return (
    <div className="about">
      <div className="about_heading">
        <p>ABOUT</p>
        <p className="heading">GELATO</p>
      </div>
      <div className="place">
        <div className="content">
          <p className="head">OUR PLACE</p>
          <p className="cursive">We just love ice cream!</p>
          <p className="para">
            Welcome to Gelato Heaven, where indulgence meets ambiance! Nestled
            by the serene seaside, our ice cream shop is not just a place to
            enjoy the finest gelato, but a destination in itself. Our charming
            outdoor seating area invites you to savor every scoop while basking
            in the fresh coastal breeze.
          </p>
          <p className="para">
            Inside, the cozy and vibrant atmosphere, coupled with the delightful
            aroma of freshly made ice cream, makes Gelato Heaven the perfect
            spot for families, friends, and ice cream enthusiasts to
            gather.Whether you're here to try our classic flavors or explore our
            innovative creations, every visit promises a sweet escape and a
            memorable experience. Come for the ice cream, stay for the vibe –
            Gelato Heaven is your ultimate destination for a delectable treat by
            the sea.
          </p>
        </div>
      </div>
      <div className="back">
        <img src={outdoor} alt="" srcset="" className="image" />
      </div>
      <div className="factory">
        <div className="content">
          <p className="head">OUR LITTLE FACTORY</p>
          <p className="cursive">It's what's on the inside that counts</p>
          <p className="para">
            Welcome to Gelato Heaven, your go-to destination for the finest ice
            cream delights! At our shop, we pride ourselves on offering an
            extensive array of handcrafted flavors, each one crafted with the
            utmost care and premium ingredients. From timeless classics like
            velvety vanilla and rich chocolate to unique creations such as mango
            chili and lavender honey, our menu caters to every palate.
          </p>
          <p className="para">
            Our inviting atmosphere, complete with cozy indoor seating and a
            charming outdoor area, makes Gelato Heaven the perfect spot to relax
            and enjoy your favorite treats. Whether you're stopping by for a
            quick scoop, celebrating a special occasion, or just looking for a
            sweet escape, our friendly staff is here to ensure every visit is a
            delightful experience. Come and discover the magic of Gelato Heaven
            – where every bite is a taste of paradise.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
