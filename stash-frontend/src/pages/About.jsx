import { Info, Lightbulb, Target, Layers, Code2 } from "lucide-react";

function About() {
  return (
    <div className="w-full h-auto py-10 text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
      {/* Header Section */}
      <div className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary">
        <Info className="mx-auto mb-4" size={36} />
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2">About Stash</h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          A simple and powerful way to save, organize, and access your work
          anywhere.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-20 px-4">
        <Section
          icon={<Lightbulb />}
          title="How Stash Started"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Stash was created out of a personal need — a way to quickly save
              and organize code snippets, screenshots, and notes without
              breaking focus. As a developer, I wanted a lightweight tool that
              blends into the workflow instead of getting in the way. That idea
              grew into what’s now Stash — a unified, cross-platform space for
              everything you want to keep.
            </p>
          }
        />

        {/* Mission */}
        <Section
          icon={<Target />}
          title="My Mission"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              My goal is to make saving and recalling useful content effortless
              for anyone who works on the web. Stash is designed to be fast,
              reliable, and clean — helping you capture ideas instantly and
              access them anytime through your browser or dashboard.
            </p>
          }
        />

        {/* What It Offers */}
        <Section
          icon={<Layers />}
          title="What Stash Offers"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>Save code, screenshots, and notes in one click.</li>
              <li>Access everything from your dashboard anytime.</li>
              <li>Organize by tags and folders for easy searching.</li>
              <li>Sync seamlessly between extension and web app.</li>
              <li>Toggle light and dark themes for your workspace.</li>
            </ul>
          }
        />
        <Section
          icon={<Code2 />}
          title="Built & Maintained By"
          content={
            <p className="text-text-light-secondary dark:text-text-dark-secondary">
              Hi, I’m <b>Ayush Karma</b> — the developer behind Stash. Every
              line of code, design decision, and feature update is crafted with
              the goal of making productivity tools feel more human and
              efficient.
            </p>
          }
        />
      </div>
    </div>
  );
}

export default About;

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
