"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Button from "@/components/Button";

export default function Home() {
  const handleAddTask = () => {
    console.log("Add task clicked");
    // TODO: Implement add task functionality
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex flex-col">
      {/* Header with Wordmark */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 px-4 py-8 sm:px-6 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-2">
              My Tasks
            </h2>
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-400 font-light">
              Stay focused on what matters.
            </p>
          </div>

          {/* Add Task Button */}
          <div className="mb-8">
            <Button
              label="Add task"
              icon={<span className="text-lg">+</span>}
              onClick={handleAddTask}
              variant="primary"
              size="md"
              ariaLabel="Add a new task"
            />
          </div>

          {/* Empty State Card */}
          <div className="bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 p-8 sm:p-12 text-center">
            <div className="max-w-sm mx-auto">
              {/* Empty State Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary-50 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 sm:w-10 sm:h-10 text-primary-600 dark:text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01m-.01 4h.01M9 16h.01"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-neutral-50 mb-2">
                No tasks yet
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Add your first task to get started.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Status Line */}
      <Footer />
    </div>
  );
}
