import axios from "axios";
import { serverUrl } from "../../../pages/constents";
import { useUserContext } from "../../../hooks/useUserContext";

function LogoutBtn() {
  const { logout: logoutUserContext } = useUserContext();
  const logout = () => {
    axios
      .post(`${serverUrl}auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        logoutUserContext();
        window.location.href = "/login";
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
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
