import React from "react";
import "./Flavor.css";
import { food_list } from "../../assests/asset";

const Flavor = () => {
  return (
    <div className="flavor">
      <div className="flavor_heading">
        <p>OUR</p>
        <p className="heading">FLAVOURS</p>
      </div>
      <div className="flavor_menu">
        <div className="icecream_flavor">
          <h1>ICE CREAM FLAVOURS</h1>
          <div className="item">
            {food_list.map((item, index) => {
              if (item.category === "icecream") {
                return (
                  <div className="grid_item">
                    <img src={item.image} alt="" srcset="" />
                    <p className="name">{item.name}</p>
                    <p>{item.description}</p>
                    <p className="price">${item.price}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="dairyfree_flavor">
          <h1 className="dairy">DAIRY FREE FLAVOURS</h1>
          <div className="item">
            {food_list.map((item, index) => {
              if (item.category === "dairyfree") {
                return (
                  <div className="grid_item">
                    <img src={item.image} alt="" srcset="" />
                    <p className="name">{item.name}</p>
                    <p>{item.description}</p>
                    <p className="price">${item.price}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flavor;
