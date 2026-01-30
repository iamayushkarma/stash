import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

function Privacy() {
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
      {/* Header */}
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
          <Shield className="mx-auto mb-4" size={36} />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-dark-primary">
          Privacy Policy
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          We respect your privacy and take your data protection seriously.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto mt-20 px-5 sm:px-0"
      >
        <Section
          title="Introduction"
          content="Your privacy is important to us. This policy explains what information Stash collects, how it's used, and how you can control your data. By using the app or extension, you consent to this policy."
          variants={sectionVariants}
        />
        <Section
          title="Information We Collect"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>
                <b>Account Data:</b> Name, email, and profile info (for login
                and syncing).
              </li>
              <li>
                <b>Usage Data:</b> General data like app activity, saved items
                count, and timestamps.
              </li>
              <li>
                <b>Stored Data:</b> Code snippets, screenshots, and notes that
                you manually save.
              </li>
              <li>
                <b>Authentication Tokens:</b> Used for keeping your session
                active — never shared externally.
              </li>
            </ul>
          }
          variants={sectionVariants}
        />
        <Section
          title="How We Use Your Data"
          content="Your information is used solely to provide Stash's functionality: saving, syncing, and organizing your content. We don't sell or share your personal data with any third parties."
          variants={sectionVariants}
        />
        <Section
          title="Data Security"
          content="We use encrypted connections and secure storage mechanisms to protect your information. While no system is completely invulnerable, we take all reasonable steps to safeguard your content."
          variants={sectionVariants}
        />
        <Section
          title="Cookies and Local Storage"
          content="Stash uses local storage and cookies to remember your login state and theme preferences. This makes the app faster and more convenient for you. You can clear this data anytime through your browser settings."
          variants={sectionVariants}
        />
        <Section
          title="Managing or Deleting Your Data"
          content="You have full control over your saved items. You can delete snippets, images, or your entire account whenever you choose. Once deleted, this data cannot be recovered."
          variants={sectionVariants}
        />
        <Section
          title="Third-Party Services"
          content="Stash may use third-party services like Firebase or a database provider for secure authentication and data storage. These providers are bound by strong privacy agreements and do not access your personal data."
          variants={sectionVariants}
        />
        <Section
          title="Policy Updates"
          content="We may update this Privacy Policy occasionally to improve transparency or comply with new data protection standards. Any significant changes will be announced within the app."
          variants={sectionVariants}
        />
        <motion.p
          variants={sectionVariants}
          className="mt-10 text-sm text-text-light-secondary dark:text-text-dark-secondary"
        >
          Last updated: November 2025
        </motion.p>
      </motion.div>
    </div>
  );
}

export default Privacy;

function Section({ title, content, variants }) {
  return (
    <motion.section variants={variants} className="mb-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      {typeof content === "string" ? (
        <p className="text-sm sm:text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
          {content}
        </p>
      ) : (
        content
      )}
    </motion.section>
  );
}
