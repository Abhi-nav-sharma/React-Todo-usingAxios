const TodoItem = (props) => {
  const { Title, Status, id, handleDelete, handleToggle } = props;
  return (
    <div>
      <div style={{ border: "1px solid black", margin: "10px" }}>
        <h2>
          {Title} - {Status ? "Done" : "Not Done"}
        </h2>
        <button onClick={() => handleDelete(id)}>Delete</button>
        <button onClick={() => handleToggle(id, Status)}>Toggle</button>
      </div>
    </div>
  );
};
export default TodoItem;
