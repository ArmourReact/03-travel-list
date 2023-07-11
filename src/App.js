const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return <h1>🏝️ Far Away 🧳</h1>;
};

const Form = () => {
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
    </div>
  );
};

const PackingList = () => {
  return (
    <div className="list">
      <ul>
        {initialItems.map((i) => (
          <Item key={i.id} item={i} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  const { id, description, quantity, packed } = item;

  return (
    <li>
      <span style={packed ? { textDecoration: "line-through" } : {}}>
        {quantity} {description}
      </span>
      <button>❌</button>
    </li>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>
        💼 You have {initialItems.length} items on your list, and you have
        packed X (X%)
      </em>
    </footer>
  );
};
