import { useContext } from "react";
import { UserImageSnippetContext } from "../context/UserImageSnippetsContent";

export const useUserImageSnippetContext = () => {
  const context = useContext(UserImageSnippetContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
