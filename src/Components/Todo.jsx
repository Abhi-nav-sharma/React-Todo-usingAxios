import axios from "axios";
import { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const addTask = async (task) => {
    const payload = {
      title: task,
      status: false
    };
    console.log(task);
    const config = {
      url: "https://json-server-mocker-kittu.herokuapp.com/tasks",
      method: "post",
      data: payload
    };
    try {
      return axios(config);
    } catch (err) {
      setError(true);
    }
  };

  const getTasks = () => {
    const config = {
      url: "https://json-server-mocker-kittu.herokuapp.com/tasks",
      method: "get"
    };
    return axios(config);
  };

  const handleAdd = (todo) => {
    setLoading(true);
    addTask(todo);
    getTasks().then((res) => {
      setTasks(res.data);
    });
    setLoading(false);
    console.log(tasks);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    const config = {
      url: "https://json-server-mocker-kittu.herokuapp.com/tasks/" + id,
      method: "delete"
    };
    axios(config);
    getTasks().then((res) => {
      console.log(res);
      setTasks(res.data);
    });
    setLoading(false);
  };

  const handleToggle = async (id, Status) => {
    setLoading(true);
    console.log(id);
    const config = {
      url: "https://json-server-mocker-kittu.herokuapp.com/tasks/" + id,
      method: "patch",
      data: {
        status: !Status
      }
    };
    try {
      return axios(config);
    } catch (err) {
      setError(true);
    }

    getTasks().then((res) => {
      console.log(res);
      setTasks(res);
    });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then((res) => {
        console.log(res.data);
        setTasks(res.data);
        setLoading(false);
      })
      .catch((err) => setError(true));
    setLoading(false);
  }, [tasks]);

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  if (error) {
    return <h1>Sorry something went wrong</h1>;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoInput onAdd={handleAdd} />
      {tasks.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            Title={item.title}
            Status={item.status}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        );
      })}
    </div>
  );
}
export default Todo;
