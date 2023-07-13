import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";

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
    const confirmed = window.confirm("Do you want to delete all items?");
    if (confirmed) setItems([]);
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
