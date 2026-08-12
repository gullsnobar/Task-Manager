import { useState } from "react";
import { useDispatch } from "react-redux";
import api from "../api/axios";
import { fetchTasks } from "../store/slices/tasksSlice";

function TaskForm() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    try {
      await api.post("/tasks", { title: task.trim() });

      setTask("");

      dispatch(fetchTasks());
    } catch (error) {
      console.error("Create task error:", error);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What do you want to accomplish?"
      />

      <button type="submit">+ Add Task</button>
    </form>
  );
}

export default TaskForm;