import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github, MessageSquare, Globe } from "lucide-react";

function Contact() {
  // Scroll to top on page load
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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
          transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
        >
          <Mail className="mx-auto mb-4" size={36} />
        </motion.div>
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Contact & Support
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          We're here to help you with any questions, feedback, or issues.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl mx-auto mt-20 px-4"
      >
        {/* Message Section */}
        <Section
          icon={<MessageSquare />}
          title="Get in Touch"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Have a question, found a bug, or want to share feedback? We'd love
              to hear from you. Drop a message anytime, and we'll get back
              within 24 hours.
            </p>
          }
          variants={sectionVariants}
        />

        {/* Contact Links */}
        <Section
          icon={<Mail />}
          title="Email Support"
          content={
            <a
              href="mailto:ayushkarma.dev@gmail.com"
              className="flex items-center gap-2 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              <Mail size={18} /> ayushkarma.dev@gmail.com
            </a>
          }
          variants={sectionVariants}
        />

        <Section
          icon={<Github />}
          title="GitHub"
          content={
            <a
              href="https://github.com/iamayushkarma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              <Github size={18} /> github.com/iamayushkarma
            </a>
          }
          variants={sectionVariants}
        />

        <Section
          icon={<Globe />}
          title="Project Website"
          content={
            <a
              href="https://stashapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
            >
              <Globe size={18} /> stashapp.com
            </a>
          }
          variants={sectionVariants}
        />
      </motion.div>
    </div>
  );
}

export default Contact;

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
      <div className="text-sm sm:text-base leading-relaxed">{content}</div>
    </motion.section>
  );
}
