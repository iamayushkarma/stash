import { useState } from "react";
import axios from "axios";
import { serverUrl } from "../pages/constents";

export const useUpdateUser = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userData) => {
    setIsUpdating(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        throw new Error("Not authenticated");
      }

      const response = await axios.patch(
        `${serverUrl}auth/update-account`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Failed to update user";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  return { updateUser, isUpdating, error };
};
