import { motion } from "framer-motion";
import {
  Bookmark,
  Image,
  FileText,
  Zap,
  Users,
  Briefcase,
  Link,
} from "lucide-react";

function UseCasesSection() {
  const useCases = [
    {
      icon: Bookmark,
      title: "Content Creators",
      description:
        "Save inspiring designs, color palettes, and creative references instantly. Build your visual library without losing track.",
      gradient: "from-blue-500/10 to-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Briefcase,
      title: "Professionals",
      description:
        "Capture important slides, documents, and meeting notes. Keep everything organized and accessible when you need it.",
      gradient: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: FileText,
      title: "Students & Researchers",
      description:
        "Screenshot lecture slides, research papers, and study materials. Create a searchable knowledge base for your learning.",
      gradient: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: Image,
      title: "Designers & Artists",
      description:
        "Collect design inspiration, UI patterns, and artwork references. Your personal mood board, always at hand.",
      gradient: "from-orange-500/10 to-amber-500/10",
      iconColor: "text-orange-500",
    },
    {
      icon: Zap,
      title: "Developers",
      description:
        "Save code snippets, documentation, and bug solutions. Quick access to your development resources library.",
      gradient: "from-cyan-500/10 to-blue-500/10",
      iconColor: "text-cyan-500",
    },
    {
      icon: Users,
      title: "Teams & Collaborators",
      description:
        "Share important screenshots and notes with your team. Centralize visual communication in one place.",
      gradient: "from-rose-500/10 to-red-500/10",
      iconColor: "text-rose-500",
    },
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

  const cardVariants = {
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

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-bg-light-primary dark:bg-bg-dark-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-3 sm:mb-4 px-4">
            Perfect for Everyone
          </h2>
          <p className="text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-2xl mx-auto px-4">
            Whether you're creating, learning, or building, our tool adapts to
            your workflow
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.98 }}
              className="group"
            >
              <div className="h-full p-5 sm:p-6 rounded-xl sm:rounded-2xl border border-border-light dark:border-border-dark bg-bg-light-secondary dark:bg-bg-dark-secondary hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${useCase.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <useCase.icon
                        className={`w-5 h-5 sm:w-6 sm:h-6 ${useCase.iconColor}`}
                        strokeWidth={2}
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-2 sm:mb-3">
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <Link to="/register">
          <motion.div
            className="mt-12 sm:mt-14 md:mt-16 text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm sm:text-base text-text-light-secondary dark:text-text-dark-secondary mb-5 sm:mb-6">
              Join thousands of users who've transformed their workflow
            </p>
            <button className="px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 active:scale-[0.98] shadow-lg shadow-primary/20 text-sm sm:text-base">
              Start Capturing Now
            </button>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}

export default UseCasesSection;
