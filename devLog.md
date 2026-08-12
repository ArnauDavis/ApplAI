# Developer Log — AI Job Search Assistant Platform

## Project Status

**Current Phase:** Core frontend-to-backend integration complete → Finishing remaining API integrations

**Project Type:** Learning project + potential real product

**Primary Learning Goals:**

* React
* TypeScript
* TSX
* Tailwind CSS
* Full-stack development
* AI integration
* Product development

---

# Project Vision

Build an AI-powered job search assistant platform.

The long-term goal is a supervised AI agent that helps users:

* Discover job opportunities.
* Understand job requirements.
* Evaluate compatibility.
* Prepare applications.
* Manage their job search.
* Prepare for interviews.

The AI should act as a productivity assistant, not a decision-maker.

Core principle:

> AI assists, organizes, and prepares. The human approves important actions.

---

# Product Direction

The original concept:

"An AI tool that analyzes job postings."

The expanded vision:

"An AI job search operating system that eventually becomes a personal job search agent."

The user provides career information and preferences.

The AI helps manage the workflow.

---

# Product Evolution

## Phase 1 — MVP: AI Job Search Workspace

The user can:

1. Create a career profile.
2. Add job opportunities.
3. Analyze job compatibility.
4. Generate application drafts.
5. Track applications.

The AI is reactive.

The user requests assistance.

---

## Phase 2 — AI Job Search Assistant

The AI becomes proactive.

Features:

* Recommend jobs.
* Notify users about opportunities.
* Identify trends.
* Suggest improvements.
* Learn user preferences.

---

## Phase 3 — AI Job Search Agent (Long-Term Goal)

The AI can:

* Search job sources.
* Filter opportunities.
* Rank jobs.
* Prepare application materials.
* Organize workflow.

The user reviews and approves important actions.

Example:

"Found 8 strong matches. Prepared 2 applications for review."

---

# Product Principles

## Human Control

The AI must not:

* Automatically make career decisions.
* Submit applications without approval.
* Create false information.

The AI can:

* Suggest.
* Organize.
* Draft.
* Analyze.

---

## Truthfulness

The AI must never invent:

* Skills.
* Experience.
* Education.
* Achievements.

The user provides facts.

The AI improves presentation.

---

## Explainability

AI recommendations should include reasoning.

Example:

Good:

"Strong match because:

* React experience matches requirement.
* Similar dashboard project experience."

Bad:

"Match score: 94%."

---

# Initial Target User

Decision:

Not finalized.

Recommended starting audience:

Software developers seeking technical roles.

Reason:

* Structured skills.
* Easier initial data model.
* Clear job requirements.
* Good fit for a developer-built product.

Future expansion:

* Students.
* Career changers.
* General professionals.

---

# MVP Features

## 1. User Profile

User stores:

* Name
* Professional summary
* Skills
* Work experience
* Education
* Projects
* Career goals

---

## 2. Job Input

Initial version:

User provides:

* Job title.
* Company.
* Job description.
* URL (optional).

Future:

* Job APIs.
* Browser extension.
* Automated search.

---

## 3. AI Job Analysis

Input:

User profile + job posting.

Output:

* Matching skills.
* Missing skills.
* Relevant experience.
* Concerns.
* Suggestions.

The AI explains why it reached conclusions.

---

## 4. Application Assistance

AI helps create drafts:

* Resume improvements.
* Cover letters.
* Application answers.

The user reviews all content.

---

## 5. Application Tracker

Track:

* Saved jobs.
* Applications.
* Interviews.
* Offers.

Statuses:

```text
Saved
Reviewing
Preparing
Applied
Interview
Offer
Rejected
```

---

# Technical Direction

## Frontend

Chosen:

* React
* TypeScript
* TSX
* Tailwind CSS

Goals:

* Learn component architecture.
* Build reusable UI.
* Practice TypeScript.

---

## Backend

Chosen direction:

* Node.js + TypeScript.
* Express API framework.
* PostgreSQL database.
* Prisma ORM.

Goals:

* Learn backend development using the same language as the frontend.
* Create a clear API layer between the React application and database.
* Build a foundation for future AI integration.

Architecture:

```text
React App
    |
    v
Node.js + Express API
    |
    v
Prisma ORM
    |
    v
PostgreSQL Database
```

The core backend MVP is complete.

The frontend currently uses a temporary localStorage service and is now being prepared to connect to the backend API.

---

## AI Integration

The AI layer should be separated from the frontend.

Future architecture:

```text
React App
    |
Backend API
    |
AI Service
    |
AI Provider
```

---

# Initial Development Philosophy

Avoid over-planning.

Build → Learn → Improve → Document.

Do not create complexity before it is needed.

Documentation should support development, not replace it.

---

# Current Technical Plan

## First Build Goal

Create a working frontend application.

Initial features:

* App layout.
* Navigation.
* Dashboard page.
* Profile page.
* Jobs page.
* Applications page.

No AI integration initially.

Reason:

We need the product structure before adding intelligence.

---

# Development Milestones

## Milestone 1 — Project Setup

Tasks:

* Create React + TypeScript project.
* Install Tailwind CSS.
* Configure development environment.
* Create folder structure.

Status: COMPLETE

Completed:

✅ Created Vite React project
✅ Configured TypeScript
✅ Installed dependencies
✅ Verified local development server

---

## Milestone 2 — UI Foundation

Build:

* Layout.
* Navigation.
* Pages.
* Components.

Status: COMPLETE

Completed:

✅ Removed default Vite starter UI
✅ Verified Tailwind CSS configuration
✅ Created initial application shell
✅ Created reusable Header component
✅ Created reusable Navigation component
✅ Created initial page components:

* Dashboard
* Profile
* Jobs
* Applications

✅ Installed React Router
✅ Added BrowserRouter configuration
✅ Added application routes
✅ Connected navigation links to pages

Implementation decisions:

* Avoided creating folders before files were needed.
* Built the application incrementally.
* Kept App.tsx responsible for overall application layout and routing.
* Created reusable UI components only when there was a clear need.
* Created page components for complete application screens.
* Added routing only after multiple pages existed.
* Used React Router for client-side navigation.

Current application behavior:

* Application has a shared header.
* Application has a navigation sidebar.
* Users can navigate between pages without refreshing.
* Routes currently available:

```text
/              Dashboard
/profile       Profile
/jobs          Jobs
/applications  Applications
```

---

## Milestone 3 — Data Modeling

Status: COMPLETE

Completed:

✅ Created TypeScript data models
✅ Created UserProfile interface
✅ Created Experience interface
✅ Created Education interface
✅ Created Project interface
✅ Created Job interface
✅ Created JobApplication interface
✅ Created ApplicationStatus type
✅ Created frontend mock data
✅ Connected Profile page to profile data
✅ Connected Jobs page to job data
✅ Connected Applications page to application data
✅ Connected Dashboard page to application summaries

Data flow:

```text
types/index.ts
      |
      v
data/mockData.ts
      |
      v
pages/
      |
      v
UI
```

Implementation decisions:

* Created folders only when files were needed.
* Built data models before connecting UI to avoid hardcoded page content.
* Used TypeScript interfaces to define application data shapes.
* Used mock data as a temporary replacement for future API/database data.
* Used `import type` for TypeScript-only imports.

Example:

```ts
import type { UserProfile } from "../types/index";
```

---

## Milestone 4 — Application Interaction

Status: COMPLETE

Goals:

Move from displaying static data to allowing users to create and modify data.

Completed:

✅ Created ProfileForm component
✅ Added profile editing functionality
✅ Added React state management for profile data
✅ Created JobForm component
✅ Added job creation functionality
✅ Created ApplicationStatusSelect component
✅ Added application status updates
✅ Created ApplicationForm component
✅ Added application creation workflow
✅ Added localStorage persistence for profile data
✅ Added localStorage persistence for job data
✅ Added localStorage persistence for application data
✅ Created frontend data service layer
✅ Removed direct localStorage usage from page components

Current application behavior:

* Users can create and update profile information.
* Users can create job opportunities.
* Users can create applications from available jobs.
* Users can update application statuses.
* User data persists after browser refresh.

Current frontend data flow:

```text
Components
    |
    v
Pages
    |
    v
Services
    |
    v
localStorage
```

Implementation decisions:

* Components are responsible for UI only.
* Pages manage application state.
* Services manage data persistence.
* Data storage is abstracted behind a service layer.
* localStorage is being used as temporary persistence before backend implementation.

Future replacement:

```text
Components
    |
    v
Pages
    |
    v
Services
    |
    v
API
    |
    v
Prisma
    |
    v
PostgreSQL
```

---

## Milestone 5 — Backend

Status: COMPLETE

Technology decisions:

Chosen:

* Node.js
* TypeScript
* Express
* Prisma ORM
* PostgreSQL

Goals:

Create a backend API that replaces frontend mock data and localStorage persistence.

Completed:

### Backend foundation

✅ Created backend application
✅ Configured Node.js + TypeScript
✅ Created Express server
✅ Created API route structure
✅ Created profile routes
✅ Created backend TypeScript models
✅ Created service layer architecture
✅ Installed Prisma ORM
✅ Configured PostgreSQL database
✅ Created Prisma schema
✅ Created initial Prisma migration
✅ Connected backend to Prisma Client

### Profile and career data

✅ Created UserProfile database model
✅ Created Experience database model
✅ Created Education database model
✅ Created Project database model
✅ Created UserProfile → Experience relationship
✅ Created UserProfile → Education relationship
✅ Created UserProfile → Project relationship
✅ Created Experience service layer
✅ Created Education service layer
✅ Created Project service layer
✅ Added CRUD API routes for Experience
✅ Added CRUD API routes for Education
✅ Added CRUD API routes for Projects

### Job workflow

✅ Created Job database model
✅ Created Job service layer
✅ Added Job API routes
✅ Tested Job CRUD workflow using curl

### Application workflow

✅ Created Application database model
✅ Created Application service layer
✅ Added Application API routes
✅ Connected Applications to Jobs
✅ Connected Applications to UserProfiles

### Profile aggregation

✅ Updated UserProfile aggregation to include:

* Experience
* Education
* Projects
* Jobs
* Applications

### Backend verification

✅ Tested Experience CRUD workflow using curl
✅ Tested Job CRUD workflow using curl
✅ Verified the complete profile workflow through the API
✅ Verified Prisma relationships and database persistence

Current backend structure:

```text
backend/

├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
└── src/
    ├── routes/
    │   ├── index.ts
    │   └── profileRoutes.ts
    │
    ├── services/
    │   ├── profileService.ts
    │   ├── experienceService.ts
    │   ├── educationService.ts
    │   ├── projectService.ts
    │   ├── jobService.ts
    │   └── applicationService.ts
    │
    ├── lib/
    │   └── prisma.ts
    │
    ├── types/
    │   └── index.ts
    │
    └── server.ts
```

Implementation decisions:

* Started with temporary in-memory storage before adding a database.
* Added a service layer before introducing database logic.
* Replaced temporary storage with Prisma queries.
* Kept database access separated from API routes.
* Continued using a service layer to isolate Prisma/database logic from Express routes.
* Added relational data gradually instead of creating all models at once.
* Verified each backend feature manually through API testing before moving forward.
* Kept Experience logic inside profile services temporarily to reduce premature file separation.
* Avoided adding unnecessary backend abstractions before they were needed.

Current API:

### Profile endpoints

```text
GET    /profiles
POST   /profiles
GET    /profiles/:id
PUT    /profiles/:id
DELETE /profiles/:id
```

### Experience endpoints

```text
POST   /profiles/:profileId/experiences
GET    /profiles/:profileId/experiences
PUT    /profiles/experiences/:id
DELETE /profiles/experiences/:id
```

### Education endpoints

```text
POST   /profiles/:profileId/education
GET    /profiles/:profileId/education
PUT    /profiles/education/:id
DELETE /profiles/education/:id
```

### Project endpoints

```text
POST   /profiles/:profileId/projects
GET    /profiles/:profileId/projects
PUT    /profiles/projects/:id
DELETE /profiles/projects/:id
```

### Job endpoints

```text
POST   /profiles/:profileId/jobs
GET    /profiles/:profileId/jobs
PUT    /profiles/jobs/:id
DELETE /profiles/jobs/:id
```

### Application endpoints

```text
POST   /profiles/:profileId/applications
GET    /profiles/:profileId/applications
PUT    /profiles/applications/:id
DELETE /profiles/applications/:id
```

Current database model:

```text
UserProfile

id
name
summary
skills
createdAt
updatedAt
```

```text
Experience

id
company
title
description
startDate
endDate
userProfileId
createdAt
updatedAt
```

```text
Education

id
school
degree
field
userProfileId
createdAt
updatedAt
```

```text
Project

id
name
description
technologies
userProfileId
createdAt
updatedAt
```

```text
Job

id
title
company
description
url
userProfileId
createdAt
updatedAt
```

```text
Application

id
status
notes
jobId
userProfileId
createdAt
updatedAt
```

Relationships:

```text
UserProfile
|
├── Experience[]
├── Education[]
├── Project[]
├── Job[]
└── Application[]
```

```text
Job
|
└── Application[]
```

### Remaining backend improvements

These are not blockers for connecting the frontend:

* Add request validation.
* Add centralized error handling.
* Add API response consistency.
* Improve API error messages.
* Improve environment-based configuration.
* Add additional automated backend testing.

These improvements will be addressed after the core frontend → API connection is working.

---

## Milestone 6 — Frontend API Integration

Status: IN PROGRESS

Goal:

Replace the temporary frontend localStorage persistence with the backend API and PostgreSQL database.

Current frontend persistence:

```text
Components
    |
    v
Pages
    |
    v
storageService.ts
    |
    v
localStorage
```

Target architecture:

```text
Components
    |
    v
Pages
    |
    v
Frontend API Services
    |
    v
Express API
    |
    v
Backend Services
    |
    v
Prisma
    |
    v
PostgreSQL
```


Completed

✅ Backend API is available
✅ Backend CRUD services are available
✅ Backend database persistence is available
✅ Frontend service layer exists
✅ Profile frontend connected to backend API
✅ Profile updates persist through the API
✅ Jobs frontend connected to backend API
✅ Jobs can be created through the API
✅ Jobs can be updated through the API
✅ Jobs can be deleted through the API
✅ Applications frontend connected to backend API
✅ Applications can be created through the API
✅ Application statuses can be updated through the API
✅ Applications can be deleted through the API
✅ Frontend error handling added for API operations
✅ Loading states added to API-driven pages
✅ Button feedback added for important actions such as saving, updating, and deleting

Current status:

✅ Backend API is available
✅ Backend CRUD services are available
✅ Backend database persistence is available
✅ Frontend service layer already exists
⏳ Frontend services still use localStorage
⏳ Frontend pages have not yet been connected to the backend API
⏳ localStorage has not yet been removed

Current Frontend API Service
src/services/storageService.ts

The service now provides API functions for:

Profiles
Jobs
Applications

Examples:

getProfilesFromApi()
getProfileFromApi()
saveProfileToApi()

getJobsFromApi()
createJobToApi()
updateJobToApi()
deleteJobFromApi()

getApplicationsFromApi()
createApplicationToApi()
updateApplicationToApi()
deleteApplicationFromApi()

The frontend pages now communicate with the Express backend instead of relying on localStorage for the main application workflow.

Current Frontend Data Flow
Profile / Jobs / Applications Pages
                |
                v
       storageService.ts
                |
                v
          Express API
                |
                v
       Backend Services
                |
                v
             Prisma
                |
                v
          PostgreSQL
Jobs Workflow

Users can currently:

View jobs stored in PostgreSQL.
Add a job.
Edit a job.
Delete a job.
Open a job URL when provided.

The Jobs page provides visual feedback while saving changes.

Applications Workflow

Users can currently:

View applications stored in PostgreSQL.
Add an application to an existing job.
Change application status.
Delete an application.
View application notes and job information.

Application status changes are persisted through the backend API.

Profile Workflow

Users can currently:

Load their profile from PostgreSQL.
Edit their name.
Edit their professional summary.
Save profile changes through the backend API.
Important Cleanup

The old localStorage helper functions still exist in:

src/services/storageService.ts

They are no longer required for the main API workflow.

They can remain temporarily while development continues, but should eventually be removed once all frontend pages have been confirmed to use the API exclusively.

Remaining Milestone 6 Work

⏳ Connect remaining profile-related data such as:

Experience
Education
Projects

⏳ Review Dashboard data flow.

⏳ Remove obsolete localStorage functions after API integration is fully verified.

⏳ Add any remaining frontend loading and error states.

Development Approach

Frontend API integration is being completed incrementally.

Process:

Inspect the existing file.
Make the smallest necessary change.
Test the feature.
Confirm persistence in the backend.
Move to the next feature.

This approach is being used to avoid unnecessary refactoring and preserve working functionality.

Current Status

The core frontend-to-backend workflow is now working.

The application currently has functional API-backed:

Profile
Jobs
Applications

---

## Milestone 7 — AI Features

Add:

* Job analysis.
* Application assistance.
* AI workflows.

Status:

Future.

AI development will begin after the core full-stack application workflow is working reliably.

---

# Current Project Structure

```text
AI-Job-Search-Assistant/

├── DEVELOPER_LOG.md
├── README.md
├── package.json
├── src/
│
└── ...
```

Current frontend structure:

```text
src/
├── App.tsx
├── main.tsx
│
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── ProfileForm.tsx
│   ├── JobForm.tsx
│   ├── ApplicationForm.tsx
│   └── ApplicationStatusSelect.tsx
│
├── pages/
│   ├── Dashboard.tsx
│   ├── Profile.tsx
│   ├── Jobs.tsx
│   └── Applications.tsx
│
├── data/
│   └── mockData.ts
│
├── services/
│   └── storageService.ts
│
└── types/
    └── index.ts
```

---

# Completed Decisions

✅ Product idea selected.
✅ Long-term AI agent vision established.
✅ Human approval workflow established.
✅ MVP defined.
✅ Documentation simplified to one developer log.
✅ React + TypeScript + Tailwind chosen.
✅ Backend direction selected: Node.js + TypeScript + Express.
✅ Database selected: PostgreSQL.
✅ ORM selected: Prisma.
✅ Frontend interaction architecture established.
✅ Temporary frontend persistence implemented with localStorage.
✅ Backend persistence implemented with PostgreSQL and Prisma.
✅ UserProfile, Experience, Education, Project, Job, and Application backend models implemented.
✅ Backend service layer implemented.
✅ Backend CRUD API implemented for the core application models.
✅ Backend API tested during development.
✅ Frontend-to-backend integration identified as the next major milestone.

---

# Current Next Step

Begin replacing the frontend's temporary localStorage persistence with backend API calls.

The backend core is complete enough to support the frontend.

The immediate development approach is:

* Work on one file at a time.
* Inspect the existing implementation before changing it.
* Make the smallest necessary change.
* Test after each change.
* Avoid unnecessary refactoring.
* Preserve working functionality while transitioning from localStorage to PostgreSQL.

The first frontend file being reviewed for this transition is:

```text
src/services/storageService.ts
```

No changes have been made to the frontend API integration yet.

---

# Notes For Future AI Assistants

Read this file first.

The goal is to build a trustworthy AI job search assistant.

Priorities:

1. Build useful software.
2. Learn good engineering practices.
3. Avoid unnecessary complexity.
4. Keep users in control.
5. Document important decisions.
6. Work incrementally and verify changes before moving forward.
7. Prefer understanding the existing implementation before introducing changes.
