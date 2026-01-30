import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Github } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import { useNavigate } from "react-router-dom";
import Button from "../utils/ui/Buttons/Button";
import logoDarkSecondary from "/logo/stash-logo-dark-secondary.png";
import logoLightSecondary from "/logo/stash-logo-light-secondary.png";

function Footer() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/login");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const infoLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const socialIconVariants = {
    hover: {
      scale: 1.15,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      className="w-full bg-bg-light-secondary flex flex-col justify-center items-center dark:bg-bg-dark-secondary border-t-[.5px] dark:border-t-border-dark border-t-border-light"
    >
      <div className="md:p-8 md:pb-4 pb-8 w-11/12 border-b-[.5px] border-b-[#374151]/30 dark:border-b-[#d1d5db]/30 grid min-md:grid-cols-4 text-text-light-primary dark:text-text-dark-primary">
        <div className="min-md:col-span-2">
          {/* logo */}
          <motion.div
            variants={logoVariants}
            className="flex justify-start items-center gap-4 py-8"
          >
            <motion.span
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              {theme == "dark" ? (
                <img
                  className="md:w-8 w-5"
                  src={logoDarkSecondary}
                  alt="stash-log"
                />
              ) : (
                <img
                  className="md:w-8 w-5"
                  src={logoLightSecondary}
                  alt="stash-log"
                />
              )}
            </motion.span>
            <span className="font-semibold text-2xl">Stash</span>
          </motion.div>

          {/* tag line */}
          <motion.div variants={itemVariants} className="w-11/12 select-none">
            <p className="lg:text-lg md:mt-2 mb-6 lg:w-11/12 text-[1rem]">
              An all-in-one space to manage snippets, notes, and screenshots
              without the clutter.
            </p>
          </motion.div>

          {/* contact */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={navigateToDashboard}
              className="text-[.8rem] px-4 py-1.5"
              text="Try now"
            />
          </motion.div>

          {/* social media */}
          <motion.div
            variants={itemVariants}
            className="flex items-center ml-1 py-6 gap-3 dark:text-text-dark-secondary text-text-light-secondary"
          >
            <motion.a
              variants={socialIconVariants}
              whileHover="hover"
              href="mailto:ayushkarma.dev@gmail.com"
              className="hover:text-text-light-primary hover:dark:text-text-dark-primary"
            >
              <Mail size={20} />
            </motion.a>
            <motion.a
              variants={socialIconVariants}
              whileHover="hover"
              href="https://github.com/iamayushkarma/stash"
              className="hover:text-text-light-primary hover:dark:text-text-dark-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} />
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col mt-9 md:mt-0 select-none md:items-end"
        >
          <div>
            <p className="font-semibold mb-4">Quick Links</p>
            <ul className="flex flex-col gap-2">
              {navLinks.map((links, id) => (
                <motion.a
                  key={id}
                  href={links.href}
                  className="flex text-[.9rem] lg:text-[1rem] hover:text-primary transition-colors"
                  whileHover={{ opacity: 0.8 }}
                >
                  {links.label}
                </motion.a>
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col mt-9 md:mt-0 select-none md:items-end"
        >
          <div>
            <p className="font-semibold mb-4">Information</p>
            <ul className="flex flex-col gap-2">
              {infoLinks.map((links, id) => (
                <motion.a
                  key={id}
                  href={links.href}
                  className="flex text-[.9rem] lg:text-[1rem] hover:text-primary transition-colors"
                  whileHover={{ opacity: 0.8 }}
                >
                  {links.label}
                </motion.a>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="p-6 grid">
        <div>
          <p
            className={`text-text-light-secondary dark:text-text-dark-secondary text-[.8rem] md:text-[1rem]`}
          >
            © 2025 Stash. Built with ❤️ by Ayush Karma.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Footer;
