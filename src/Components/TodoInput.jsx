import { useState } from "react";

export default function TodoInput({ onAdd }) {
  const [task, setTask] = useState("");
  const handleAdd = () => {
    onAdd(task);
    setTask("");
  };
  return (
    <>
      <input
        onChange={(e) => setTask(e.target.value)}
        value={task}
        placeholder="Enter task"
      />
      <button onClick={handleAdd}>Submit</button>
    </>
  );
}
