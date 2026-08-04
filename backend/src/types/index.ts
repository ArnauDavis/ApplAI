export interface UserProfile {
  id: string;
  name: string;
  summary: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
  projects: Project[];
  jobs: Job[];
  applications: Application[];
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
  url?: string;
}


export interface Application {
  id: string;
  status: string;
  notes?: string;
  job: Job;
}