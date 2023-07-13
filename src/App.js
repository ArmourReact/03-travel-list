import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    setItems((i) => [...i, item]);
  };

  const handleDeleteItem = (id) => {
    setItems((i) => i.filter((i) => i.id !== id));
  };

  const handleToggleItem = (id) => {
    setItems((i) =>
      i.map((i) => (i.id === id ? { ...i, packed: !i.packed } : i))
    );
  };

  const handleClearItems = () => {
    setItems([]);
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>;
};

const Form = ({ onAddItems }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };

    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearItems }) => {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((i) => (
          <Item
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
            key={i.id}
            item={i}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear List</button>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  const { id, description, quantity, packed } = item;

  return (
    <li>
      <input
        type="checkbox"
        value={packed}
        onChange={() => {
          onToggleItem(id);
        }}
      />
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button onClick={() => onDeleteItem(id)}>❌</button>
    </li>
  );
};

const Stats = ({ items }) => {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding items to your packing list</em>
      </footer>
    );
  const totalItems = items.length;
  const packedItems = items.filter((i) => i.packed).length;
  const packedPercent = Math.round((packedItems / totalItems) * 100);

  return (
    <footer className="stats">
      <em>
        {packedPercent === 100
          ? "You got everything! Ready to go ✈️"
          : `💼 You have ${totalItems} items on your list, and you have packed 
        ${packedItems} (${packedPercent}%)`}
      </em>
    </footer>
  );
};
