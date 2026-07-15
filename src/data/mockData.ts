import type { Job, JobApplication, UserProfile } from "../types/index";


export const mockProfile: UserProfile = {
  id: "user-1",
  name: "Alex Developer",
  summary:
    "Frontend developer focused on building modern web applications.",
  skills: [
    "React",
    "TypeScript",
    "JavaScript",
    "Tailwind CSS",
  ],
  experience: [
    {
      id: "exp-1",
      company: "Example Company",
      role: "Frontend Developer",
      description:
        "Built responsive web applications using React and TypeScript.",
      startDate: "2023",
    },
  ],
  education: [
    {
      id: "edu-1",
      school: "Example University",
      degree: "Bachelor's Degree",
      field: "Computer Science",
    },
  ],
  projects: [
    {
      id: "project-1",
      name: "AI Job Search Assistant",
      description:
        "A platform that helps users organize and improve their job search.",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
  ],
};

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Developer",
    company: "Tech Company",
    description:
      "Build user interfaces using React and TypeScript.",
    requiredSkills: [
      "React",
      "TypeScript",
      "CSS",
    ],
  },
];

export const mockApplications: JobApplication[] = [
  {
    id: "application-1",
    jobId: "job-1",
    status: "Saved",
    notes:
      "Interested in this frontend position.",
  },
];