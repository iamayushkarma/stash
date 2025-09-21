import { useContext } from "react";
import { UserSnippetContext } from "../context/UserSnippetsContext";

export const useUserSnippetContext = () => {
  const context = useContext(UserSnippetContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
