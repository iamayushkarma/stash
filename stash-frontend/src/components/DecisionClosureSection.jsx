import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function DecisionClosureSection() {
  return (
    <section className="w-full py-16 sm:py-20 md:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 bg-bg-light-primary dark:bg-bg-dark-primary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Main Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-6 sm:mb-8">
            Stop losing your captures.
            <br />
            <span className="text-text-light-secondary dark:text-text-dark-secondary">
              Start organizing today.
            </span>
          </h2>

          {/* Subtext */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-text-light-secondary dark:text-text-dark-secondary mb-10 sm:mb-12 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Join thousands who've already transformed the way they capture and
            organize content.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <Link to="/register">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 flex items-center gap-2 mx-auto text-sm sm:text-base group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>
            </Link>
            <p className="text-xs sm:text-sm text-text-light-secondary dark:text-text-dark-secondary mt-4">
              No credit card required • Free forever
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default DecisionClosureSection;
