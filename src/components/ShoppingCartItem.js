import React from "react";
import { ScCartItem, ScCartItemDetails } from "./scParts";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
const Item = ({ image, title, price, id }) => {
  const { removeItem } = useContext(CartContext);
  return (
    <ScCartItem>
      <img src={image} alt={`${title} book`} />

      <ScCartItemDetails>
        <h2>{title}</h2>
        <p>$ {price}</p>
        <button onClick={() => removeItem(id)}>Remove from cart</button>
      </ScCartItemDetails>
    </ScCartItem>
  );
};

export default Item;
