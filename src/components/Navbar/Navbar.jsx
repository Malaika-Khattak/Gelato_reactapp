import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../../assests/logo.jpg";
import login from "../../assests/login.png";
import { Link } from "react-router-dom";
import { Cartcontext } from "../../components/Cartcontext";
import minus from "../../assests/minus.png";
import plus from "../../assests/plus.png";
import greater from "../../assests/greater.png";
import cross_icon from "../../assests/cross_icon.png";
import bars from "../../assests/bars.png";
import { useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/all";
import del from "../../assests/del.png";

import gsap from "gsap";
gsap.registerPlugin(ScrollTrigger);

const Navbar = ({ count, setcount, setshowlogin }) => {
  const [menu, setmenu] = useState("home");
  const [showslider, setshowslider] = useState(false);
  const { cartItems, removeFromCart, updateCart } = useContext(Cartcontext);
  const [hiddenitem, sethiddenitem] = useState({});
  const [navmenu, setnavmenu] = useState(false);
  const [nav, setnav] = useState(false);
  const navigate = useNavigate();
  var price = 9;

  useEffect(() => {
    if (showslider) {
      gsap.to(".cartslider_info", {
        x: 0, // Move the item to its original position
        opacity: 1, // Make it visible
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.1, // Optional: Delay each item's animation slightly
      });
    } else {
      gsap.to(".cartslider_info", {
        x: 300, // Move the item back off-screen
        opacity: 0, // Hide it
        duration: 0.5,
        ease: "power3.out",
      });
    }
  }, [showslider]);

  useEffect(() => {
    // Function to handle screen resizing
    function handleScreenResize() {
      // Only update state if it has changed
      if (window.innerWidth < 767 && !nav) {
        setnav(true);
      } else if (window.innerWidth >= 767 && nav) {
        setnav(false);
      }
    }

    // Initial check when the component mounts
    handleScreenResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleScreenResize);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, [nav]); // Dependency array ensures useEffect runs when `nav` changes

  useEffect(() => {
    const initialCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setcount(initialCount);
  }, [cartItems, setcount]);

  const removeFromCartAndHide = (item) => {
    removeFromCart(item); // Remove the item from the cart context
    setcount((prevCount) => prevCount - item.quantity); // Update the count
    sethiddenitem((prevHiddenItems) => ({
      ...prevHiddenItems,
      [item._id]: true, // Hide only the item that was clicked
    }));
  };

  const updateItemQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = { ...item, quantity: newQuantity };
      updateCart(updatedItem);
    }
  };

  return (
    <div className="navbar">
      <div className="bars">
        <img src={bars} alt="" onClick={() => setnavmenu(true)} />
      </div>
      {navmenu === true ? (
        <div className="navbar_slidemenu">
          <img src={cross_icon} alt="" onClick={() => setnavmenu(false)} />
          <div className="lists">
            <ul>
              <div
                className="logg"
                onClick={() => {
                  setnavmenu(false);
                  setshowlogin(true);
                }}
              >
                <img src={login} alt="" srcset="" />
                <a>LOG IN</a>
              </div>
              <Link to="/orderonline" onClick={() => setnavmenu(false)}>
                ORDER ONLINE
              </Link>
              <Link to="/flavor" onClick={() => setnavmenu(false)}>
                FLAVORS
              </Link>
              <Link to="/event" onClick={() => setnavmenu(false)}>
                BOOK AN EVENT
              </Link>
              <Link to="/about" onClick={() => setnavmenu(false)}>
                ABOUT
              </Link>
              <Link to="/reservation" onClick={() => setnavmenu(false)}>
                RESERVATION
              </Link>
            </ul>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="nav-left">
        <ul>
          <Link
            to="/flavor"
            onClick={() => {
              setmenu("flavour");
            }}
            className={menu === "flavour" ? "active" : ""}
          >
            FLAVORS
          </Link>
          <Link
            to="/event"
            onClick={() => {
              setmenu("event");
            }}
            className={menu === "event" ? "active" : ""}
          >
            BOOK AN EVENT
          </Link>
          <Link
            to="/about"
            onClick={() => {
              setmenu("about");
            }}
            className={menu === "about" ? "active" : ""}
          >
            ABOUT
          </Link>
          <Link
            to="/reservation"
            onClick={() => {
              setmenu("reservation");
            }}
            className={menu === "reservation" ? "active" : ""}
          >
            RESERVATION
          </Link>
        </ul>
      </div>
      <Link
        to="/"
        onClick={() => {
          setmenu("home");
        }}
      >
        <img className="logo" src={logo} alt="" srcset="" />
      </Link>
      <div className="nav-right">
        <div
          className="nav-right-login"
          onClick={() => {
            setshowlogin(true);
          }}
        >
          <div className="logg">
            <img src={login} alt="" srcset="" />
            <a>LOG IN</a>
          </div>
        </div>

        {nav === true ? (
          <div className="nav-right-cart" onClick={() => navigate("/cart")}>
            {count}
          </div>
        ) : (
          <div className="nav-right-cart" onClick={() => setshowslider(true)}>
            {count}
          </div>
        )}

        <Link to="/orderonline">
          <button className="orderr">ORDER ONLINE</button>
        </Link>
      </div>
      {showslider === true ? (
        <div className="cartslider">
          <div className="cartslider_info">
            <div className="top_black">
              <img src={greater} alt="" onClick={() => setshowslider(false)} />
            </div>
            <div>
              {cartItems.length === 0 ? (
                <div className="empty">
                  <p className="cart_empty">Cart is empty</p>
                </div>
              ) : (
                <div className="cartitemss">
                  {cartItems.map(
                    (item) =>
                      !hiddenitem[item._id] && (
                        <div key={item._id} className="border">
                          <div className="cart_item_detail">
                            <div>
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="cart_iteminfo">
                              <div>
                                <p className="cart_name">{item.name}</p>
                                <p className="item_price">${item.price}.00</p>
                              </div>
                              <div>
                                <div className="item_quantity">
                                  <div>
                                    <img
                                      src={minus}
                                      alt=""
                                      onClick={() =>
                                        updateItemQuantity(
                                          item,
                                          item.quantity - 1
                                        )
                                      }
                                    />
                                  </div>
                                  <span>{item.quantity}</span>

                                  <div>
                                    <img
                                      src={plus}
                                      alt=""
                                      onClick={() =>
                                        updateItemQuantity(
                                          item,
                                          item.quantity + 1
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="delet">
                              <img
                                src={del}
                                alt=""
                                onClick={() => removeFromCartAndHide(item)}
                              />
                            </div>
                          </div>
                          <div className="hori"></div>
                        </div>
                      )
                  )}
                </div>
              )}
            </div>
            {cartItems.length === 0 ? (
              <></>
            ) : (
              <div className="total_price">
                <div>
                  <p>Subtotal</p>
                  <p>${count * price}.00</p>
                </div>

                <div className="line"></div>
                <button type="button" onClick={() => navigate("/cart")}>
                  View Cart
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Navbar;
