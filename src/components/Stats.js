export const Stats = ({ items }) => {
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
