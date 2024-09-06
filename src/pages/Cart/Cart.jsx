import React, { useContext, useState, useEffect } from "react";
import { Cartcontext } from "../../components/Cartcontext";
import minus from "../../assests/minus.png";
import plus from "../../assests/plus.png";
import bin from "../../assests/bin.png";
import tag from "../../assests/tag.png";
import note from "../../assests/note.png";
import lock from "../../assests/lock.png";
import cross_icon from "../../assests/cross_icon.png";
import { useNavigate } from "react-router-dom";

import "./Cart.css";
const Cart = ({ count, setcount, pickoption }) => {
  const { cartItems, removeFromCart, updateCart } = useContext(Cartcontext);
  const [hiddenitem, sethiddenitem] = useState({});
  const [showpromo, setshowpromo] = useState(false);
  const [shownote, setshownote] = useState(false);
  const [showpop, setshowpop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initialCount = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setcount(initialCount);
  }, [cartItems, setcount]);

  const removeFromCartAndHide = (item) => {
    removeFromCart(item);
    setcount((prevCount) => prevCount - item.quantity);
    sethiddenitem((prevHiddenItems) => ({
      ...prevHiddenItems,
      [item._id]: true,
    }));
  };
  const updateItemQuantity = (item, newQuantity) => {
    if (newQuantity > 0) {
      const updatedItem = { ...item, quantity: newQuantity };
      updateCart(updatedItem);
    }
  };

  return (
    <div className="cartsee">
      <div className="cart_item">
        <p className="mycart">My cart</p>
        <div className="line"></div>
        {cartItems.length === 0 ? (
          <div className="empty">
            <p className="cart_empty">Cart is empty</p>
            <p
              className="continue"
              onClick={() => {
                navigate("/");
              }}
            >
              Continue Browsing
            </p>
          </div>
        ) : (
          <div>
            {cartItems.map(
              (item) =>
                !hiddenitem[item._id] && (
                  <div key={item._id}>
                    <div className="cart_item_detail">
                      <div className="element_img">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="cart_item_image"
                        />
                      </div>

                      <div className="cart_item_info">
                        <div className="name_price">
                          <p className="item_name">{item.name}</p>
                          <p>${item.price}.00</p>
                        </div>
                        <div className="right">
                          <div className="element_quantity">
                            <div className="rmv">
                              <img
                                src={minus}
                                alt=""
                                onClick={() =>
                                  updateItemQuantity(item, item.quantity - 1)
                                }
                              />
                            </div>
                            <span>{item.quantity}</span>

                            <div>
                              <img
                                src={plus}
                                alt=""
                                onClick={() =>
                                  updateItemQuantity(item, item.quantity + 1)
                                }
                              />
                            </div>
                          </div>
                          <div className="element_price">
                            <p>${item.price * item.quantity}.00</p>
                          </div>
                          <img
                            src={bin}
                            alt=""
                            className="bin"
                            onClick={() => removeFromCartAndHide(item)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="line"></div>
                  </div>
                )
            )}
            <div className="extra_info">
              <div className="coupan" onClick={() => setshowpromo(!showpromo)}>
                <img src={tag} alt="" />
                <p>Enter a promo code</p>
              </div>
              {showpromo === true ? (
                <div className="promo_code">
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Enter a promo code"
                  />
                  <button type="button">Apply</button>
                </div>
              ) : (
                <></>
              )}
              <div
                className="addnote"
                onClick={() => {
                  setshownote(!shownote);
                }}
              >
                <img src={note} alt="" />
                <p>Add a note</p>
              </div>
              {shownote === true ? (
                <div className="notee">
                  <input
                    type="text"
                    placeholder="Instructions? Special requests? Add them here"
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="order_summery">
        <p className="mycart">Order summary</p>
        <div className="line"></div>
        <div className="subtotal">
          <div>
            <p>Subtotal</p>
          </div>
          <p>${count * 9}.00</p>
        </div>
        <div className="addr">
          <div>
            <p>{pickoption}</p>
          </div>
          <p>FREE</p>
        </div>
        <div className="line"></div>
        <div className="totalprice">
          <p className="totall">Total</p>
          <p>${count * 9}.00</p>
        </div>
        <button
          type="button"
          className="checkout"
          onClick={() => setshowpop(true)}
        >
          Checkout
        </button>
        <div className="lockk">
          <img src={lock} alt="" />
          <p>Secure Checkout</p>
        </div>
      </div>
      {showpop === true ? (
        <div className="confirm_cartbook">
          <div className="confirm">
            <img
              src={cross_icon}
              onClick={() => {
                setshowpop(false);
              }}
              alt="Close"
            />
            <h1>YOUR ORDER IS CONFIRMED . THANK YOU FOR YOUR PURCHASE</h1>
            <button
              type="button"
              onClick={() => {
                navigate("/");
              }}
              alt="Close"
            >
              GOT IT
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {console.log(cartItems)}
    </div>
  );
};

export default Cart;
