import { useEffect, useState } from "react";
import JobForm from "../components/JobForm";
import {
  getProfilesFromApi,
  getJobsFromApi,
  createJobToApi,
  updateJobToApi,
  deleteJobFromApi,
  analyzeJobWithApi,
  type JobAnalysis,
} from "../services/storageService";
import type { Job } from "../types/index";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [profileId, setProfileId] =
    useState<string | null>(null);

  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const [analysisResults, setAnalysisResults] =
    useState<Record<string, JobAnalysis>>({});

  const [hiddenAnalysis, setHiddenAnalysis] =
    useState<Record<string, boolean>>({});
  
  const [analyzingJobId, setAnalyzingJobId] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadJobs() {
      try {
        const profiles =
          await getProfilesFromApi();

        if (profiles.length === 0) {
          setError("No profile was found.");
          return;
        }

        const profile = profiles[0];

        setProfileId(profile.id);

        const profileJobs =
          await getJobsFromApi(profile.id);

        setJobs(profileJobs);
        setError(null);
      } catch (error) {
        console.error(
          "Failed to load jobs:",
          error
        );

        setError(
          "Unable to load jobs from the backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadJobs();
  }, []);

  async function addJob(job: {
    title: string;
    company: string;
    description: string;
    url?: string;
  }) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      const createdJob =
        await createJobToApi(
          profileId,
          job
        );

      setJobs((currentJobs) => [
        ...currentJobs,
        createdJob,
      ]);

      setError(null);
    } catch (error) {
      console.error(
        "Failed to create job:",
        error
      );

      setError(
        "Unable to save job to the backend."
      );

      throw error;
    }
  }

  async function updateJob(
    jobId: string,
    job: {
      title: string;
      company: string;
      description: string;
      url?: string;
    }
  ) {
    try {
      const updatedJob =
        await updateJobToApi(
          jobId,
          job
        );

      setJobs((currentJobs) =>
        currentJobs.map((existingJob) =>
          existingJob.id === jobId
            ? updatedJob
            : existingJob
        )
      );

      setEditingJob(null);
      setError(null);
    } catch (error) {
      console.error(
        "Failed to update job:",
        error
      );

      setError(
        "Unable to update job."
      );

      throw error;
    }
  }

  async function deleteJob(
    jobId: string
  ) {
    try {
      await deleteJobFromApi(jobId);

      setJobs((currentJobs) =>
        currentJobs.filter(
          (job) => job.id !== jobId
        )
      );

      if (editingJob?.id === jobId) {
        setEditingJob(null);
      }

      setError(null);
    } catch (error) {
      console.error(
        "Failed to delete job:",
        error
      );

      setError(
        "Unable to delete job."
      );

      throw error;
    }
  }

  async function analyzeJob(jobId: string) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      setAnalyzingJobId(jobId);
      setError(null);

      const result = await analyzeJobWithApi(
        profileId,
        jobId
      );

      setAnalysisResults((currentResults) => ({
        ...currentResults,
        [jobId]: result,
      }));
    } catch (error) {
      console.error(
        "Failed to analyze job:",
        error
      );

      setError(
        "Unable to analyze job."
      );
    } finally {
      setAnalyzingJobId(null);
    }
  }

  if (loading) {
    return (
      <div>
        <h2 className="text-2xl font-semibold">
          Jobs
        </h2>

        <p className="mt-6 text-gray-600">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Jobs
      </h2>

      <p className="mt-2 text-gray-600">
        Manage and analyze job opportunities.
      </p>

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        {editingJob ? (
          <JobForm
            job={editingJob}
            onSave={(job) =>
              updateJob(
                editingJob.id,
                job
              )
            }
            onCancel={() =>
              setEditingJob(null)
            }
          />
        ) : (
          <JobForm
            onSave={addJob}
          />
        )}
      </div>

      <div className="mt-6 space-y-4">
        {jobs.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600">
              No jobs added yet.
            </p>
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {job.title}
                  </h3>

                  <p className="text-gray-600">
                    {job.company}
                  </p>

                  <p className="mt-3">
                    {job.description}
                  </p>

                  {job.url && (
                    <a
                      href={job.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-blue-600 hover:underline"
                    >
                      View Job
                    </a>
                  )}
                  {analysisResults[job.id] &&
  !hiddenAnalysis[job.id] && (
    <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg">
      <h4 className="font-semibold text-purple-900">
        AI Job Analysis
      </h4>

      <button
        type="button"
        onClick={() =>
          setHiddenAnalysis((current) => ({
            ...current,
            [job.id]: true,
          }))
        }
        className="mt-2 text-sm text-purple-600 hover:text-purple-800"
      >
        Hide Analysis
      </button>

      <div className="mt-3 space-y-4 text-sm text-gray-700">
        <div>
          <h5 className="font-semibold text-gray-900">
            Job Requirements
          </h5>

          {analysisResults[job.id].jobRequirements.length > 0 ? (
            <ul className="mt-1 list-disc list-inside">
              {analysisResults[job.id].jobRequirements.map(
                (item) => (
                  <li key={item}>{item}</li>
                )
              )}
            </ul>
          ) : (
            <p className="mt-1 text-gray-500">
              No specific requirements identified.
            </p>
          )}
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Matching Qualifications
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysisResults[job.id].matchingQualifications.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Missing Requirements
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysisResults[job.id].missingRequirements.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Relevant Experience
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysisResults[job.id].relevantExperience.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Potential Concerns
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysisResults[job.id].potentialConcerns.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-gray-900">
            Suggestions
          </h5>

          <ul className="mt-1 list-disc list-inside">
            {analysisResults[job.id].suggestions.map(
              (item) => (
                <li key={item}>{item}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  )}

{analysisResults[job.id] &&
  hiddenAnalysis[job.id] && (
    <button
      type="button"
      onClick={() =>
        setHiddenAnalysis((current) => ({
          ...current,
          [job.id]: false,
        }))
      }
      className="mt-4 text-sm text-purple-600 hover:text-purple-800 font-medium"
    >
      Show Analysis
    </button>
  )}
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      analyzeJob(job.id)
                    }
                    disabled={
                      analyzingJobId === job.id
                    }
                    className="text-purple-600 hover:text-purple-800 font-medium disabled:opacity-50"
                  >
                    {analyzingJobId === job.id
                      ? "Analyzing..."
                      : "Analyze"}
                  </button>
                    
                  <button
                    type="button"
                    onClick={() =>
                      setEditingJob(job)
                    }
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  
                  <button
                    type="button"
                    onClick={() =>
                      deleteJob(job.id)
                    }
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Jobs;