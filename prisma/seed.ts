import { PrismaClient } from "@prisma/client"

const Priority = {
  LOW: "LOW",
  MEDIUM: "MEDIUM", 
  HIGH: "HIGH",
  URGENT: "URGENT"
} as const

const RecurringType = {
  DAILY: "DAILY",
  WEEKLY: "WEEKLY",
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY"
} as const

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Starting database seed...")

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      image: "https://avatars.githubusercontent.com/u/1?v=4",
    },
  })

  console.log("✅ Created user:", user.email)

  // Create sample projects
  const workProject = await prisma.project.upsert({
    where: { id: "work-project" },
    update: {},
    create: {
      id: "work-project",
      name: "Work",
      description: "Work-related tasks",
      color: "#3B82F6",
      userId: user.id,
    },
  })

  const personalProject = await prisma.project.upsert({
    where: { id: "personal-project" },
    update: {},
    create: {
      id: "personal-project",
      name: "Personal",
      description: "Personal tasks and goals",
      color: "#10B981",
      userId: user.id,
    },
  })

  console.log("✅ Created projects")

  // Create sample categories
  const urgentCategory = await prisma.category.upsert({
    where: { id: "urgent-category" },
    update: {},
    create: {
      id: "urgent-category",
      name: "Urgent",
      color: "#EF4444",
      userId: user.id,
    },
  })

  const meetingsCategory = await prisma.category.upsert({
    where: { id: "meetings-category" },
    update: {},
    create: {
      id: "meetings-category",
      name: "Meetings",
      color: "#8B5CF6",
      userId: user.id,
    },
  })

  const shoppingCategory = await prisma.category.upsert({
    where: { id: "shopping-category" },
    update: {},
    create: {
      id: "shopping-category",
      name: "Shopping",
      color: "#F59E0B",
      userId: user.id,
    },
  })

  console.log("✅ Created categories")

  // Create sample tasks
  const tasks = [
    {
      title: "Complete project proposal",
      description: "Finish the Q4 project proposal and send to stakeholders",
      priority: Priority.HIGH,
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      projectId: workProject.id,
      categoryId: urgentCategory.id,
    },
    {
      title: "Team standup meeting",
      description: "Daily standup with the development team",
      priority: Priority.MEDIUM,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      reminderAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 - 30 * 60 * 1000), // 30 minutes before
      projectId: workProject.id,
      categoryId: meetingsCategory.id,
    },
    {
      title: "Grocery shopping",
      description: "Buy ingredients for weekend dinner",
      priority: Priority.LOW,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      projectId: personalProject.id,
      categoryId: shoppingCategory.id,
    },
    {
      title: "Review code changes",
      description: "Review pull requests from the team",
      priority: Priority.MEDIUM,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      projectId: workProject.id,
    },
    {
      title: "Plan vacation",
      description: "Research and book vacation for next month",
      priority: Priority.LOW,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
      projectId: personalProject.id,
    },
    {
      title: "Update documentation",
      description: "Update API documentation for new features",
      priority: Priority.MEDIUM,
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
      projectId: workProject.id,
    },
    {
      title: "Call dentist",
      description: "Schedule annual dental checkup",
      priority: Priority.LOW,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
      projectId: personalProject.id,
    },
    {
      title: "Client presentation",
      description: "Prepare presentation for client meeting",
      priority: Priority.URGENT,
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
      reminderAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000 - 2 * 60 * 60 * 1000), // 2 hours before
      projectId: workProject.id,
      categoryId: urgentCategory.id,
    },
    {
      title: "Exercise routine",
      description: "Go to the gym for workout session",
      priority: Priority.MEDIUM,
      recurring: RecurringType.WEEKLY,
      recurringInterval: 1,
      projectId: personalProject.id,
    },
    {
      title: "Budget review",
      description: "Review monthly expenses and budget",
      priority: Priority.MEDIUM,
      recurring: RecurringType.MONTHLY,
      recurringInterval: 1,
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
      projectId: personalProject.id,
    },
  ]

  for (const taskData of tasks) {
    await prisma.task.create({
      data: {
        ...taskData,
        userId: user.id,
      },
    })
  }

  console.log("✅ Created sample tasks")

  // Create some completed tasks
  const completedTasks = [
    {
      title: "Send weekly report",
      description: "Send weekly progress report to manager",
      priority: Priority.MEDIUM,
      completed: true,
      completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      projectId: workProject.id,
    },
    {
      title: "Buy coffee beans",
      description: "Purchase coffee beans for home",
      priority: Priority.LOW,
      completed: true,
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      projectId: personalProject.id,
      categoryId: shoppingCategory.id,
    },
  ]

  for (const taskData of completedTasks) {
    await prisma.task.create({
      data: {
        ...taskData,
        userId: user.id,
      },
    })
  }

  console.log("✅ Created completed tasks")

  console.log("🎉 Database seeded successfully!")
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
