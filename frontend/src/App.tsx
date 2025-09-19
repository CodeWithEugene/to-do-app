import { useAuth } from "./contexts/AuthContext";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import { TaskList } from "./components/TaskList";
import { CreateTaskDialog } from "./components/CreateTaskDialog";
import { TabView } from "./components/TabView";
import { LandingPage } from "./components/LandingPage";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const { user, loading, isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-paper flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-blue"></div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-20 bg-paper/80 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-serif font-bold text-ink">Tasks</h2>
          <SignOutButton />
        </div>
      </header>
      <main className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <Content
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isCreateTaskOpen={isCreateTaskOpen}
            setIsCreateTaskOpen={setIsCreateTaskOpen}
            user={user}
          />
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>
  );
}

function Content({
  activeTab,
  setActiveTab,
  isCreateTaskOpen,
  setIsCreateTaskOpen,
  user,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCreateTaskOpen: boolean;
  setIsCreateTaskOpen: (open: boolean) => void;
  user: any;
}) {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-ink mb-4">Your Tasks</h1>
        <p className="text-xl text-slate-600 font-light">
          Welcome back, {user?.name || user?.email || "friend"}!
        </p>
      </div>

      <TabView 
        activeTab={activeTab as any} 
        setActiveTab={setActiveTab as any}
        onNewTask={() => setIsCreateTaskOpen(true)}
      >
        <TaskList tab={activeTab} />
      </TabView>

      <CreateTaskDialog
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
      />
    </div>
  );
}