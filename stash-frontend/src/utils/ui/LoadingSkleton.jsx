function LoadingSkeleton() {
  return (
    <div className="p-2 columns-1 sm:columns-2 md:columns-3 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <SkeletonBox
          key={i}
          className={`w-full ${
            [
              "h-46",
              "h-52",
              "h-64",
              "h-48",
              "h-56",
              "h-72",
              "h-60",
              "h-44",
              "h-80",
              "h-64",
            ][i]
          } mb-4`}
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;

const SkeletonBox = ({ className }) => {
  return (
    <div
      className={`${className} box-border p-3 break-inside-avoid rounded-md border border-border-light dark:border-border-dark animate-pulse`}
    >
      <div className="w-full flex justify-between  items-center ">
        <div className="w-16 h-4 mb-1.5 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border border-border-light dark:border-border-dark"></div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 mb-1.5 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border border-border-light dark:border-border-dark"></div>
          <div className="w-4 h-4 mb-1.5 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border border-border-light dark:border-border-dark"></div>
        </div>
      </div>
      <div className="w-24 h-4 mb-2 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border border-border-light dark:border-border-dark"></div>
      <div className="w-full h-[55%] mb-2 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border-dashed border-1 border-border-light dark:border-border-dark"></div>
      <div className="w-full h-4 mb-1.5 rounded-sm bg-bg-light-secondary/50 dark:bg-bg-dark-secondary border border-border-light dark:border-border-dark"></div>
    </div>
  );
};
