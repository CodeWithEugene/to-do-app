import { motion } from "framer-motion";
import { useState } from "react";
import { SignInForm } from "../SignInForm";

const features = [
  {
    title: "Natural Organization",
    description: "Tasks flow naturally between Today, Upcoming, and Completed views",
    icon: "📋"
  },
  {
    title: "Quick Capture",
    description: "Add tasks with natural language dates like 'next Thursday'",
    icon: "✏️"
  },
  {
    title: "Focused Interface",
    description: "Clean, paper-inspired design keeps you calm and productive",
    icon: "🎯"
  }
];

// Example tasks for the preview
const previewTasks = [
  {
    title: "Review quarterly goals",
    dueDate: "Today",
    priority: 1,
    completed: false
  },
  {
    title: "Team sync meeting",
    dueDate: "Today",
    priority: 2,
    completed: true
  },
  {
    title: "Update project timeline",
    dueDate: "Tomorrow",
    priority: 3,
    completed: false
  }
];

export function LandingPage() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl lg:text-6xl font-serif font-bold text-ink mb-6"
              >
                Task management,<br />
                with a human touch
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-600 mb-8"
              >
                A calming, paper-inspired space to organize your tasks and find clarity in your day.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => setIsSignUpOpen(true)}
                className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors shadow-lg text-lg"
              >
                Start Your Journey
              </motion.button>
            </div>
            <div className="flex-1">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="paper-card overflow-hidden shadow-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-ink">Today's Tasks</h2>
                  <button className="px-4 py-2 bg-slate-blue text-white rounded-lg text-sm">
                    New Task
                  </button>
                </div>
                <div className="space-y-4">
                  {previewTasks.map((task, index) => (
                    <motion.div
                      key={task.title}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="task-card group"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`priority-indicator priority-${task.priority}`} />
                        <div className="checkbox-wrapper pt-1">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            readOnly
                            className="cursor-not-allowed"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className={`text-lg transition-all duration-300 ${
                            task.completed ? 'line-through text-slate-400' : ''
                          }`}>
                            {task.title}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="due-date-badge due-soon">
                              Due {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="paper-card p-6 text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-bold text-ink mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold text-ink mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-slate-600 mb-8">
            Join others who have found peace in their task management.
          </p>
          <button
            onClick={() => setIsSignUpOpen(true)}
            className="px-8 py-4 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors shadow-lg text-lg"
          >
            Begin Your Free Trial
          </button>
        </div>
      </section>

      {/* Sign Up Dialog */}
      {isSignUpOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={(e) => e.target === e.currentTarget && setIsSignUpOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="paper-card w-full max-w-md m-4 p-8"
          >
            <h3 className="text-2xl font-serif font-bold text-ink mb-6 text-center">
              Start Your Journey
            </h3>
            <SignInForm />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
