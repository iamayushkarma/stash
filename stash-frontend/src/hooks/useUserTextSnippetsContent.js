import { useContext } from "react";
import { UserTextSnippetContext } from "../context/UserTextSnippetsContent";

export const useUserTextSnippetContext = () => {
  const context = useContext(UserTextSnippetContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
