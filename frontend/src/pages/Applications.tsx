import { useEffect, useState } from "react";
import ApplicationForm from "../components/ApplicationForm";
import ApplicationStatusSelect from "../components/ApplicationStatusSelect";
import {
  getProfilesFromApi,
  getApplicationsFromApi,
} from "../services/storageService";

interface Application {
  id: string;
  status: string;
  notes: string | null;
  job: {
    id: string;
    title: string;
    company: string;
    description: string;
    url?: string | null;
  };
}

function Applications() {
  const [applications, setApplications] =
    useState<Application[]>([]);

  const [profileId, setProfileId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        setProfileId(profile.id);

        const profileApplications =
          await getApplicationsFromApi(
            profile.id
          );

        setApplications(profileApplications);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load applications:",
          error
        );

        setError(
          "Unable to load applications from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  function updateStatus(
    id: string,
    status: Application["status"]
  ) {
    setApplications((currentApplications) =>
      currentApplications.map(
        (application) =>
          application.id === id
            ? {
                ...application,
                status,
              }
            : application
      )
    );
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Applications
        </h2>

        <p className="mt-6 text-gray-600">
          Loading applications...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Applications
      </h2>

      <p className="mt-2 text-gray-600">
        Track your job application progress.
      </p>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <ApplicationForm
          jobs={[]}
          onAddApplication={() => {}}
        />
      </div>

      <div className="mt-6 space-y-4">
        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">
              {application.job.title}
            </h3>

            <p className="text-gray-600">
              {application.job.company}
            </p>

            <p className="mt-3">
              {application.job.description}
            </p>

            {application.job.url && (
              <a
                href={application.job.url}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-block text-blue-600 hover:underline"
              >
                View Job
              </a>
            )}

            <div className="mt-4">
              <ApplicationStatusSelect
                status={application.status as any}
                onChange={(status) =>
                  updateStatus(
                    application.id,
                    status
                  )
                }
              />
            </div>

            {application.notes && (
              <p className="mt-4 text-gray-600">
                {application.notes}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Applications;

