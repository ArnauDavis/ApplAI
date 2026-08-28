import { useEffect, useState } from "react";
import {
  getProfilesFromApi,
  getJobsFromApi,
  createJobToApi,
  updateJobToApi,
  deleteJobFromApi,
  analyzeJobWithApi,
  importJobFromUrlApi,
  generateCoverLetterWithApi,
  downloadCoverLetterPdfFromApi,
  type JobAnalysis,
} from "../services/storageService";
import type { Job } from "../types/index";

import JobPageHeader from "../components/jobs/JobPageHeader";
import JobImportForm from "../components/jobs/JobImportForm";
import JobFormSection from "../components/jobs/JobFormSection";
import JobList from "../components/jobs/JobList";

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

  const [importingJob, setImportingJob] =
    useState(false);

  const [
    downloadingCoverLetterJobId,
    setDownloadingCoverLetterJobId,
  ] = useState<string | null>(null);

  const [coverLetters, setCoverLetters] =
    useState<Record<string, string>>({});

  const [
    generatingCoverLetterJobId,
    setGeneratingCoverLetterJobId,
  ] = useState<string | null>(null);

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
    }
  }

  async function analyzeJob(
    jobId: string
  ) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      setAnalyzingJobId(jobId);
      setError(null);

      const result =
        await analyzeJobWithApi(
          profileId,
          jobId
        );

      setAnalysisResults(
        (currentResults) => ({
          ...currentResults,
          [jobId]: result,
        })
      );
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

  async function generateCoverLetter(
    jobId: string
  ) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      setGeneratingCoverLetterJobId(jobId);
      setError(null);

      const coverLetter =
        await generateCoverLetterWithApi(
          profileId,
          jobId
        );

      setCoverLetters(
        (currentLetters) => ({
          ...currentLetters,
          [jobId]: coverLetter,
        })
      );
    } catch (error) {
      console.error(
        "Failed to generate cover letter:",
        error
      );

      setError(
        "Unable to generate cover letter."
      );
    } finally {
      setGeneratingCoverLetterJobId(null);
    }
  }

  async function downloadCoverLetterPdf(
    jobId: string
  ) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    try {
      setDownloadingCoverLetterJobId(jobId);
      setError(null);

      const pdf =
        await downloadCoverLetterPdfFromApi(
          profileId,
          jobId
        );

      const url =
        window.URL.createObjectURL(pdf);

      const link =
        document.createElement("a");

      link.href = url;
      link.download = "cover-letter.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(
        "Failed to download cover letter PDF:",
        error
      );

      setError(
        "Unable to download cover letter PDF."
      );
    } finally {
      setDownloadingCoverLetterJobId(null);
    }
  }

  async function importJob(
    url: string
  ) {
    if (!profileId) {
      setError("No profile is available.");
      return;
    }

    if (!url.trim()) {
      setError(
        "Please enter a job posting URL."
      );
      return;
    }

    try {
      setImportingJob(true);
      setError(null);

      const importedJob =
        await importJobFromUrlApi(
          profileId,
          url.trim()
        );

      setJobs((currentJobs) => [
        ...currentJobs,
        importedJob,
      ]);
    } catch (error) {
      console.error(
        "Failed to import job:",
        error
      );

      setError(
        "Unable to import job from URL."
      );

      throw error;
    } finally {
      setImportingJob(false);
    }
  }

  if (loading) {
    return (
      <div>
        <JobPageHeader />

        <p className="mt-6 text-gray-600">
          Loading jobs...
        </p>
      </div>
    );
  }

  return (
    <div>
      <JobPageHeader />

      {error && (
        <div className="mt-4 bg-red-100 text-red-700 p-4 rounded">
          {error}
        </div>
      )}

      <div className="mt-6">
        <JobImportForm
          onImport={importJob}
          importingJob={importingJob}
        />

        <JobFormSection
          editingJob={editingJob}
          onSave={
            editingJob
              ? (job) =>
                  updateJob(
                    editingJob.id,
                    job
                  )
              : addJob
          }
          onCancel={() =>
            setEditingJob(null)
          }
        />
      </div>

      <div className="mt-6">
        <JobList
          jobs={jobs}
          analysisResults={analysisResults}
          hiddenAnalysis={hiddenAnalysis}
          analyzingJobId={analyzingJobId}
          generatingCoverLetterJobId={
            generatingCoverLetterJobId
          }
          downloadingCoverLetterJobId={
            downloadingCoverLetterJobId
          }
          coverLetters={coverLetters}
          onAnalyze={analyzeJob}
          onGenerateCoverLetter={
            generateCoverLetter
          }
          onDownloadPdf={
            downloadCoverLetterPdf
          }
          onEdit={setEditingJob}
          onDelete={deleteJob}
          onHideAnalysis={(jobId) =>
            setHiddenAnalysis(
              (current) => ({
                ...current,
                [jobId]: true,
              })
            )
          }
          onShowAnalysis={(jobId) =>
            setHiddenAnalysis(
              (current) => ({
                ...current,
                [jobId]: false,
              })
            )
          }
          onDownloadSavedCoverLetter={
            downloadCoverLetterPdf
          }
        />
      </div>
    </div>
  );
}

export default Jobs;
