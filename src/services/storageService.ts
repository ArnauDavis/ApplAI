import type {
  Job,
  JobApplication,
  UserProfile,
} from "../types/index";

function getItem<T>(
  key: string,
  fallback: T
): T {
  const item =
    localStorage.getItem(key);

  return item
    ? JSON.parse(item)
    : fallback;
}

function setItem<T>(
  key: string,
  value: T
) {
  localStorage.setItem(
    key,
    JSON.stringify(value)
  );
}

export function getProfile(
  fallback: UserProfile
) {
  return getItem(
    "profile",
    fallback
  );
}

export function saveProfile(
  profile: UserProfile
) {
  setItem(
    "profile",
    profile
  );
}

export function getJobs(
  fallback: Job[]
) {
  return getItem(
    "jobs",
    fallback
  );
}

export function saveJobs(
  jobs: Job[]
) {
  setItem(
    "jobs",
    jobs
  );
}

export function getApplications(
  fallback: JobApplication[]
) {
  return getItem(
    "applications",
    fallback
  );
}

export function saveApplications(
  applications: JobApplication[]
) {
  setItem(
    "applications",
    applications
  );
}