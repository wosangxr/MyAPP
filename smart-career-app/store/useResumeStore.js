import { create } from "zustand";

export const useResumeStore = create((set) => ({
  fullName: "Somchai Jaidee",
  jobTitle: "Full-Stack Developer",
  email: "somchai@smartcareer.com",
  phone: "089-123-4567",
  location: "Bangkok, Thailand",
  website: "github.com/somchai",
  summary:
    "Passionate full-stack developer with 3+ years of experience building modern web and mobile applications. Strong background in React ecosystem, cloud services, and agile methodologies.",
  skills: ["React", "TypeScript", "Node.js", "Python", "Firebase", "React Native", "SQL", "Docker", "Git", "REST APIs"],
  languages: [
    { name: "Thai", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  certifications: [
    { name: "AWS Cloud Practitioner", issuer: "Amazon Web Services", year: "2024" },
    { name: "React Developer Certificate", issuer: "Meta", year: "2023" },
  ],
  lastUpdated: "2026-03-15",
  pdfUri: "",
  pdfName: "",

  setResume: (data) =>
    set((state) => ({ ...state, ...data, lastUpdated: new Date().toISOString().split("T")[0] })),
  addResumeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.includes(skill) ? state.skills : [...state.skills, skill],
    })),
  removeResumeSkill: (skill) =>
    set((state) => ({ skills: state.skills.filter((s) => s !== skill) })),
  addLanguage: (lang) =>
    set((state) => ({ languages: [...state.languages, lang] })),
  removeLanguage: (name) =>
    set((state) => ({ languages: state.languages.filter((l) => l.name !== name) })),
  addCertification: (cert) =>
    set((state) => ({ certifications: [...state.certifications, cert] })),
  removeCertification: (name) =>
    set((state) => ({ certifications: state.certifications.filter((c) => c.name !== name) })),
}));
