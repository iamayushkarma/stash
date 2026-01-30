import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import LoadingSkeleton from "../utils/ui/LoadingSkleton";

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useContext(UserContext);
  // Wait for user data to load from localStorage
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSkeleton />
      </div>
    );
  }

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the component
  return children;
};

export default ProtectedRoute;
