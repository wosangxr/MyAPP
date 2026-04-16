import { create } from "zustand";

export const useAppStore = create((set, get) => ({
  savedJobs: [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp",
      location: "Bangkok",
      salary: "30k - 50k",
      match: 92,
      type: "Full-time",
      savedAt: "2026-03-28",
    },
    {
      id: "3",
      title: "Mobile Developer",
      company: "AppWorks",
      location: "Bangkok",
      salary: "35k - 55k",
      match: 89,
      type: "Full-time",
      savedAt: "2026-03-25",
    },
  ],
  notifications: [
    {
      id: "1",
      type: "interview",
      title: "Interview Scheduled",
      body: "Your interview with TechCorp for Frontend Developer is scheduled for April 10, 2026 at 10:00 AM",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "message",
      title: "New Message from CloudX",
      body: "Thank you for your application. We'd like to discuss your qualifications further.",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      type: "match",
      title: "New Job Match - 95%",
      body: "Senior React Developer at InnoTech matches your skills perfectly!",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      type: "status",
      title: "Application Update",
      body: "Your application for Backend Engineer at CloudX has been reviewed.",
      time: "2 days ago",
      read: true,
    },
    {
      id: "5",
      type: "system",
      title: "Profile Tip",
      body: "Complete your portfolio section to increase your match score by 15%!",
      time: "3 days ago",
      read: true,
    },
  ],

  toggleSaveJob: (job) =>
    set((state) => {
      const exists = state.savedJobs.find((j) => j.id === job.id);
      if (exists) {
        return { savedJobs: state.savedJobs.filter((j) => j.id !== job.id) };
      }
      return { savedJobs: [...state.savedJobs, { ...job, savedAt: new Date().toISOString().split("T")[0] }] };
    }),
  isJobSaved: (id) => get().savedJobs.some((j) => j.id === id),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    })),
  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
  unreadCount: () => get().notifications.filter((n) => !n.read).length,
}));
