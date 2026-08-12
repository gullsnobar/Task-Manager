import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchTasks } from "../store/slices/tasksSlice";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const { tasks, loading, error } = useSelector(
    (state) => state.tasks
  );

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <div className="heading-row">
          <div>
            <h1>Welcome back, {user?.name}</h1>
            <h2>Keep your task flow clean, calm, and focused.</h2>
          </div>

          <div className="progress-ring">
            <p className="num">{tasks.length ?? 0}</p>
            <p className="lbl">Tasks</p>
          </div>
        </div>

        <TaskForm />

        {loading && <p>Loading tasks...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && <TaskList tasks={tasks} />}
      </main>
    </div>
  );
}

export default Dashboard;