import { useEffect, useState } from "react";
import {
  getProfilesFromApi,
  getJobsFromApi,
  getApplicationsFromApi,
} from "../services/storageService";
import type {
  Job,
  JobApplication,
} from "../types/index";

function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] =
    useState<JobApplication[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        const [profileJobs, profileApplications] =
          await Promise.all([
            getJobsFromApi(profile.id),
            getApplicationsFromApi(profile.id),
          ]);

        setJobs(profileJobs);
        setApplications(profileApplications);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        setError(
          "Unable to load dashboard data from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const savedJobs = jobs.length;
  const applicationCount = applications.length;

  const interviews = applications.filter(
    (application) =>
      application.status === "Interview"
  ).length;

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Dashboard
        </h2>

        <p className="mt-6 text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <p className="mt-2 text-gray-600">
        Welcome to your job search workspace.
      </p>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Saved Jobs
          </h3>

          <p className="text-gray-600 mt-2">
            {savedJobs}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Applications
          </h3>

          <p className="text-gray-600 mt-2">
            {applicationCount}
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-semibold">
            Interviews
          </h3>

          <p className="text-gray-600 mt-2">
            {interviews}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;