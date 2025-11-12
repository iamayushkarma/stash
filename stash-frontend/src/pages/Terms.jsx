import { FileText } from "lucide-react";

function Terms() {
  return (
    <div className="w-full h-auto py-10 text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
      {/* Header */}
      <div className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary">
        <FileText className="mx-auto mb-4" size={36} />
        <h1 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-dark-primary">
          Terms of Service
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base">
          Please take a few minutes to read these terms before using Stash.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-20 px-5 sm:px-0">
        <Section
          title="Introduction"
          content="These Terms of Service govern your access and use of Stash — a web and Chrome extension platform that helps you save, organize, and revisit code snippets, notes, and images. By creating an account or using the service, you agree to these terms."
        />

        <Section
          title="Your Responsibilities"
          content="When using Stash, you’re responsible for your saved content, login security, and actions within the app. Please don’t upload or share anything harmful, copyrighted, or inappropriate. Stash is designed to improve productivity, not to host or distribute sensitive or illegal material."
        />

        <Section
          title="Account and Access"
          content="To use personalized features like syncing and saving, you need to sign in with an account. You are responsible for maintaining the confidentiality of your login credentials. If you suspect any unauthorized activity, log out immediately and contact us."
        />

        <Section
          title="Storage and Tokens"
          content="Stash securely stores your saved snippets, screenshots, and notes along with authentication tokens for syncing between devices. Tokens are used to keep your session active and are not shared with anyone. Clearing your browser storage or logging out will invalidate these tokens."
        />

        <Section
          title="Acceptable Use"
          content={
            <ul className="list-disc list-inside text-text-light-secondary dark:text-text-dark-secondary">
              <li>
                Don’t use Stash to upload malicious scripts or exploit code.
              </li>
              <li>Don’t spam or flood the service with automated requests.</li>
              <li>Respect other users and the app’s functionality.</li>
              <li>
                Don’t attempt to reverse-engineer or copy parts of the platform.
              </li>
            </ul>
          }
        />

        <Section
          title="Intellectual Property"
          content="All Stash branding, icons, and UI elements belong to the developer of Stash. You retain ownership of your saved content — the app simply stores and manages it for your convenience."
        />

        <Section
          title="Termination"
          content="You may delete your account anytime from the Account section. The developer also reserves the right to restrict access or remove content that violates these terms."
        />

        <Section
          title="Updates to the Terms"
          content="These terms may be updated from time to time to reflect improvements, new features, or changes in policy. When updates occur, the latest version will always be available here on the Terms page."
        />

        <p className="mt-10 text-sm text-text-light-secondary dark:text-text-dark-secondary">
          Last updated: November 2025
        </p>
      </div>
    </div>
  );
}

export default Terms;

function Section({ title, content }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg sm:text-xl font-semibold mb-3">{title}</h2>
      {typeof content === "string" ? (
        <p className="text-sm sm:text-base leading-relaxed text-text-light-secondary dark:text-text-dark-secondary">
          {content}
        </p>
      ) : (
        content
      )}
    </section>
  );
}
