import { useEffect, useState } from "react";
import { useUserContext } from "../../hooks/useUserContext";
import {
  SquareBottomDashedScissors,
  FileImage,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";
import { serverUrl } from "../constents";
import { MdTextFields } from "react-icons/md";
import { useUserSnippetContext } from "../../hooks/useUserSnippetContext";

function DashboardHome() {
  const { user } = useUserContext();
  const { snippets, setSnippets, stats, setStats } = useUserSnippetContext();
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
    <div className="w-full text-text-light-primary py-5 px-3 md:p-15 dark:text-text-dark-primary">
      {/* greatings */}
      <div className="flex flex-col">
        <span className="text-text-light-secondary dark:text-text-dark-secondary text-[.9rem] md:text-[1rem]">
          {date}
        </span>
        <span className="font-semibold text-md sm:text-lg mt-1 md:mt-2 md:text-2xl">
          {diaplaygreetings}
        </span>
      </div>
      {/* total count of snippets */}
      <div className="py-3 md:w-[75%] lg:w-[39rem] md:py-6 cursor-default">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-2">
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
          <UserSnippetInfoBox
            title="Text"
            icon={<MdTextFields className="w-3.5" />}
            count={stats?.totalTexts || 0}
          />
        </div>
      </div>
      {/* user data */}
      <div className="w-full mt-6 md:mt-4 rounded-lg px-3 box-border bg-bg-light-primary dark:bg-bg-dark-primary flex border-1 border-border-light dark:border-border-dark">
        {/* shows user all data */}
        <div className="w-full lg:w-[80%] p-3 min-sm:border-r-[0.5px] border-border-light dark:border-border-dark">
          <div className="p-3 pb-2 border-b-1 border-border-light dark:border-border-dark">
            <div className="w-full flex">
              {/* heading */}
              <div className="w-1/2">heading</div>
              {/* filters */}
              <div className="w-1/2">
                <span>category</span>
                <span>website</span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
        {/* shows recent data */}
        <div className="hidden min-sm:flex flex-col box-border p-3 lg:w-[20%]">
          <span>Recently Added</span>
          <div className="flex flex-col mt-1 rounded-lg text-text-light-secondary dark:text-text-dark-secondary">
            {snippets.map((s) => {
              return <span>{s.title}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;

const UserSnippetInfoBox = ({ title, icon, count }) => {
  return (
    <div className="flex w-full flex-col justify-center px-3 py-1 border-1 bg-bg-light-secondary dark:bg-bg-dark-secondary text-text-light-secondary dark:text-text-dark-secondary border-border-light dark:border-border-dark rounded-lg">
      <div className="flex gap-2 items-center">
        <span>{icon}</span>
        <span className="text-[.9rem]">{title}</span>
      </div>
      <div className="font-semibold text-[1.2rem] text-text-light-primary dark:text-text-dark-primary">
        {count}
      </div>
    </div>
  );
};
