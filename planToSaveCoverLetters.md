Cover Letter Persistence Plan
Goal

Generated cover letters should be persistent so that:

    A user doesn't have to regenerate a cover letter after refreshing the page.

    The existing generated PDF can be downloaded again.

    The AI generation endpoint is only called when the user explicitly wants a new cover letter.

    Cover letters remain associated with the correct job.

    The architecture can eventually support replacing/regenerating a cover letter cleanly.

Phase 1 — Inspect the existing generation flow

Before changing the database:

    Find the backend function that generates the cover-letter content.

    Find the backend function that converts the content into a PDF.

    Determine whether the PDF is generated entirely in memory or temporarily written to disk.

    Determine what the API currently returns to the frontend.

    Confirm whether Job.coverLetter currently contains the generated text or something else.

Do not modify anything yet.
Phase 2 — Decide what belongs in the database

Keep the cover-letter content/metadata in PostgreSQL, rather than storing the PDF binary directly in the Job table.

Likely fields:

coverLetter     String?
coverLetterUrl  String?
coverLetterCreatedAt DateTime?

The exact fields should be determined after inspecting the existing implementation.

The database should answer:

    "Does this job already have a generated cover letter?"

and:

    "Where is its existing PDF?"

Phase 3 — Choose PDF storage

Store the actual PDF outside the main relational database.

Possible approaches:

    Local filesystem — useful for development only.

    Object storage such as S3-compatible storage — appropriate for production.

    Another managed file-storage service.

The important distinction is:

PostgreSQL
    ↓
metadata + reference
    ↓
PDF storage
    ↓
actual cover-letter.pdf

Rather than:

PostgreSQL
    ↓
huge PDF binary

Phase 4 — Update the backend generation flow

Change the existing generation endpoint so that it:

    Receives the jobId.

    Checks whether a cover letter already exists.

    If one exists, return/use the existing stored version rather than generating another.

    If none exists:

        Generate the cover-letter content.

        Generate the PDF.

        Store the PDF.

        Save the relevant metadata/reference in the database.

        Return the saved result.

This makes generation persistent and idempotent from the user's perspective.
Phase 5 — Add explicit regeneration

Eventually provide a separate action such as:

Generate Cover Letter

when none exists, and:

Regenerate Cover Letter

when one already exists.

Regeneration should intentionally replace the existing version rather than happening automatically.

If version history becomes useful later, we can move to a separate:

CoverLetter

model instead of keeping everything directly on Job.
Phase 6 — Update the Jobs API

getJobs() should return enough information for the frontend to know whether a cover letter exists.

For example:

{
  id,
  title,
  company,
  description,
  ...
  hasCoverLetter: true
}

or the relevant metadata/reference.

That way the frontend doesn't lose the information after a refresh.
Phase 7 — Update the frontend

The Jobs page should use the persisted backend state rather than:

const [coverLetters, setCoverLetters] = useState(...)

as the source of truth.

The UI should be able to display:

Application material

Download Cover Letter PDF

immediately after loading the jobs if a saved cover letter exists.
Phase 8 — Update downloading

The download button should request the existing PDF from the backend.

It should not call the AI generation endpoint.

The flow becomes:

User clicks Download
        ↓
Backend finds saved PDF
        ↓
PDF returned
        ↓
Browser downloads it

No AI generation occurs.
Phase 9 — Handle regeneration safely

When the user explicitly regenerates:

Existing PDF
     ↓
Generate new letter
     ↓
Generate new PDF
     ↓
Save new PDF
     ↓
Update database reference

If we're using object storage, the old file can be deleted after the new file has been successfully stored.
Phase 10 — Test persistence

We should specifically test:

    Generate cover letter.

    Refresh the Jobs page.

    Confirm the job still shows that a cover letter exists.

    Download it without generating again.

    Close/reopen the application.

    Download it again.

    Regenerate it.

    Confirm the new version downloads.

    Confirm a job without a cover letter doesn't show the download action.

    Confirm deleting a job also handles its stored PDF appropriately.

Final architecture

The eventual flow should look roughly like:

                    ┌───────────────┐
                    │     Job       │
                    ├───────────────┤
                    │ id            │
                    │ analysis      │
                    │ coverLetter   │
                    │ pdf reference │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │ File Storage  │
                    ├───────────────┤
                    │ cover-letter  │
                    │ PDF           │
                    └───────────────┘