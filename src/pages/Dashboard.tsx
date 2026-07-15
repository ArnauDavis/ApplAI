import { mockApplications, mockJobs } from "../data/mockData";

function Dashboard() {
  const savedJobs = mockJobs.length;
  const applications = mockApplications.length;

  const interviews = mockApplications.filter(
    (application) => application.status === "Interview"
  ).length;

  return (
    <div>
      <h2 className="text-2xl font-semibold">
        Dashboard
      </h2>

      <p className="mt-2 text-gray-600">
        Welcome to your job search workspace.
      </p>

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
            {applications}
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