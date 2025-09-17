import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import {
  SquareBottomDashedScissors,
  FileImage,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";
import { serverUrl } from "../constents";

function DashboardHome() {
  const { user } = useUserContext();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          throw new Error("Not authenticated");
        }
        const response = await axios.get(`${serverUrl}stashes/getStats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(response.data);
        console.log("user data is: ", response.data);
      } catch (err) {
        console.error("Error fetching user stats:", err);
      }
    };
    fetchUserStats();
  }, []);
  const getGreeting = () => {
    const now = new Date();
    const hour = now.getHours(); // 0 - 23

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "Good Evening";
    } else {
      return "Good Night";
    }
  };
  const getGreetingMessage = () => {
    const now = new Date();
    const hour = now.getHours(); // 0 - 23

    if (hour >= 5 && hour < 12) {
      return "hope you have a productive morning 🔆";
    } else if (hour >= 12 && hour < 17) {
      return "keep up the great work this afternoon 🌤️";
    } else if (hour >= 17 && hour < 21) {
      return "hope you had a great day ⭐";
    } else {
      return "rest well tonight 🌙";
    }
  };
  const username = String(user.username);
  const userName = username
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  const diaplaygreetings = `${getGreeting()}! ${userName}, ${getGreetingMessage()}`;

  const today = new Date();
  const options = { weekday: "long", day: "numeric", month: "long" };
  const date = today.toLocaleDateString("en-US", options);
  return (
    <div className="w-full text-text-light-primary p-5 md:p-15 dark:text-text-dark-primary">
      {/* greatings */}
      <div className="flex flex-col">
        <span className="text-text-light-secondary dark:text-text-dark-secondary text-[.9rem] md:text-[1rem]">
          {date}
        </span>
        <span className="font-semibold text-md mt-1 md:mt-2 md:text-2xl">
          {diaplaygreetings}
        </span>
        <span></span>
      </div>
      {/* total count of snippets */}
      <div className="py-3 md:py-6 cursor-default">
        <div className="flex gap-2">
          <UserSnippetInfoBox
            title="Categorys"
            icon={<FileImage className="w-3.5" />}
            count={stats?.uniqueCategories || 0}
          />
          <UserSnippetInfoBox
            title="Snippets"
            icon={<SquareBottomDashedScissors className="w-3.5" />}
            count={stats?.totalStashes || 0}
          />
          <UserSnippetInfoBox
            title="Images"
            icon={<LayoutDashboard className="w-3.5" />}
            count={stats?.totalImages || 0}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

const UserSnippetInfoBox = ({ title, icon, count }) => {
  return (
    <div className="w-36 flex flex-col justify-center px-3 py-1 border-1 bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-secondary dark:text-text-dark-secondary border-border-light dark:border-border-dark rounded-lg">
      <div className="flex gap-2 items-center mb-1">
        <span>
          {icon}

          {/* <SquareBottomDashedScissors className="w-3.5" /> */}
        </span>
        <span>{title}</span>
      </div>
      <div className="font-semibold text-[1.2rem] text-text-light-primary dark:text-text-dark-primary">
        {count}
      </div>
    </div>
  );
};
