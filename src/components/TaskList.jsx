import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteTask,
  toggleTask,
  updateTask,
} from "../store/slices/tasksSlice";

function TaskList() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setEditTitle("");
  };

  const handleUpdate = () => {
    if (!editTitle.trim()) return;

    dispatch(
      updateTask({
        id: editingTask.id,
        title: editTitle.trim(),
      })
    );

    closeEditModal();
  };

  return (
    <>
      <div className="task-list">
        <div className="task-list-header">
          <h2>My Tasks</h2>

          <span>{tasks.length} Tasks</span>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Add your first task to get started.</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              className={`task-card ${
                task.completed ? "completed" : ""
              }`}
              key={task.id}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    dispatch(toggleTask(task.id))
                  }
                />

                <span>{task.title}</span>
              </div>

              <div className="task-actions">
                <button
                  className="edit-btn"
                  onClick={() => openEditModal(task)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    dispatch(deleteTask(task.id))
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingTask && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Edit Task</h2>

            <input
              type="text"
              value={editTitle}
              onChange={(e) =>
                setEditTitle(e.target.value)
              }
            />

            <div className="modal-actions">
              <button onClick={closeEditModal}>
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleUpdate}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;