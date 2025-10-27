import { BsClipboardPlus } from "react-icons/bs";
import { IoPricetagsOutline, IoSearch } from "react-icons/io5";
import { IoMdSync } from "react-icons/io";
import "./components.css";

function FeatureSection() {
  return (
    <div className="flex items-center justify-center bg-primary grid-bg">
      {/* feature section */}
      <div className="flex w-full sm:w-11/12 md:w-3/4 items-center justify-center p-4 sm:mt-20">
        <div className="text-center flex flex-col items-center justify-center">
          {/* heading */}
          <h1 className="w-2/3 text-2xl sm:text-3xl md:text-4xl font-medium text-text-dark-primary">
            From Digital Clutter to a Clear Library.
          </h1>
          {/* sub heading */}
          <p className="sm:w-3/4 mt-8 text-md sm:text-ld text-text-dark-primary/90">
            Turn your scattered finds into a structured, searchable library.
            Explore the powerful but simple features that make it possible.
          </p>
          {/* feature card */}
          <div className="mt-16 min-sm:grid grid-cols-2 grid-rows-2">
            <FeatureCard
              icon={
                <BsClipboardPlus
                  size={18}
                  className="text-text-light-primary"
                />
              }
              heading="Effortless Capture"
              subHeading="A simple right-click is all it takes to save formatted text, code, or any image you find. Never break your focus or lose a great find again."
            />
            <FeatureCard
              icon={
                <IoPricetagsOutline
                  className="text-text-light-primary"
                  size={18}
                />
              }
              heading="Smart Organization"
              subHeading="Go beyond simple bookmarks. Add a title, category, and notes to give your content context, making it structured and easy to find later."
            />
            <FeatureCard
              icon={<IoSearch className="text-text-light-primary" size={18} />}
              heading="Instant Full-Text Search"
              subHeading="Our powerful search scans every title, category, and piece of saved content. Rediscover your best ideas and find exactly what you need in seconds."
            />
            <FeatureCard
              icon={<IoMdSync className="text-text-light-primary" size={18} />}
              heading="Seamlessly Synced"
              subHeading="Content captured with the extension is instantly available on your personal dashboard. Your entire library is always up-to-date, wherever you are."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeatureSection;

function FeatureCard({ heading, subHeading, icon }) {
  return (
    <div className="p-2 flex mr-2">
      <div className="p-2 mr-2">
        <div className="w-9 md:w-10 h-9 flex items-center justify-center md:h-10 bg-bg-light-secondary rounded-lg shadow-xs">
          {icon}
        </div>
      </div>
      <div className="p-2 text-start">
        <h2 className="font-medium mb-2 sm:mb-3 text-text-dark-primary">
          {heading}
        </h2>
        <p className="text-text-dark-primary/90">{subHeading}</p>
      </div>
    </div>
  );
}
