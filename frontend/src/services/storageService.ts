// --------------------
// API Profile Functions
// --------------------

export {
  getProfilesFromApi,
  getProfileFromApi,
  saveProfileToApi,
} from "./profileService";


// --------------------
// API Experience Functions
// --------------------

export {
  getExperiencesFromApi,
  createExperienceToApi,
  updateExperienceToApi,
  deleteExperienceFromApi,
} from "./experienceService";


// --------------------
// API Project Functions
// --------------------

export {
  getProjectsFromApi,
  createProjectToApi,
  updateProjectToApi,
  deleteProjectFromApi,
} from "./projectService";


// --------------------
// API Job Functions
// --------------------

export {
  getJobsFromApi,
  createJobToApi,
  importJobFromUrlApi,
  updateJobToApi,
  deleteJobFromApi,
} from "./jobService";

// --------------------
// API Application Functions
// --------------------

export {
  getApplicationsFromApi,
  createApplicationToApi,
  updateApplicationToApi,
  deleteApplicationFromApi,
} from "./applicationService";


// --------------------
// API AI Functions
// --------------------


export {
  analyzeJobWithApi,
  generateCoverLetterWithApi,
  downloadCoverLetterPdfFromApi,
} from "./aiService";

export type { JobAnalysis } from "./aiService";