import { useState } from "react";
import {
  mockApplications,
  mockJobs,
} from "../data/mockData";
import ApplicationStatusSelect from "../components/ApplicationStatusSelect";
import type {
  JobApplication,
} from "../types/index";

function Applications() {
const [applications, setApplications] =
  useState<JobApplication[]>(() => {
    const savedApplications =
      localStorage.getItem("applications");

    return savedApplications
      ? JSON.parse(savedApplications)
      : mockApplications;
  });

function updateStatus(
  id: string,
  status: JobApplication["status"]
) {
  setApplications((currentApplications) => {
    const updatedApplications =
      currentApplications.map(
        (application) =>
          application.id === id
            ? {
                ...application,
                status,
              }
            : application
      );

    localStorage.setItem(
      "applications",
      JSON.stringify(updatedApplications)
    );

    return updatedApplications;
  });
}

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Applications
      </h2>

      <p className="mt-2 text-gray-600">
        Track your job application progress.
      </p>

      <div className="mt-6 space-y-4">
        {applications.map((application) => {
          const job = mockJobs.find(
            (job) =>
              job.id === application.jobId
          );

          return (
            <div
              key={application.id}
              className="bg-white p-6 rounded-lg shadow"
            >
              <h3 className="text-lg font-semibold">
                {job?.title ?? "Unknown Job"}
              </h3>

              <p className="text-gray-600">
                {job?.company ?? "Unknown Company"}
              </p>

              <div className="mt-4">
                <ApplicationStatusSelect
                  status={application.status}
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
          );
        })}
      </div>
    </div>
  );
}

export default Applications;