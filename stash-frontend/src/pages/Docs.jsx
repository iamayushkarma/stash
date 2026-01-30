// import {
//   BookOpen,
//   Download,
//   Key,
//   Folder,
//   Monitor,
//   HelpCircle,
//   Mail,
// } from "lucide-react";

// function Docs() {
//   return (
//     <div className="w-full h-auto py-10 text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
//       <div className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary">
//         <BookOpen className="mx-auto mb-4" size={36} />
//         <h1 className="text-2xl text-text-dark-primary sm:text-3xl font-semibold mb-2">
//           Stash Documentation
//         </h1>
//         <p className="text-text-primary-secondary/30 text-sm sm:text-base">
//           Learn how to install, use, and make the most of your Stash experience.
//         </p>
//       </div>
//       <div className="max-w-4xl mx-auto mt-20">
//         {/* Overview */}
//         <Section
//           icon={<Monitor />}
//           title="Overview"
//           content="Stash helps developers, designers, and learners save code snippets, screenshots, and notes directly from their browser. It keeps your work organized, searchable, and accessible from any device."
//         />

//         {/* Installation */}
//         <Section
//           icon={<Download />}
//           title="Installation"
//           content={
//             <>
//               <h4 className="font-medium mb-2">Chrome Extension</h4>
//               <ul className="list-disc list-inside mb-3 text-text-light-secondary dark:text-text-dark-secondary">
//                 <li>
//                   Visit the Chrome Web Store and click <b>Add to Chrome</b>.
//                 </li>
//                 <li>Pin the Stash icon in your browser toolbar.</li>
//                 <li>
//                   Sign in to start saving snippets and screenshots instantly.
//                 </li>
//               </ul>
//               <h4 className="font-medium mb-2">Web App</h4>
//               <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
//                 <li>
//                   Go to <b>stashapp.com</b> (or your dashboard).
//                 </li>
//                 <li>Sign in with the same account as your extension.</li>
//                 <li>View and manage all saved items in one place.</li>
//               </ul>
//             </>
//           }
//         />

//         {/* Authentication */}
//         <Section
//           icon={<Key />}
//           title="Authentication"
//           content="Stash uses secure token-based login. Once authenticated, your saves are automatically synced between your browser and web dashboard. You can log out anytime from the Account section."
//         />

//         {/* Saving Content */}
//         <Section
//           icon={<BookOpen />}
//           title="Saving Content"
//           content={
//             <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
//               <li>
//                 <b>Code Snippets:</b> Highlight code → Right-click →{" "}
//                 <b>Save to Stash</b> → Add title and tags.
//               </li>
//               <li>
//                 <b>Images:</b> Right-click any image →{" "}
//                 <b>Save Image to Stash</b>.
//               </li>
//               <li>
//                 <b>Notes:</b> Click the Stash icon → <b>Quick Note</b> → Save
//                 instantly.
//               </li>
//             </ul>
//           }
//         />

//         {/* Organizing */}
//         <Section
//           icon={<Folder />}
//           title="Organizing Your Library"
//           content={
//             <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
//               <li>Filter snippets by tags or categories.</li>
//               <li>Search your saved items instantly.</li>
//               <li>Edit or delete entries easily.</li>
//               <li>Group related content using folders or custom labels.</li>
//             </ul>
//           }
//         />

//         {/* Dashboard Features */}
//         <Section
//           icon={<Monitor />}
//           title="Dashboard Features"
//           content={
//             <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
//               <li>Switch between light and dark modes.</li>
//               <li>Copy code snippets with one click.</li>
//               <li>Preview images, notes, and code side-by-side.</li>
//               <li>Enjoy a clean, distraction-free layout.</li>
//             </ul>
//           }
//         />

//         {/* Help & Support */}
//         <Section
//           icon={<HelpCircle />}
//           title="Troubleshooting & FAQs"
//           content={
//             <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
//               <li>
//                 <b>Extension not working?</b> Try reinstalling from the Chrome
//                 Store.
//               </li>
//               <li>
//                 <b>Login not saving?</b> Enable cookies and local storage
//                 permissions.
//               </li>
//               <li>
//                 <b>Content not syncing?</b> Make sure you're using the same
//                 account in both web and extension.
//               </li>
//             </ul>
//           }
//         />

//         {/* Contact */}
//         <Section
//           icon={<Mail />}
//           title="Contact & Support"
//           content={
//             <p className="text-text-light-secondary dark:text-text-dark-secondary">
//               Need help or found a bug? Reach out at{" "}
//               <a
//                 href="mailto:support@stashapp.com"
//                 className="text-accent underline underline-offset-2"
//               >
//                 support@stashapp.com
//               </a>
//               . We’ll get back to you soon.
//             </p>
//           }
//         />
//       </div>
//     </div>
//   );
// }

// export default Docs;

// function Section({ icon, title, content }) {
//   return (
//     <section className="mb-10">
//       <div className="flex items-center gap-3 mb-3">
//         <div className="text-accent">{icon}</div>
//         <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
//       </div>
//       <div className="text-sm sm:text-base leading-relaxed">
//         {typeof content === "string" ? (
//           <p className="text-text-light-secondary dark:text-text-dark-secondary">
//             {content}
//           </p>
//         ) : (
//           content
//         )}
//       </div>
//     </section>
//   );
// }

import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Download,
  Key,
  Folder,
  Monitor,
  HelpCircle,
  Mail,
} from "lucide-react";

function Docs() {
  // Scroll to top on page load
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="w-full h-auto py-10 text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
      {/* Header Section */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
        >
          <BookOpen className="mx-auto mb-4" size={36} />
        </motion.div>
        <h1 className="text-2xl text-text-dark-primary sm:text-3xl font-semibold mb-2">
          Stash Documentation
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          Learn how to install, use, and make the most of your Stash experience.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto mt-20 px-4"
      >
        {/* Overview */}
        <Section
          icon={<Monitor />}
          title="Overview"
          content="Stash helps developers, designers, and learners save code snippets, screenshots, and notes directly from their browser. It keeps your work organized, searchable, and accessible from any device."
          variants={sectionVariants}
        />

        {/* Installation */}
        <Section
          icon={<Download />}
          title="Installation"
          content={
            <>
              <h4 className="font-medium mb-2">Chrome Extension</h4>
              <ul className="list-disc list-inside mb-3 text-text-light-secondary dark:text-text-dark-secondary">
                <li>
                  Visit the Chrome Web Store and click <b>Add to Chrome</b>.
                </li>
                <li>Pin the Stash icon in your browser toolbar.</li>
                <li>
                  Sign in to start saving snippets and screenshots instantly.
                </li>
              </ul>
              <h4 className="font-medium mb-2">Web App</h4>
              <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
                <li>
                  Go to <b>stashapp.com</b> (or your dashboard).
                </li>
                <li>Sign in with the same account as your extension.</li>
                <li>View and manage all saved items in one place.</li>
              </ul>
            </>
          }
          variants={sectionVariants}
        />

        {/* Authentication */}
        <Section
          icon={<Key />}
          title="Authentication"
          content="Stash uses secure token-based login. Once authenticated, your saves are automatically synced between your browser and web dashboard. You can log out anytime from the Account section."
          variants={sectionVariants}
        />

        {/* Saving Content */}
        <Section
          icon={<BookOpen />}
          title="Saving Content"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>
                <b>Code Snippets:</b> Highlight code → Right-click →{" "}
                <b>Save to Stash</b> → Add title and tags.
              </li>
              <li>
                <b>Images:</b> Right-click any image →{" "}
                <b>Save Image to Stash</b>.
              </li>
              <li>
                <b>Notes:</b> Click the Stash icon → <b>Quick Note</b> → Save
                instantly.
              </li>
            </ul>
          }
          variants={sectionVariants}
        />

        {/* Organizing */}
        <Section
          icon={<Folder />}
          title="Organizing Your Library"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>Filter snippets by tags or categories.</li>
              <li>Search your saved items instantly.</li>
              <li>Edit or delete entries easily.</li>
              <li>Group related content using folders or custom labels.</li>
            </ul>
          }
          variants={sectionVariants}
        />

        {/* Dashboard Features */}
        <Section
          icon={<Monitor />}
          title="Dashboard Features"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>Switch between light and dark modes.</li>
              <li>Copy code snippets with one click.</li>
              <li>Preview images, notes, and code side-by-side.</li>
              <li>Enjoy a clean, distraction-free layout.</li>
            </ul>
          }
          variants={sectionVariants}
        />

        {/* Help & Support */}
        <Section
          icon={<HelpCircle />}
          title="Troubleshooting & FAQs"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>
                <b>Extension not working?</b> Try reinstalling from the Chrome
                Store.
              </li>
              <li>
                <b>Login not saving?</b> Enable cookies and local storage
                permissions.
              </li>
              <li>
                <b>Content not syncing?</b> Make sure you're using the same
                account in both web and extension.
              </li>
            </ul>
          }
          variants={sectionVariants}
        />

        {/* Contact */}
        <Section
          icon={<Mail />}
          title="Contact & Support"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Need help or found a bug? Reach out at{" "}
              <a
                href="mailto:support@stashapp.com"
                className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
              >
                ayushkarma.dev@gmail.com
              </a>
              . We'll get back to you soon.
            </p>
          }
          variants={sectionVariants}
        />
      </motion.div>
    </div>
  );
}

export default Docs;

function Section({ icon, title, content, variants }) {
  return (
    <motion.section variants={variants} className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          className="text-primary"
          whileHover={{ scale: 1.15, rotate: 10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-sm sm:text-base leading-relaxed">
        {typeof content === "string" ? (
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            {content}
          </p>
        ) : (
          content
        )}
      </div>
    </motion.section>
  );
}
