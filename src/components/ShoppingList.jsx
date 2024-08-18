import React, { useState } from "react";
import ShoppingItem from "./ShoppingItem";

function ShoppingList({ items, addItem, removeItem }) {
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim()) {
      addItem(newItem);
      setNewItem("");
    }
  };

  return (
    <div>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="Enter an item"
      />
      <button onClick={handleAddItem}>Add Item</button>

      <ul>
        {items.map((item, index) => (
          <ShoppingItem
            key={index}
            item={item}
            removeItem={() => removeItem(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
