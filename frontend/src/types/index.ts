export interface UserProfile {
  id: string;
  name: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  jobs: Job[];
  applications: JobApplication[];
}

export interface Experience {
  id: string;
  company: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string | null;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  url?: string | null;
  requiredSkills?: string[];
}

export type ApplicationStatus =
  | "Saved"
  | "Reviewing"
  | "Preparing"
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface JobApplication {
  id: string;
  jobId?: string;
  status: ApplicationStatus;
  notes?: string | null;
  appliedDate?: string;
  job?: Job;
}