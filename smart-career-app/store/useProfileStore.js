import { create } from "zustand";

export const useProfileStore = create((set) => ({
  name: "Somchai Jaidee",
  title: "Full-Stack Developer",
  email: "somchai@smartcareer.com",
  phone: "089-123-4567",
  location: "Bangkok, Thailand",
  bio: "Passionate full-stack developer with 3+ years of experience building web and mobile applications. Specializing in React, Node.js, and cloud technologies.",
  avatar: "",
  skills: ["React", "TypeScript", "Node.js", "Python", "Firebase", "React Native", "SQL", "Docker"],
  experiences: [
    {
      id: "1",
      title: "Frontend Developer",
      company: "TechCorp Co., Ltd.",
      period: "Jan 2024 - Present",
      description: "Building responsive web applications with React and TypeScript. Led a team of 3 developers on the company's main product redesign.",
    },
    {
      id: "2",
      title: "Junior Developer",
      company: "Digital Solutions",
      period: "Jun 2022 - Dec 2023",
      description: "Developed and maintained e-commerce platforms. Implemented payment integrations and RESTful APIs.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "B.Sc. Computer Science",
      school: "Chulalongkorn University",
      year: "2018 - 2022",
    },
  ],
  portfolio: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce app with payment integration, built with React and Node.js",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative task management tool with real-time updates using WebSocket",
      tags: ["React Native", "Firebase", "TypeScript"],
    },
    {
      id: "3",
      title: "AI Chatbot Dashboard",
      description: "Admin dashboard for managing AI chatbot conversations and analytics",
      tags: ["Python", "React", "OpenAI"],
    },
  ],
  appliedJobs: 12,
  savedJobs: 8,
  interviewCount: 3,
  careerScore: 85,

  setProfile: (data) => set((state) => ({ ...state, ...data })),
  addSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill) ? state.skills : [...state.skills, skill],
    })),
  removeSkill: (skill) =>
    set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),
  addExperience: (exp) =>
    set((state) => ({ experiences: [exp, ...state.experiences] })),
  removeExperience: (id) =>
    set((state) => ({ experiences: state.experiences.filter((e) => e.id !== id) })),
  updateExperience: (id, exp) =>
    set((state) => ({
      experiences: state.experiences.map((e) => (e.id === id ? { ...e, ...exp } : e)),
    })),
  addEducation: (edu) =>
    set((state) => ({ education: [edu, ...state.education] })),
  removeEducation: (id) =>
    set((state) => ({ education: state.education.filter((e) => e.id !== id) })),
  addPortfolio: (item) =>
    set((state) => ({ portfolio: [item, ...state.portfolio] })),
  removePortfolio: (id) =>
    set((state) => ({ portfolio: state.portfolio.filter((p) => p.id !== id) })),
}));
