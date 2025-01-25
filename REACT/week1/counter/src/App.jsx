import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const feedback = count > 10 ? "It's higher than 10!" : "Keep counting...";

  return (
    <div>
      <h2>{feedback}</h2>
      <Count count={count} />
      <Button addOne={() => setCount(count + 1)} />
    </div>
  );
}

function Count({ count }) {
  return <p>Count: {count}</p>;
}

function Button({ addOne }) {
  return <button onClick={addOne}>Add 1!</button>;
}

export default Counter;
