import React, { useState, useRef, useEffect, useContext } from "react";
import { Cartcontext } from "../../components/Cartcontext";
import "./Orderonline.css";
import icecreams from "../../assests/icecreams.PNG";
import clock from "../../assests/clock.png";
import location from "../../assests/location.png";
import cross_icon from "../../assests/cross_icon.png";
import { food_list } from "../../assests/asset";
import plus from "../../assests/plus.png";
import minus from "../../assests/minus.png";
import { useNavigate } from "react-router-dom";

const Orderonline = ({ count, setcount, pickoption, setpickoption }) => {
  const { cartItems, addToCart, removeFromCart, updateCart } =
    useContext(Cartcontext);

  const [popup, setpopup] = useState(false);
  const [deliverytime, setdeliverytime] = useState(false);
  const [pick_time, setpick_time] = useState("up to 30 min");
  const [schedule, setschedule] = useState(false);
  const [delivery_time, setdelivery_time] = useState("");
  const [savebtn, setsavebtn] = useState(false);
  const [selectedflavour, setselectedflavour] = useState("icecream");
  const [cartpopup, setcartpopup] = useState(false);
  const [selecteditem, setselecteditem] = useState(null);
  const [price, setprice] = useState(9);
  const [quantities, setQuantities] = useState({});
  const [showquantity, setshowquantity] = useState(false);
  const [showCircle, setShowCircle] = useState({});

  const navigate = useNavigate();
  const iceCreamref = useRef(null);
  const dairyFreeref = useRef(null);

  useEffect(() => {
    const total = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    setcount(total);
  }, [quantities]);

  const handledeliver = (option) => {
    if (option === "Delivery") {
      setpickoption("Delivery");
      setpopup(true);
    } else {
      setpickoption("Pickup");
      setpopup(true);
    }
  };

  const Scheduletime = () => {
    setschedule(true);
  };

  const handlepopup = () => {
    setpopup(true);
  };
  const convertTo12HourFormat = (hour) => {
    const adjustedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${adjustedHour}`;
  };

  const getPeriod = (hour) => {
    return hour >= 12 ? "PM" : "AM";
  };

  const generatetimeoption = () => {
    const slots = [];
    let currentHour = 9;
    let currentMin = 0;

    while (currentHour < 22 || (currentHour === 22 && currentMin === 0)) {
      const timeString = `${convertTo12HourFormat(currentHour)}:${
        currentMin < 10 ? "0" : ""
      }${currentMin} ${getPeriod(currentHour)}`;
      slots.push(timeString);
      currentMin += 15;
      if (currentMin === 60) {
        currentMin = 0;
        currentHour++;
      }
    }
    return slots;
  };

  const handleTimeChange = (event) => {
    setpick_time(event.target.value);
  };

  const handledeltime = (value) => {
    setdelivery_time(value.target.value);
  };

  const handleinputaddress = (event) => {
    const address = event.target.value;
    if (address !== "Peshawar, Pakistan") {
      setdeliverytime(false);
    } else {
      setdeliverytime(true);
    }
  };

  const savebutton = () => {
    setsavebtn(true);
    setpopup(false);
  };

  const handleicecreamflavour = (flavour) => {
    if (flavour === "icecream") {
      setselectedflavour("icecream");
      if (iceCreamref.current) {
        iceCreamref.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      setselectedflavour("dairy");
      if (dairyFreeref.current) {
        dairyFreeref.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleoption = (value) => {
    setschedule(value);
    setpick_time("up to 30 min");
  };

  const handleQuantityChange = (itemId, delta) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[itemId] || 0;
      const newQuantity = Math.max(currentQuantity + delta, 1);
      return { ...prevQuantities, [itemId]: newQuantity };
    });
  };

  const cartpopcontent = (item) => {
    setselecteditem(item);
    setcartpopup(true);
    setshowquantity((prevShowQuantity) => ({
      ...prevShowQuantity,
      [item._id]: true,
    }));
  };

  const handleaddcart = () => {
    if (selecteditem) {
      const quantity = quantities[selecteditem._id] || 1;
      console.log("Adding to cart:", selecteditem.name, "Quantity:", quantity);

      if (quantity > 0) {
        addToCart(selecteditem, quantity);
        setcount((prevCount) => prevCount + quantity);
        setShowCircle((prevShowCircle) => ({
          ...prevShowCircle,
          [selecteditem._id]: true,
        }));
        console.log("Count after adding:", count + quantity);
      } else {
        console.log("Quantity is zero or undefined, not adding to cart.");
      }
      setcartpopup(false); // Close the popup after adding to the cart
    } else {
      console.log("No item selected.");
    }
  };

  return (
    <div className="orderonline">
      <img src={icecreams} alt="" srcset="" />
      <div className="contents">
        <h1>ORDER ONLINE</h1>
        <p>
          You can order online! Browse our menu items and choose what you’d like
          to order from us.
        </p>
        <div className="green_signal">
          <div className="circle"></div>
          <p>Accepting Orders</p>
        </div>
        <div className="pickup_info">
          <div className="pick_delivery">
            <div
              className={pickoption === "Pickup" ? "greycolor" : ""}
              onClick={() => {
                handledeliver("Pickup");
              }}
            >
              Pickup
            </div>
            <div
              className={pickoption === "Delivery" ? "greycolor" : ""}
              onClick={() => {
                handledeliver("Delivery");
              }}
            >
              Delivery
            </div>
          </div>
          <div className="time_address">
            {pickoption === "Pickup" ? (
              <>
                <div className="time">
                  <img src={clock} alt="" srcset="" />
                  {savebtn === false && schedule === false ? (
                    <>
                      <p>Pickup time: {pick_time}</p>
                    </>
                  ) : (
                    <>
                      <p>Pickup time: Today {pick_time}</p>
                    </>
                  )}

                  <p
                    className="change"
                    onClick={() => {
                      setpopup(true);
                    }}
                  >
                    Change
                  </p>
                </div>
                <div className="address">
                  <img src={location} alt="" srcset="" />
                  <p>Pickup Address: Saddar ,Peshawar, Pakistan</p>
                </div>
              </>
            ) : (
              <>
                <div className="time">
                  <img src={clock} alt="" srcset="" />
                  {savebtn === false && schedule === false ? (
                    <>
                      <p>Delivery time: up to 60 minutes</p>
                    </>
                  ) : (
                    <>
                      <p>Delivery time: Today {delivery_time}</p>
                    </>
                  )}

                  <p className="change" onClick={handlepopup}>
                    Change
                  </p>
                </div>
                <div className="address">
                  <img src={location} alt="" srcset="" />
                  <p>Delivery Address: Peshawar, Pakistan</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {popup === true ? (
        <div className="delivery_detail">
          <div className="detail">
            <h2>HOW WOULD YOU LIKE TO RECIEVE YOUR ORDER?</h2>
            <img
              src={cross_icon}
              alt=""
              srcset=""
              onClick={() => setpopup(false)}
            />
            <div className="pickdelivery">
              <div
                className={pickoption === "Pickup" ? "greycolor" : ""}
                onClick={() => {
                  handledeliver("Pickup");
                }}
              >
                Pickup
              </div>
              <div
                className={pickoption === "Delivery" ? "greycolor" : ""}
                onClick={() => {
                  handledeliver("Delivery");
                }}
              >
                Delivery
              </div>
            </div>
            {pickoption === "Pickup" ? (
              <>
                <div className="pick_add">
                  <p>Pickup from:</p>
                  <p className="address">Saddar ,Peshawar ,Pakistan</p>
                </div>
                <div className="pick_time">
                  <p>When:</p>
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    value="option 1"
                    checked
                  />
                  <label htmlFor="option1" onClick={() => handleoption(false)}>
                    up to 30 minutes
                  </label>
                  <div className="schedule" onClick={Scheduletime}>
                    <input
                      type="radio"
                      name="options"
                      id="option2"
                      value="option 2"
                    />
                    <label htmlFor="option2" onClick={Scheduletime}>
                      Schedule for later
                    </label>
                  </div>
                </div>
                {schedule === true ? (
                  <div className="date_time">
                    <div>
                      <label htmlFor="date">Date</label>
                      <select name="date" id="date" value="today">
                        <option value="today">Today</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="time">Time</label>
                      <select
                        name="time"
                        id="time"
                        value={pick_time}
                        className="option"
                        onChange={handleTimeChange}
                      >
                        {generatetimeoption().map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <div className="deliver_address">
                  <p>Deliver to:</p>
                  <input
                    type="text"
                    name=""
                    id=""
                    placeholder="Peshawar, Pakistan"
                    onChange={handleinputaddress}
                    className="deladdress"
                  />
                </div>
                {deliverytime === true ? (
                  <div className="delivery_time">
                    <p>When:</p>
                    <input
                      type="radio"
                      name="options"
                      id="option1"
                      value="option 1"
                      checked
                    />
                    <label
                      htmlFor="option1"
                      onClick={() => {
                        setschedule(false);
                      }}
                    >
                      up to 60 minutes
                    </label>
                    <div className="schedule" onClick={Scheduletime}>
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        value="option 2"
                      />
                      <label htmlFor="option2">Schedule for later</label>
                    </div>
                    {schedule === true ? (
                      <div className="date_time">
                        <div>
                          <label htmlFor="date">Date</label>
                          <select name="date" id="date" value="today">
                            <option value="today">Today</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="time">Time</label>

                          <select
                            name="time"
                            id="time"
                            value={delivery_time}
                            className="option"
                            onChange={handledeltime}
                          >
                            {generatetimeoption().map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <></>
                )}
              </>
            )}

            <div className="hr"></div>
            <button type="button" onClick={savebutton} className="save">
              Save
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flavour">
        <div className="icee">
          <div className="iceflavour">
            <div
              className={selectedflavour === "icecream" ? "icecream" : ""}
              onClick={() => handleicecreamflavour("icecream")}
            >
              ICE CREAM FLAVOURS
            </div>
            <div
              className={selectedflavour === "dairy" ? "dairy" : ""}
              onClick={() => handleicecreamflavour("dairy")}
            >
              DAIRY FREE FLAVOURS
            </div>
          </div>
          {count > 0 ? (
            <div className="view_cart">
              <button
                type="button"
                onClick={() => {
                  navigate("/cart");
                }}
              >
                View Cart ({count})
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <h1 className="flavorhead">FLAVOURS</h1>
        <div className="hr"></div>
        <div className="icecream_flavours" ref={iceCreamref}>
          <h1 className="icehead">ICE CREAM FLAVOURS</h1>
          <div className="icecream_item">
            {food_list.map((item, index) => {
              if (item.category === "icecream") {
                return (
                  <div
                    className="cream"
                    key={item._id}
                    onClick={() => cartpopcontent(item)}
                  >
                    <div className="cream_content">
                      {showCircle[item._id] && (
                        <div className="cir">
                          <div className="symbol">
                            <p>{quantities[item._id] || 1}</p>
                          </div>
                        </div>
                      )}
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p className="price">${item.price}.00</p>
                    </div>
                    <img src={item.image} alt="" />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="dairycream_flavours" ref={dairyFreeref}>
          <h1 className="icehead">DAIRY FREE FLAVOURS</h1>
          <div className="icecream_item">
            {food_list.map((item, index) => {
              if (item.category === "dairyfree") {
                return (
                  <div
                    className="cream"
                    key={item._id}
                    onClick={() => cartpopcontent(item)}
                  >
                    <div className="cream_content">
                      {showquantity[item._id] && (
                        <div className="cir">
                          <div className="symbol">
                            <p>{quantities[item._id] || 1}</p>
                          </div>
                        </div>
                      )}
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p className="price">${item.price}.00</p>
                    </div>
                    <img src={item.image} alt="" />
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      {cartpopup && selecteditem && (
        <div className="cart_info">
          <div className="cartitems">
            <div className="cross">
              <img
                src={cross_icon}
                alt=""
                onClick={() => setcartpopup(false)}
              />
            </div>
            <div className="container">
              <div className="ice_image">
                <img src={selecteditem.image} alt="" />
              </div>

              <div className="cont">
                <h1>{selecteditem.name}</h1>
                <p>{selecteditem.description}</p>
                <label>Special Request</label>
                <input
                  type="text"
                  placeholder="We'll do our best to accommodate any requests possible"
                />
                <p className="quant">Quantity</p>
                <div className="add_rmv">
                  <div className="rmv">
                    <img
                      src={minus}
                      alt=""
                      onClick={() => handleQuantityChange(selecteditem._id, -1)}
                      className={
                        quantities[selecteditem._id] === 1 ? "disable" : ""
                      }
                    />
                  </div>
                  <span>
                    {quantities[selecteditem._id] === undefined
                      ? 1
                      : quantities[selecteditem._id]}
                  </span>
                  {console.log(quantities[selecteditem._id])}

                  <div className="add">
                    <img
                      src={plus}
                      alt=""
                      onClick={() => handleQuantityChange(selecteditem._id, 1)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="cont_btn">
              <div className="hr"></div>
              <button
                type="button"
                className="addtocart"
                onClick={handleaddcart}
              >
                Add to Cart | ${price * (quantities[selecteditem._id] || 1)}.00
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orderonline;
