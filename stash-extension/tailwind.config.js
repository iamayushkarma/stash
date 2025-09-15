/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", , "./popup.html", "./index.html"],
  safelist: [
    "bg-bg-light-secondary",
    "dark:bg-bg-dark-secondary",
    "border-border-light",
    "dark:border-border-dark",
    "text-text-dark-primary",
    "text-text-light-primary",
    // Add any other custom classes you need
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        "custom-heavy":
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      },
    },
  },
  plugins: [],
};
