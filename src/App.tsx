
import { useState } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);


  const [filter, setFilter] = useState("all");


  const addTask = () => {
    if (!task) return;
    setTasks([...tasks, { text: task, completed: false }]);
    setTask("");
  };
  const toggleTask = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(prev => prev.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <div style={{ padding: "20px" }}>
      <h1>Task Manager</h1>

      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add</button>

      <div id="all-tasks">
        <ul>
          {tasks.map((t, i) => (
            <li key={i}>
              <span
                onClick={() => toggleTask(i)}
                style={{
                  textDecoration: t.completed ? "line-through" : "none",
                  cursor: "pointer"
                }}
              >
                {t.text}
              </span>
              <button onClick={() => deleteTask(i)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h1>Filter Task</h1>
        <button id="btn1" onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <div id="filter-tasks">
          {filteredTasks.map((t) => (
            <li key={t}>
              <span className={t.completed ? "completed" : ""}>
                {t.text}
              </span>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;