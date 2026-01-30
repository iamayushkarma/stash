import { useLayoutEffect } from "react";
import {
  HelpCircle,
  Search,
  Plus,
  Edit3,
  Trash2,
  FolderOpen,
  Image,
  Code,
  MessageSquare,
  Mail,
  BookOpen,
  Zap,
  Shield,
  Settings,
} from "lucide-react";

function Help() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full h-auto text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary">
      {/* Header */}
      <div className="w-full text-text-dark-primary h-74 flex flex-col items-center justify-center text-center bg-primary">
        <HelpCircle className="mx-auto mb-4" size={36} />
        <h1 className="text-2xl text-text-dark-primary sm:text-3xl font-semibold mb-2">
          Help & Support
        </h1>
        <p className="text-text-primary-secondary/30 text-sm sm:text-base px-4">
          Everything you need to know about using Stash
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto mt-20 px-5 sm:px-0">
        {/* Quick Start Guide */}
        <Section
          icon={<Zap />}
          title="Quick Start Guide"
          content={
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Getting Started
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>
                    Install the Stash Chrome extension from the Chrome Web Store
                  </li>
                  <li>Sign in with your account credentials</li>
                  <li>
                    Pin the extension to your browser toolbar for quick access
                  </li>
                  <li>Start saving snippets, images, and notes instantly</li>
                </ol>
              </div>
            </div>
          }
        />

        {/* Saving Content */}
        <Section
          icon={<Plus />}
          title="How to Save Content"
          content={
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-text-light-primary dark:text-text-dark-primary">
                  <Code className="w-4 h-4" />
                  Code Snippets
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary ml-6">
                  <li>Highlight the code you want to save on any webpage</li>
                  <li>Right-click and select &quot;Save to Stash&quot;</li>
                  <li>
                    Add a title, choose a category, and optionally add notes
                  </li>
                  <li>Click &quot;Save&quot; to store it in your collection</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-text-light-primary dark:text-text-dark-primary">
                  <Image className="w-4 h-4" />
                  Images & Screenshots
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary ml-6">
                  <li>Right-click on any image on a webpage</li>
                  <li>Select &quot;Save Image to Stash&quot;</li>
                  <li>Add a descriptive title and category</li>
                  <li>The image will be automatically uploaded and stored</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2 text-text-light-primary dark:text-text-dark-primary">
                  <MessageSquare className="w-4 h-4" />
                  Quick Notes
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary ml-6">
                  <li>Click the Stash icon in your browser toolbar</li>
                  <li>Select &quot;Quick Note&quot;</li>
                  <li>Type or paste your note</li>
                  <li>Add title, category, and save</li>
                </ul>
              </div>
            </div>
          }
        />

        {/* Managing Snippets */}
        <Section
          icon={<Edit3 />}
          title="Managing Your Snippets"
          content={
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Editing
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>Click the edit icon (pencil) on any snippet</li>
                  <li>Modify the title, category, content, or notes</li>
                  <li>Click the checkmark to save changes</li>
                  <li>Click the X to cancel without saving</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Deleting
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>Click the trash icon on any snippet</li>
                  <li>Confirm the deletion in the popup modal</li>
                  <li>Note: Deleted snippets cannot be recovered</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Copying Code
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>
                    Click the &quot;Copy&quot; button below any code snippet
                  </li>
                  <li>The code is instantly copied to your clipboard</li>
                  <li>Paste it anywhere you need</li>
                </ul>
              </div>
            </div>
          }
        />

        {/* Search & Filter */}
        <Section
          icon={<Search />}
          title="Search & Filter"
          content={
            <div className="space-y-3">
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                Use the search bar at the top of your collection to quickly find
                what you need:
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                <li>Search by title, content, or category</li>
                <li>Results update in real-time as you type</li>
                <li>Search works across all your snippets</li>
                <li>Clear the search to see all snippets again</li>
              </ul>
            </div>
          }
        />

        {/* Categories */}
        <Section
          icon={<FolderOpen />}
          title="Working with Categories"
          content={
            <div className="space-y-3">
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                Categories help you organize your snippets by topic, project, or
                type:
              </p>
              <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                <li>Create custom categories when saving snippets</li>
                <li>View all snippets in a category on the Categories page</li>
                <li>Expand/collapse categories to focus on what you need</li>
                <li>See snippet counts for each category at a glance</li>
                <li>Edit category names by editing individual snippets</li>
              </ul>
            </div>
          }
        />

        {/* Dashboard Features */}
        <Section
          icon={<Settings />}
          title="Dashboard Features"
          content={
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Stats Overview
                </h4>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">
                  At the top of your dashboard, you&apos;ll see quick stats
                  showing:
                </p>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary ml-4 mt-2">
                  <li>Total number of snippets</li>
                  <li>Number of unique categories</li>
                  <li>Total images saved</li>
                  <li>Total text snippets</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Recently Added
                </h4>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">
                  The sidebar shows your most recently saved snippets for quick
                  access. Click &quot;Show more&quot; to see additional items.
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Dark Mode
                </h4>
                <p className="text-text-light-secondary dark:text-text-dark-secondary">
                  Toggle between light and dark themes using the theme switcher
                  in the navigation bar for comfortable viewing any time of day.
                </p>
              </div>
            </div>
          }
        />

        {/* Tips & Best Practices */}
        <Section
          icon={<BookOpen />}
          title="Tips & Best Practices"
          content={
            <div className="space-y-3">
              <ul className="list-disc list-inside space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
                <li>
                  <strong className="text-text-light-primary dark:text-text-dark-primary">
                    Use descriptive titles
                  </strong>{" "}
                  - Make it easy to find snippets later
                </li>
                <li>
                  <strong className="text-text-light-primary dark:text-text-dark-primary">
                    Organize with categories
                  </strong>{" "}
                  - Group related snippets together (e.g., &quot;React&quot;,
                  &quot;CSS Tricks&quot;, &quot;APIs&quot;)
                </li>
                <li>
                  <strong className="text-text-light-primary dark:text-text-dark-primary">
                    Add notes
                  </strong>{" "}
                  - Include context about where you found something or how to
                  use it
                </li>
                <li>
                  <strong className="text-text-light-primary dark:text-text-dark-primary">
                    Save source URLs
                  </strong>{" "}
                  - Keep track of where snippets came from for reference
                </li>
                <li>
                  <strong className="text-text-light-primary dark:text-text-dark-primary">
                    Regular cleanup
                  </strong>{" "}
                  - Delete outdated or unused snippets to keep your collection
                  relevant
                </li>
              </ul>
            </div>
          }
        />

        {/* Troubleshooting */}
        <Section
          icon={<Shield />}
          title="Troubleshooting"
          content={
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Extension not working?
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>Try refreshing the page</li>
                  <li>Check if you&apos;re logged in to your account</li>
                  <li>Disable and re-enable the extension</li>
                  <li>Reinstall the extension from Chrome Web Store</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Snippets not syncing?
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>
                    Make sure you&apos;re using the same account on web and
                    extension
                  </li>
                  <li>Check your internet connection</li>
                  <li>Try logging out and back in</li>
                  <li>Clear browser cache and cookies</li>
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-2 text-text-light-primary dark:text-text-dark-primary">
                  Images not uploading?
                </h4>
                <ul className="list-disc list-inside space-y-1 text-text-light-secondary dark:text-text-dark-secondary">
                  <li>Check if the image is from a public URL</li>
                  <li>Try with a smaller image size</li>
                  <li>Ensure stable internet connection</li>
                  <li>
                    Some websites block image downloads - try saving from a
                    different source
                  </li>
                </ul>
              </div>
            </div>
          }
        />

        {/* Keyboard Shortcuts */}
        <Section
          icon={<Zap />}
          title="Keyboard Shortcuts"
          content={
            <div className="space-y-3">
              <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
                Speed up your workflow with these keyboard shortcuts:
              </p>
              <div className="grid gap-3">
                <ShortcutItem
                  keys={["Ctrl/Cmd", "K"]}
                  description="Focus search bar"
                />
                <ShortcutItem
                  keys={["Escape"]}
                  description="Close modals/cancel editing"
                />
                <ShortcutItem
                  keys={["Ctrl/Cmd", "C"]}
                  description="Copy selected code"
                />
              </div>
            </div>
          }
        />

        {/* Contact Support */}
        <Section
          icon={<Mail />}
          title="Still Need Help?"
          content={
            <div className="space-y-3">
              <p className="text-text-light-secondary dark:text-text-dark-secondary">
                Can&apos;t find what you&apos;re looking for? We&apos;re here to
                help!
              </p>
              <div className="bg-bg-light-secondary dark:bg-bg-dark-secondary p-4 rounded-lg border border-border-light dark:border-border-dark">
                <p className="text-text-light-secondary dark:text-text-dark-secondary mb-2">
                  Send us an email at:
                </p>
                <a
                  href="mailto:ayushkarma.dev@gmail.com"
                  className="text-primary font-medium hover:underline text-lg"
                >
                  ayushkarma.dev@gmail.com
                </a>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm mt-3">
                  We typically respond within 24-48 hours.
                </p>
              </div>
            </div>
          }
        />

        {/* Additional Resources */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800/30 dark:to-gray-700/30 border-l-4 border-primary rounded-r-lg">
          <h3 className="font-semibold text-lg mb-3 text-text-light-primary dark:text-text-dark-primary">
            Additional Resources
          </h3>
          <ul className="space-y-2 text-text-light-secondary dark:text-text-dark-secondary">
            <li>
              <a href="/docs" className="text-primary hover:underline">
                📚 Full Documentation
              </a>
            </li>
            <li>
              <a href="/privacy" className="text-primary hover:underline">
                🔒 Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms" className="text-primary hover:underline">
                📋 Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-center text-text-light-secondary dark:text-text-dark-secondary">
          Last updated: January 2025
        </p>
      </div>
    </div>
  );
}

export default Help;

function Section({ icon, title, content }) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-primary">{icon}</div>
        <h2 className="text-lg sm:text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-sm sm:text-base leading-relaxed">
        {typeof content === "string" ? (
          <p className="text-text-light-secondary dark:text-text-dark-secondary">
            {content}
          </p>
        ) : (
          content
        )}
      </div>
    </section>
  );
}

function ShortcutItem({ keys, description }) {
  return (
    <div className="flex items-center justify-between p-3 bg-bg-light-secondary dark:bg-bg-dark-secondary rounded-lg border border-border-light dark:border-border-dark">
      <span className="text-text-light-secondary dark:text-text-dark-secondary">
        {description}
      </span>
      <div className="flex gap-1">
        {keys.map((key, index) => (
          <kbd
            key={index}
            className="px-2 py-1 text-xs font-semibold text-text-light-primary dark:text-text-dark-primary bg-bg-light-primary dark:bg-bg-dark-primary border border-border-light dark:border-border-dark rounded"
          >
            {key}
          </kbd>
        ))}
      </div>
    </div>
  );
}
