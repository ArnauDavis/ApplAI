The goal should be to move AI analysis from temporary React state into the database as part of each job, while keeping the existing UI behavior intact.

Here is the full implementation plan I would use with an agent.
AI Job Analysis Persistence Plan
Phase 1 — Understand the existing flow

    Inspect the current JobAnalysis TypeScript type.

    Inspect the current Job TypeScript type.

    Inspect analyzeJobWithApi() in storageService.ts.

    Inspect the backend endpoint currently used by analyzeJobWithApi().

    Inspect the backend job model/entity/schema.

    Inspect the backend job response DTO/schema.

    Inspect the backend job update/create DTOs.

    Inspect how jobs are loaded by getJobsFromApi().

    Inspect JobAnalysisDisplay.

    Inspect JobList / JobCard to understand how analysis currently flows through the components.

Goal of this phase

Determine exactly where the analysis currently exists:

AI provider
   ↓
backend analysis endpoint
   ↓
analyzeJobWithApi()
   ↓
Jobs.tsx
   ↓
analysisResults React state
   ↓
JobList
   ↓
JobCard
   ↓
JobAnalysisDisplay

We need to determine what the database needs to store so this becomes:

AI provider
   ↓
backend analysis endpoint
   ↓
save analysis to Job
   ↓
database
   ↓
getJobsFromApi()
   ↓
Jobs.tsx
   ↓
JobList
   ↓
JobCard
   ↓
JobAnalysisDisplay

Phase 2 — Decide the database representation

    Determine whether the existing database already has a place for AI analysis.

    If not, add an analysis field to the job model.

    Determine whether the analysis should be stored as:

        structured JSON, or

        individual database columns.

    Match the database representation to the existing JobAnalysis structure.

    Decide whether null means "not analyzed yet."

    Preserve the ability to distinguish:

        never analyzed

        analyzed successfully

        analysis updated later

Preferred direction

If JobAnalysis is already a structured object containing things like:

summary
strengths
gaps
skills
recommendations
...

then I would strongly consider storing the analysis as JSON/JSONB rather than creating a large number of columns.

Conceptually:

Job
├── id
├── title
├── company
├── description
├── url
└── analysis
      ├── ...
      ├── ...
      └── ...

That keeps the database aligned with the AI response structure.
Phase 3 — Backend database migration

    Add the analysis field to the backend job model/entity.

    Make the field nullable.

    Create the database migration.

    Run the migration.

    Verify existing jobs still load correctly.

    Verify existing jobs have analysis = null.

    Verify creating a new job still works.

Important

We should not delete or overwrite existing jobs during this migration.

Existing data should remain valid.
Phase 4 — Backend API changes

Update the backend so analysis persistence happens server-side.

    Modify the analysis endpoint so it generates the AI analysis.

    Save the generated analysis to the corresponding job.

    Persist it only after successful analysis generation.

    Return the saved analysis from the endpoint.

    Make sure an AI failure does not overwrite an existing analysis.

    Make sure database failures are surfaced appropriately.

    Verify the endpoint still returns the expected JobAnalysis structure.

The important flow becomes:

POST /jobs/:id/analyze
        ↓
Load job
        ↓
Generate AI analysis
        ↓
Save analysis to database
        ↓
Return analysis

rather than:

POST /jobs/:id/analyze
        ↓
Generate AI analysis
        ↓
Return analysis
        ↓
React holds it temporarily

Phase 5 — Include analysis when fetching jobs

This is the part that makes persistence actually useful.

    Update the backend job response to include saved analysis.

    Update getJobsFromApi() if necessary.

    Update the frontend Job type to include the analysis.

    Make the field optional/nullable as appropriate.

    Verify a page refresh still returns the analysis.

    Verify navigating away from /jobs and returning still shows the analysis.

The desired behavior:

Analyze job
    ↓
Refresh browser
    ↓
Analysis still exists

and:

Analyze job
    ↓
Go Dashboard
    ↓
Go Jobs
    ↓
Analysis still exists

Phase 6 — Remove the temporary analysis storage

Currently Jobs.tsx has:

const [analysisResults, setAnalysisResults] =
  useState<Record<string, JobAnalysis>>({});

Once the database-backed flow is working, this becomes unnecessary.

    Remove analysisResults state.

    Remove setAnalysisResults.

    Stop storing analysis separately by job ID.

    Use job.analysis directly.

    Update JobList props.

    Update JobCard props if necessary.

    Update any other components relying on analysisResults.

Instead of:

analysisResults[job.id]

we want:

job.analysis

This gives us a single source of truth:

Database
   ↓
Job
   ↓
job.analysis

rather than:

Database
   ↓
Job

AI response
   ↓
analysisResults

Two separate sources of truth

Phase 7 — Update the analyze action

The current frontend logic roughly does:

const result = await analyzeJobWithApi(
  profileId,
  jobId
);

setAnalysisResults(...)

Change this so the returned updated analysis is incorporated into the job itself.

There are two possible approaches.
Option A — Analysis endpoint returns the updated job

Preferred if practical:

Analyze
  ↓
Backend saves analysis
  ↓
Backend returns updated Job
  ↓
Frontend replaces that Job in jobs[]

Then:

setJobs((currentJobs) =>
  currentJobs.map((job) =>
    job.id === updatedJob.id
      ? updatedJob
      : job
  )
);

Option B — Analysis endpoint returns only analysis

Then the frontend can update the relevant job locally:

setJobs((currentJobs) =>
  currentJobs.map((job) =>
    job.id === jobId
      ? {
          ...job,
          analysis: result,
        }
      : job
  )
);

The database remains authoritative either way.
Phase 8 — Preserve existing UI behavior

The persistence work should not change the existing UX unnecessarily.

Verify:

    Analyze button still works.

    Loading state still works.

    Analysis display still works.

    Hide analysis still works.

    Show analysis still works.

    Re-analyzing a job replaces the previous analysis.

    Analysis survives a browser refresh.

    Analysis survives navigation.

    Analysis survives logging out/in if authentication exists.

    Errors still display correctly.

    Existing jobs without analysis still display normally.

Phase 9 — Handle re-analysis correctly

A user may analyze the same job more than once.

We need an explicit rule:

Analyze job
    ↓
Existing analysis?
    ↓
Yes → replace it
No  → create it

So we should verify:

    Existing analysis is replaced when re-analyzing.

    Old analysis isn't accidentally merged with new analysis.

    Failed re-analysis does not destroy the previous successful analysis.

That last point is particularly important.

Ideally:

Existing analysis
       ↓
Attempt new AI analysis
       ↓
AI fails
       ↓
Existing analysis remains

rather than:

Existing analysis
       ↓
Set analysis = null
       ↓
AI fails
       ↓
Analysis lost

Phase 10 — Loading behavior

When the Jobs page initially loads:

GET jobs
    ↓
jobs include saved analysis
    ↓
React renders analysis

We should verify:

    No second AI request happens just to display existing analysis.

    Saved analysis appears immediately after jobs load.

    Jobs without analysis don't show an empty analysis component.

    Loading state remains unchanged.

The database should be the reason the analysis appears—not another AI call.
Phase 11 — TypeScript cleanup

After the backend and frontend are connected:

    Update Job.

    Update JobAnalysis if necessary.

    Update API response types.

    Remove obsolete analysisResults types/state.

    Remove unused imports.

    Remove unused props.

    Run TypeScript/compiler checks.

    Fix all type errors.

The ideal final model is something along the lines of:

type Job = {
  id: string;
  title: string;
  company: string;
  description: string;
  url?: string;
  analysis?: JobAnalysis | null;
};

The exact shape should follow your existing types rather than blindly copying this.
Phase 12 — Test the complete lifecycle

We should test this in order.
Test 1 — Existing job

    Open a job that has never been analyzed.

    Confirm no analysis appears.

Test 2 — Analyze

    Click Analyze.

    Confirm loading state.

    Confirm analysis appears.

    Confirm database contains the analysis.

Test 3 — Refresh

    Refresh the browser.

    Confirm analysis is still displayed.

Test 4 — Navigate away

    Navigate to Dashboard.

    Return to Jobs.

    Confirm analysis remains.

Test 5 — Re-analyze

    Analyze the same job again.

    Confirm the analysis updates.

    Confirm only the new analysis is displayed.

Test 6 — Failure

    Force/mock an AI failure.

    Confirm an error is displayed.

    Confirm an existing successful analysis is not lost.

Test 7 — Multiple jobs

    Analyze Job A.

    Analyze Job B.

    Confirm both analyses remain attached to the correct jobs.

    Refresh.

    Confirm both remain correct.

Phase 13 — Final cleanup

Once everything works:

    Remove temporary/debug logging.

    Remove obsolete React state.

    Remove obsolete props.

    Remove obsolete API behavior.

    Check backend migration status.

    Check frontend TypeScript errors.

    Check backend tests.

    Check frontend build.

    Review the final data flow.

The final architecture should be:

                    ┌──────────────────┐
                    │     Database     │
                    │                  │
                    │ Job              │
                    │ ├─ title         │
                    │ ├─ company       │
                    │ ├─ description   │
                    │ └─ analysis      │
                    └────────┬─────────┘
                             │
                             │ GET jobs
                             ↓
                    ┌──────────────────┐
                    │    Jobs.tsx      │
                    │                  │
                    │ jobs[]           │
                    └────────┬─────────┘
                             │
                             ↓
                    ┌──────────────────┐
                    │    JobList       │
                    └────────┬─────────┘
                             │
                             ↓
                    ┌──────────────────┐
                    │    JobCard       │
                    │                  │
                    │ job.analysis     │
                    └────────┬─────────┘
                             │
                             ↓
                    ┌──────────────────┐
                    │JobAnalysisDisplay│
                    └──────────────────┘

And when generating analysis:

User clicks Analyze
        ↓
analyzeJobWithApi()
        ↓
Backend
        ↓
Generate AI analysis
        ↓
Save analysis to Job
        ↓
Return saved analysis / updated Job
        ↓
Update jobs[] in React
        ↓
UI displays job.analysis

The order I recommend we actually work in

To avoid making a bunch of frontend changes before we understand the backend, I would not start editing Jobs.tsx yet.

Let's do this sequentially:

    Inspect backend job model/schema

    Inspect backend analysis endpoint

    Inspect storageService.ts

    Inspect Job and JobAnalysis types

    Design the DB field

    Add migration

    Persist analysis in backend

    Return analysis with jobs

    Update frontend types/API

    Remove analysisResults state

    Update JobList / JobCard

    Test persistence

    Clean up

That keeps the database as the source of truth and prevents us from building temporary frontend workarounds that we'll immediately have to undo.