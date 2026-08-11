import { useSelector } from "react-redux";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Dashboard</h1>

      <h2>Welcome, {user?.name}</h2>

      <p>Email: {user?.email}</p>
    </div>
  );
}

export default Dashboard;