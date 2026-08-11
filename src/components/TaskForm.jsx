import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../store/slices/tasksSlice";

function TaskForm() {
  const [task, setTask] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!task.trim()) return;

    dispatch(addTask(task.trim()));

    setTask("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="What do you want to accomplish?"
      />

      <button type="submit">
        + Add Task
      </button>
    </form>
  );
}

export default TaskForm;