import { useState } from "react";
import { mockJobs } from "../data/mockData";
import JobForm from "../components/JobForm";
import type { Job } from "../types/index";

function Jobs() {
  const [jobs, setJobs] = useState<Job[]>(() => {
    const savedJobs = localStorage.getItem("jobs");

    return savedJobs
      ? JSON.parse(savedJobs)
      : mockJobs;
  });

  function addJob(job: Job) {
    setJobs((currentJobs) => {
      const updatedJobs = [
        ...currentJobs,
        job,
      ];
    
      localStorage.setItem(
        "jobs",
        JSON.stringify(updatedJobs)
      );
    
      return updatedJobs;
    });
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Jobs
      </h2>

      <p className="mt-2 text-gray-600">
        Manage and analyze job opportunities.
      </p>

      <div className="mt-6">
        <JobForm onAddJob={addJob} />
      </div>

      <div className="mt-6 space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 rounded-lg shadow"
          >
            <h3 className="text-lg font-semibold">
              {job.title}
            </h3>

            <p className="text-gray-600">
              {job.company}
            </p>

            <p className="mt-3">
              {job.description}
            </p>

            <div className="mt-4">
              <h4 className="font-semibold">
                Required Skills
              </h4>

              <div className="flex flex-wrap gap-2 mt-2">
                {job.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;