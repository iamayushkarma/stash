function AuthWelcomeSidebar() {
  const descriptions = [
    "Great ideas start with simple organization. Keep your thoughts, inspirations, and creations in one place and let clarity lead the way.",
    "Every journey begins with a single step. Organize, simplify, and focus on what matters most.",
    "Turn chaos into clarity. Stay organized, stay productive, and let your creativity flow.",
    "Small actions lead to big results. A well-organized mind creates great things.",
    "Stay inspired, stay focused, and let your productivity unfold effortlessly.",
  ];
  let randomIndex = Math.floor(Math.random() * descriptions.length);

  return (
    <div className="hidden dark:bg-bg-dark-secondary bg-bg-light-secondary md:flex justify-center items-center md:w-1/2 text-text-light-primary dark:text-text-dark-primary border-r-[.5px] dark:border-r-border-dark border-r-border-light">
      <div className="p-2 w-11/12 flex items-center justify-center text-center flex-col">
        {/* tagline */}
        <div className="px-2 py-8 md:py-4">
          <h1 className="font-semibold text-3xl mb-2">Welcome to Stash</h1>
          <span className="text-text-light-secondary dark:text-text-dark-secondary md:text-[.9rem]">
            Organize your development journey effortlessly.
          </span>
        </div>
        {/* image */}
        <div className="my-4">
          <picture>
            <source
              className="w-102"
              srcSet="/images/security-image.webp"
              type="image/webp"
            />
            <img
              className="w-102"
              src="/images/security-image.png"
              alt="Descriptive text"
            />
          </picture>
        </div>
        {/* message */}
        <div className="w-11/12 px-2 mt-8">
          <span className="text-text-light-secondary dark:text-text-dark-secondary md:text-[.9rem]">
            {descriptions[randomIndex]}
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthWelcomeSidebar;
