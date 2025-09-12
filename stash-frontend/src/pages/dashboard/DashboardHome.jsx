import React from "react";
import { useUserContext } from "../../hooks/useUserContext";

function DashboardHome() {
  const { user } = useUserContext();
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
      return "rest well tonight  🌙";
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
    </div>
  );
}

export default DashboardHome;
