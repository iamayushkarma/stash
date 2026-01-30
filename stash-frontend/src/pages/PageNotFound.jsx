import { useLayoutEffect } from "react";
import { motion } from "framer-motion";
import Button from "../utils/ui/Buttons/Button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function PageNotFound() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.4,
      },
    },
  };

  return (
    <div className="w-full select-none h-svh fixed dark:text-text-dark-primary bg-bg-light-primary text-text-light-primary dark:bg-bg-dark-primary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col justify-center relative h-[100%] items-center"
      >
        {/* 404 Badge */}
        <motion.div variants={badgeVariants}>
          <motion.span
            className="bg-primary/10 dark:text-text-dark-secondary text-text-light-secondary px-5 py-2 rounded-lg text-lg font-semibold"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            404
          </motion.span>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          variants={itemVariants}
          className="p-6 pb-3 text-lg md:text-xl lg:text-2xl"
        >
          <p className="font-semibold">Oops! Page not found.</p>
        </motion.div>

        {/* Description */}
        <motion.div
          variants={itemVariants}
          className="text-center w-11/12 max-w-md text-sm md:text-md lg:text-lg dark:text-text-dark-secondary text-text-light-secondary"
        >
          <p>
            We couldn't find the page you're looking for. It might have been
            moved or doesn't exist anymore.
          </p>
        </motion.div>

        {/* Button */}
        <motion.div variants={buttonVariants} className="mt-6">
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button text="Back to Home" className="flex items-center gap-2">
                <Home size={18} />
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-primary/5 rounded-full blur-xl"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"
          animate={{
            y: [0, 20, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      </motion.div>
    </div>
  );
}

export default PageNotFound;
