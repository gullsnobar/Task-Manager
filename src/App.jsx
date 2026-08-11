import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";


function App() {
  return (
    <div className="app">
      <header className="dashboard-header">
        <div>
          <p className="eyebrow">TASK MANAGER</p>
          <h1>Stay organized. Get things done.</h1>
          <p className="subtitle">
            Manage your daily tasks from one place.
          </p>
        </div>
      </header>

      <main className="dashboard">
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;