import { Mail, Github, MessageSquare, Globe } from "lucide-react";

function Contact() {
  return (
    <div className="w-full h-auto py-10 text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
      {/* Header Section */}
      <div className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary">
        <Mail className="mx-auto mb-4" size={36} />
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
          Contact & Support
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          We're here to help you with any questions, feedback, or issues.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto mt-20 px-4">
        {/* Message Section */}
        <Section
          icon={<MessageSquare />}
          title="Get in Touch"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Have a question, found a bug, or want to share feedback? We’d love
              to hear from you. Drop a message anytime, and we’ll get back
              within 24 hours.
            </p>
          }
        />

        {/* Contact Links */}
        <Section
          icon={<Mail />}
          title="Email Support"
          content={
            <a
              href="mailto:ayushkarma.dev@gmail.com"
              className="flex items-center gap-2 text-accent underline underline-offset-2"
            >
              <Mail size={18} /> ayushkarma.dev@gmail.com
            </a>
          }
        />

        <Section
          icon={<Github />}
          title="GitHub"
          content={
            <a
              href="https://github.com/iamayushkarma"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent underline underline-offset-2"
            >
              <Github size={18} /> github.com/iamayushkarma
            </a>
          }
        />

        <Section
          icon={<Globe />}
          title="Project Website"
          content={
            <a
              href="https://stashapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-accent underline underline-offset-2"
            >
              <Globe size={18} /> stashapp.com
            </a>
          }
        />
      </div>
    </div>
  );
}

export default Contact;

function Section({ icon, title, content }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-accent">{icon}</div>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-sm sm:text-base leading-relaxed">{content}</div>
    </section>
  );
}
