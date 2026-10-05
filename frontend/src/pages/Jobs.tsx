import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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

import JobImportForm from "../components/jobs/JobImportForm";
import JobFormSection from "../components/jobs/JobFormSection";
import JobList from "../components/jobs/JobList";

function getHeaderHeight() {
  if (window.innerWidth >= 1024) {
    return 88;
  }

  if (window.innerWidth >= 640) {
    return 72;
  }

  return 64;
}

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>([]);

  const [profileId, setProfileId] =
    useState<string | null>(null);

  const [editingJob, setEditingJob] =
    useState<Job | null>(null);

  const [sortOption, setSortOption] =
    useState<"newest" | "oldest">("newest");

  const [jobToScrollTo, setJobToScrollTo] =
    useState<string | null>(null);

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

  const sortedJobs = [...jobs].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();

    return sortOption === "newest"
      ? dateB - dateA
      : dateA - dateB;
  });


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
      
        const savedAnalyses: Record<string, JobAnalysis> = {};
        const savedHiddenAnalysis: Record<string, boolean> = {};
      
        profileJobs.forEach((job) => {
          if (job.analysis) {
            savedAnalyses[job.id] = job.analysis;
            savedHiddenAnalysis[job.id] = true;
          }
        });
      
        setAnalysisResults(savedAnalyses);
        setHiddenAnalysis(savedHiddenAnalysis);
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

  useLayoutEffect(() => {
    if (!editingJob) {
      return;
    }

    const formElement =
      document.getElementById("job-form");

    if (!formElement) {
      return;
    }

    const headerHeight =
      getHeaderHeight();

    const formTop =
      formElement.getBoundingClientRect().top +
      window.scrollY;

    window.scrollTo({
      top: Math.max(
        0,
        formTop - headerHeight
      ),
      behavior: "smooth",
    });
  }, [editingJob]);

  useEffect(() => {
    if (!jobToScrollTo) {
      return;
    }

    const jobId = jobToScrollTo;

    setJobToScrollTo(null);

    requestAnimationFrame(() => {
      const jobElement =
        document.getElementById(
          `job-${jobId}`
        );

      if (!jobElement) {
        return;
      }

      const headerHeight =
        getHeaderHeight();

      const jobTop =
        jobElement.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: Math.max(
          0,
          jobTop - headerHeight
        ),
        behavior: "smooth",
      });
    });
  }, [jobToScrollTo, jobs]);

  function startEditingJob(job: Job) {
    setEditingJob(job);
  }

  function cancelEditingJob() {
    if (editingJob) {
      setJobToScrollTo(editingJob.id);
    }

    setEditingJob(null);
  }

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
        currentJobs.map(
          (existingJob) =>
            existingJob.id === jobId
              ? updatedJob
              : existingJob
        )
      );

      setJobToScrollTo(jobId);
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
      setDownloadingCoverLetterJobId(
        jobId
      );

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
      setDownloadingCoverLetterJobId(
        null
      );
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
      <div className="mx-auto max-w-7xl">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            Career Workspace
          </p>

          <h2 className="mt-2 font-display text-4xl tracking-tight text-ink sm:text-5xl">
            Jobs
          </h2>

          <p className="mt-3 text-sm text-muted">
            Loading your opportunities...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <section className="border-b border-line pb-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          Career Workspace
        </p>

        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl">
              Jobs
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted sm:text-base">
              Find, organize, and understand the opportunities
              you're considering.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <span className="h-2 w-2 rounded-full bg-moss" />

            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
              {jobs.length}{" "}
              {jobs.length === 1
                ? "opportunity"
                : "opportunities"}
            </span>
          </div>
        </div>
      </section>

      {error && (
        <div className="mt-6 border border-signal/40 bg-signal/10 px-4 py-3 text-sm">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-signal" />

            <div>
              <p className="font-medium text-ink">
                Something needs attention
              </p>

              <p className="mt-1 text-muted">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <section className="mt-8">
        <div className="mb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Add opportunity
          </p>

          <h3 className="mt-1 font-display text-2xl text-ink">
            Bring a role into your workspace
          </h3>
        </div>

        <div className="space-y-6">
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
            onCancel={cancelEditingJob}
          />
        </div>
      </section>

      <section className="mt-10 border-t border-line pt-8">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Your opportunities
            </p>
                  
            <h3 className="mt-1 font-display text-2xl text-ink">
              Saved jobs
            </h3>
          </div>
                  
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Sort
              </span>
                  
              <select
                value={sortOption}
                onChange={(event) =>
                  setSortOption(
                    event.target.value as
                      | "newest"
                      | "oldest"
                  )
                }
                className="border border-line bg-parchment px-3 py-2 text-xs font-medium text-ink outline-none transition-colors focus:border-copper"
              >
                <option value="newest">
                  Newest added
                </option>
              
                <option value="oldest">
                  Oldest added
                </option>
              </select>
            </label>
              
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-muted sm:block">
              {jobs.length} saved
            </span>
          </div>
        </div>


        <JobList
          jobs={sortedJobs}
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
          onEdit={startEditingJob}
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
      </section>
    </div>
  );
}

export default Jobs;
