import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useState } from "react";

const TABS = ["today", "upcoming", "completed"] as const;
type Tab = typeof TABS[number];

const SWIPE_CONFIDENCE_THRESHOLD = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function TabView({
  activeTab,
  setActiveTab,
  onNewTask,
  children,
}: {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onNewTask: () => void;
  children: React.ReactNode;
}) {
  const [[page, direction], setPage] = useState([TABS.indexOf(activeTab), 0]);
  const [isDragging, setIsDragging] = useState(false);

  const paginate = (newDirection: number) => {
    const newIndex = page + newDirection;
    if (newIndex >= 0 && newIndex < TABS.length) {
      setPage([newIndex, newDirection]);
      setActiveTab(TABS[newIndex]);
    }
  };

  return (
    <div className="space-y-8">
      <nav className="sticky top-20 z-10 -mx-6 px-6 py-2 bg-paper/80 backdrop-blur-sm">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 p-1 bg-white/50 rounded-xl shadow-sm">
            {TABS.map((tab, index) => (
              <button
                key={tab}
                onClick={() => {
                  setPage([index, index > page ? 1 : -1]);
                  setActiveTab(tab);
                }}
                className={`tab-button relative ${
                  activeTab === tab
                    ? "active text-ink"
                    : "text-slate-600 hover:bg-white/80"
                }`}
              >
                <span className="capitalize">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-slate-blue"
                    layoutId="activeTab"
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <button
            onClick={onNewTask}
            className="px-6 py-3 bg-slate-blue text-white rounded-lg hover:bg-slate-blue/90 transition-colors shadow-sm"
          >
            New Task
          </button>
        </div>
      </nav>

      <div className="relative overflow-hidden">
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="popLayout"
        >
          <motion.div
            key={page}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1
              },
              exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, { offset, velocity }: PanInfo) => {
              setIsDragging(false);
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
                paginate(1);
              } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
                paginate(-1);
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              cursor: isDragging ? "grabbing" : "grab"
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
