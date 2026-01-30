import { motion } from "framer-motion";
import { Search, FolderOpen, Tags, Filter, Zap, Star } from "lucide-react";
import { useTheme } from "../hooks/useTheme";
import dashboardDark from "/images/dashboard-image-dark.png";
import dashboardLight from "/images/dashboard-image-light.png";

function SearchOrganizationSection() {
  const { theme } = useTheme();

  const features = [
    {
      icon: Search,
      title: "Lightning-Fast Search",
      description:
        "Find any snippet, screenshot, or note instantly with our powerful search engine.",
    },
    {
      icon: Tags,
      title: "Smart Categories",
      description:
        "Automatically organize your content with intelligent categorization.",
    },
    {
      icon: FolderOpen,
      title: "Custom Collections",
      description:
        "Create custom folders and collections to keep everything structured your way.",
    },
    {
      icon: Filter,
      title: "Advanced Filters",
      description:
        "Filter by type, date, category, or tags to find exactly what you need.",
    },
    {
      icon: Zap,
      title: "Quick Actions",
      description: "Edit, copy, share, or delete items with just one click.",
    },
    {
      icon: Star,
      title: "Recently Added",
      description:
        "Quick access to your most recent captures for instant retrieval.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-bg-light-secondary dark:bg-bg-dark-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-4 py-1.5 text-xs sm:text-sm font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
              Organization Made Easy
            </span>
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-text-light-primary dark:text-text-dark-primary mb-3 sm:mb-4 px-4">
            Search & Organization Deep Dive
          </h2>
          <p className="text-base sm:text-lg text-text-light-secondary dark:text-text-dark-secondary max-w-3xl mx-auto px-4">
            Never lose track of your captures again. Our intelligent
            organization system keeps everything at your fingertips.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Features List */}
          <motion.div
            className="order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="space-y-4 sm:space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="group"
                >
                  <div className="flex gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <feature.icon
                          className="w-5 h-5 sm:w-6 sm:h-6 text-primary"
                          strokeWidth={2}
                        />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-text-light-primary dark:text-text-dark-primary mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-sm sm:text-base text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            className="order-1 lg:order-2"
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-purple-500/10 to-pink-500/10 blur-3xl rounded-3xl" />

              {/* Dashboard Image Container */}
              <div className="relative rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-border-light dark:border-border-dark shadow-2xl">
                <motion.img
                  src={theme === "light" ? dashboardLight : dashboardDark}
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-light-primary/80 dark:from-bg-dark-primary/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg hidden sm:block"
                initial={{ opacity: 0, y: -20, x: 20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
                      10,000+
                    </p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Items Organized
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg hidden sm:block"
                initial={{ opacity: 0, y: 20, x: -20 }}
                whileInView={{ opacity: 1, y: 0, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-light-primary dark:text-text-dark-primary">
                      &lt;0.5s
                    </p>
                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary">
                      Search Speed
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default SearchOrganizationSection;
