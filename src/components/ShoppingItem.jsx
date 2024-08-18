import React from "react";

function ShoppingItem({ item, removeItem }) {
  return (
    <li>
      {item} <button onClick={removeItem}>Remove</button>
    </li>
  );
}

export default ShoppingItem;
