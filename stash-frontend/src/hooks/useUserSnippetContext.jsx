import { UserSnippetContext } from "../context/UserSnippetsContext";
import { useContext } from "react";

export const useUserSnippetContext = () => {
  const context = useContext(UserSnippetContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
