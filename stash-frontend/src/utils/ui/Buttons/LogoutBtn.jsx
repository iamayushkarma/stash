import axios from "axios";
import { serverUrl } from "../../../pages/constents";
import { useUserContext } from "../../../hooks/useUserContext";

function LogoutBtn() {
  const { logout: logoutUserContext } = useUserContext();
  const logout = () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        console.error("Cannot log out: No token found.");
        localStorage.clear();
        window.location.href = "/login";
        return;
      }
      axios
        .post(
          `${serverUrl}auth/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res.data.message);
          logoutUserContext();
          window.location.href = "/login";
        })
        .catch((error) => {
          console.error("Logout error:", error);
        });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      const extensionId = import.meta.env.VITE_CHROME_EXTENSION_ID;
      console.log(
        "Attempting to send LOGOUT message to extension ID:",
        extensionId
      );
      if (window.chrome?.runtime?.sendMessage) {
        chrome.runtime.sendMessage(
          extensionId,
          { type: "LOGOUT" },
          (response) => {
            if (chrome.runtime.lastError) {
              console.log("Stash extension not active.");
            } else {
              console.log("Extension has been notified to log out.");
            }
          }
        );
      }
    }
  };
  return (
    <>
      <span onClick={logout} className="px-1 ml-5 text-error">
        Logout
      </span>
    </>
  );
}

export default LogoutBtn;
