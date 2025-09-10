import { useUserContext } from "../../hooks/useUserContext";

function Dashboard() {
  const { user } = useUserContext();
  console.log("user details:", user);
  if (!user) {
    return null;
  }

  return (
    <div className="bg-bg-light-primary dark:bg-bg-dark-primary text-text-light-primary dark:text-text-dark-primary">
      Hello {user.username}
    </div>
  );
}

export default Dashboard;
