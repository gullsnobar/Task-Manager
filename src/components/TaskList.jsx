import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/axios";
import { fetchTasks } from "../store/slices/tasksSlice";

function TaskList({ tasks }) {
  const storeTasks = useSelector((state) => state.tasks.tasks) || [];

  const list = Array.isArray(tasks) ? tasks : storeTasks;

  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [deleteTask, setDeleteTask] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [actionError, setActionError] = useState("");

  const openEditModal = (task) => {
    setEditingTask(task);
    setEditTitle(task.title);
    setActionError("");
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setEditTitle("");
    setActionError("");
  };

  const openDeleteModal = (task) => {
    setDeleteTask(task);
    setActionError("");
  };

  const closeDeleteModal = () => {
    setDeleteTask(null);
    setActionError("");
  };

  const handleUpdate = async () => {
    if (!editTitle.trim() || !editingTask) return;

    try {
      await api.put(`/tasks/${editingTask._id}`, {
        title: editTitle.trim(),
      });

      await dispatch(fetchTasks());
      setFeedback("Task updated successfully.");
      closeEditModal();
      window.setTimeout(() => setFeedback(""), 2600);
    } catch (error) {
      console.error("Update task error:", error);
      setActionError(
        error.response?.data?.message || "Unable to update task. Please try again."
      );
    }
  };

  const handleDelete = async () => {
    if (!deleteTask) return;

    try {
      await api.delete(`/tasks/${deleteTask._id}`);

      await dispatch(fetchTasks());
      setFeedback("Task deleted successfully.");
      closeDeleteModal();
      window.setTimeout(() => setFeedback(""), 2600);
    } catch (error) {
      console.error("Delete task error:", error);
      setActionError(
        error.response?.data?.message || "Unable to delete task. Please try again."
      );
    }
  };

  const handleToggle = async (task) => {
    try {
      await api.put(`/tasks/${task._id}`, {
        completed: !task.completed,
      });

      dispatch(fetchTasks());
    } catch (error) {
      console.error("Toggle task error:", error);
    }
  };

  return (
    <>
      <div className="task-list">
        <div className="task-list-header">
          <h2>My Tasks</h2>

          <span>{list.length} Tasks</span>
        </div>

        {list.length === 0 ? (
          <div className="empty-state">
            <h3>No tasks yet</h3>
            <p>Add your first task to get started.</p>
          </div>
        ) : (
          list.map((task) => (
            <div
              className={`task-card ${
                task.completed ? "completed" : ""
              }`}
              key={task._id || task.id}
            >
              <div className="task-content">
                <input
                  type="checkbox"
                  checked={!!task.completed}
                  onChange={() => handleToggle(task)}
                />

                <span>{task.title}</span>
              </div>

              <div className="task-actions">
                <button className="edit-btn" onClick={() => openEditModal(task)}>
                  Edit
                </button>

                <button className="delete-btn" onClick={() => openDeleteModal(task)}>
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
            <p className="modal-message">Update the task title and save your changes.</p>

            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Task title"
            />

            <div className="edit-modal-actions">
              <button className="cancel-btn" onClick={closeEditModal}>
                Cancel
              </button>
              <button className="save-btn" onClick={handleUpdate} disabled={!editTitle.trim()}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteTask && (
        <div className="modal-overlay">
          <div className="confirm-modal">
            <h2>Delete Task</h2>
            <p className="modal-message">
              Are you sure you want to delete “{deleteTask.title}”? This action cannot be undone.
            </p>

            <div className="edit-modal-actions">
              <button className="cancel-btn" onClick={closeDeleteModal}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDelete}>
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;