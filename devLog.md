# Developer Log — AI Job Search Assistant Platform

## Project Status

**Current Phase:** Core frontend-to-backend integration complete → Dashboard API integration next

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
Technical Direction
Frontend

Chosen:

React
TypeScript
TSX
Tailwind CSS

Goals:

Learn component architecture.
Build reusable UI.
Practice TypeScript.
Backend

Chosen direction:

Node.js + TypeScript.
Express API framework.
PostgreSQL database.
Prisma ORM.

Goals:

Learn backend development using the same language as the frontend.
Create a clear API layer between the React application and database.
Build a foundation for future AI integration.

Architecture:

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

The core backend MVP is complete.

The frontend is now connected to the backend API for the main application workflows.

AI Integration

The AI layer should be separated from the frontend.

Future architecture:

React App
    |
Backend API
    |
AI Service
    |
AI Provider
Initial Development Philosophy

Avoid over-planning.

Build → Learn → Improve → Document.

Do not create complexity before it is needed.

Documentation should support development, not replace it.

Development Milestones
Milestone 1 — Project Setup

Status: COMPLETE

Completed:

✅ Created Vite React project
✅ Configured TypeScript
✅ Installed dependencies
✅ Verified local development server

Milestone 2 — UI Foundation

Status: COMPLETE

Completed:

✅ Removed default Vite starter UI
✅ Verified Tailwind CSS configuration
✅ Created initial application shell
✅ Created reusable Header component
✅ Created reusable Navigation component
✅ Created initial page components:

Dashboard
Profile
Jobs
Applications

✅ Installed React Router
✅ Added BrowserRouter configuration
✅ Added application routes
✅ Connected navigation links to pages

Implementation decisions:

Avoided creating folders before files were needed.
Built the application incrementally.
Kept App.tsx responsible for overall application layout and routing.
Created reusable UI components only when there was a clear need.
Created page components for complete application screens.
Added routing only after multiple pages existed.
Used React Router for client-side navigation.

Current routes:

/              Dashboard
/profile       Profile
/jobs          Jobs
/applications  Applications
Milestone 3 — Data Modeling

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

Data flow originally used:

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

The mock data layer is now being phased out in favor of API-backed data.

Implementation decisions:

Created folders only when files were needed.
Built data models before connecting UI to avoid hardcoded page content.
Used TypeScript interfaces to define application data shapes.
Used mock data as a temporary replacement for future API/database data.
Used import type for TypeScript-only imports.

Example:

import type { UserProfile } from "../types/index";
Milestone 4 — Application Interaction

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
✅ Added localStorage persistence during the initial frontend phase
✅ Created frontend data service layer
✅ Removed direct localStorage usage from page components
✅ Added Experience creation, editing, and deletion
✅ Added Project creation, editing, and deletion

The initial frontend data flow was:

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

This was temporary and has now been replaced for the main application workflows by API persistence.

Milestone 5 — Backend

Status: COMPLETE

Technology decisions:

Chosen:

Node.js
TypeScript
Express
Prisma ORM
PostgreSQL

Goals:

Create a backend API that replaces frontend mock data and localStorage persistence.

Backend foundation

Completed:

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

Profile and career data

Completed:

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

Job workflow

Completed:

✅ Created Job database model
✅ Created Job service layer
✅ Added Job API routes
✅ Tested Job CRUD workflow using curl

Application workflow

Completed:

✅ Created Application database model
✅ Created Application service layer
✅ Added Application API routes
✅ Connected Applications to Jobs
✅ Connected Applications to UserProfiles

Profile aggregation

Completed:

✅ Updated UserProfile aggregation to include:

Experience
Education
Projects
Jobs
Applications
Backend verification

Completed:

✅ Tested Experience CRUD workflow using curl
✅ Tested Job CRUD workflow using curl
✅ Verified the complete profile workflow through the API
✅ Verified Prisma relationships and database persistence

Current Backend Structure
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
    ├── data/
    │   └── profileStore.ts
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
Current API
Profile endpoints
GET    /profiles
POST   /profiles
GET    /profiles/:id
PUT    /profiles/:id
DELETE /profiles/:id
Experience endpoints
POST   /profiles/:profileId/experiences
GET    /profiles/:profileId/experiences
PUT    /profiles/experiences/:id
DELETE /profiles/experiences/:id
Education endpoints
POST   /profiles/:profileId/education
GET    /profiles/:profileId/education
PUT    /profiles/education/:id
DELETE /profiles/education/:id

Education exists in the backend, but frontend education functionality is intentionally being skipped for now.

Project endpoints
POST   /profiles/:profileId/projects
GET    /profiles/:profileId/projects
PUT    /profiles/projects/:id
DELETE /profiles/projects/:id
Job endpoints
POST   /profiles/:profileId/jobs
GET    /profiles/:profileId/jobs
PUT    /profiles/jobs/:id
DELETE /profiles/jobs/:id
Application endpoints
POST   /profiles/:profileId/applications
GET    /profiles/:profileId/applications
PUT    /profiles/applications/:id
DELETE /profiles/applications/:id
Current Database Models
UserProfile

id
name
summary
skills
createdAt
updatedAt
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
Education

id
school
degree
field
userProfileId
createdAt
updatedAt
Project

id
name
description
technologies
userProfileId
createdAt
updatedAt
Job

id
title
company
description
url
userProfileId
createdAt
updatedAt
Application

id
status
notes
jobId
userProfileId
createdAt
updatedAt

Relationships:

UserProfile
|
├── Experience[]
├── Education[]
├── Project[]
├── Job[]
└── Application[]
Job
|
└── Application[]
Milestone 6 — Frontend API Integration

Status: CORE INTEGRATION COMPLETE

Goal:

Replace the temporary frontend localStorage persistence with the backend API and PostgreSQL database.

Target architecture:

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
Completed frontend API integration
Profile

✅ Load profile from backend API
✅ Update profile through backend API
✅ Profile changes persist in PostgreSQL

Experience

✅ Load experiences from backend API
✅ Create experiences through backend API
✅ Edit experiences through backend API
✅ Delete experiences through backend API
✅ Experience changes persist in PostgreSQL

Projects

✅ Load projects from backend API
✅ Create projects through backend API
✅ Edit projects through backend API
✅ Delete projects through backend API
✅ Project changes persist in PostgreSQL

Jobs

✅ Load jobs from backend API
✅ Create jobs through backend API
✅ Edit jobs through backend API
✅ Delete jobs through backend API
✅ Open job URLs when provided
✅ Job changes persist in PostgreSQL

Applications

✅ Load applications from backend API
✅ Create applications through backend API
✅ Update application statuses through backend API
✅ Delete applications through backend API
✅ Application changes persist in PostgreSQL

Frontend UX

✅ Added frontend API error handling
✅ Added loading states to API-driven pages
✅ Added saving/updating/deleting feedback
✅ Added edit and delete controls for experience
✅ Added edit and delete controls for projects
✅ Added edit and delete controls for jobs
✅ Removed unnecessary delete confirmation popup from experience deletion
✅ Kept UI patterns consistent between editable sections

Current Frontend API Service

File:

src/services/storageService.ts

The file now contains API functions for:

Profiles
getProfilesFromApi()
getProfileFromApi()
saveProfileToApi()
Experiences
getExperiencesFromApi()
createExperienceToApi()
updateExperienceToApi()
deleteExperienceFromApi()
Projects
getProjectsFromApi()
createProjectToApi()
updateProjectToApi()
deleteProjectFromApi()
Jobs
getJobsFromApi()
createJobToApi()
updateJobToApi()
deleteJobFromApi()
Applications
getApplicationsFromApi()
createApplicationToApi()
updateApplicationToApi()
deleteApplicationFromApi()

The frontend service layer now communicates with the Express backend.

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

Profile-related data follows the same API architecture:

Profile Page
    |
    ├── Profile API
    ├── Experience API
    └── Project API
            |
            v
       Express API
            |
            v
       Prisma
            |
            v
       PostgreSQL
Important Current State

The main frontend workflows no longer depend on localStorage.

The old localStorage helper functions still exist temporarily in:

src/services/storageService.ts

They are:

getProfile()
saveProfile()

getJobs()
saveJobs()

getApplications()
saveApplications()

These functions are now obsolete for the main application workflow.

They should eventually be removed after the application has been fully verified to use the API exclusively.

Dashboard Status

The Dashboard is currently the next frontend area to update.

Current Dashboard implementation still reads from:

src/data/mockData.ts

Current Dashboard data:

Saved Jobs
Applications
Interviews

The current values are calculated from mock data.

Next task:

Replace Dashboard mock data with API-backed data.

Target:

Dashboard
    |
    v
storageService.ts
    |
    ├── getJobsFromApi()
    └── getApplicationsFromApi()
            |
            v
       Express API
            |
            v
       PostgreSQL

The Dashboard should eventually display live counts from the database rather than mock data.

Remaining Milestone 6 Work
Immediate next step

⏳ Update src/pages/Dashboard.tsx to use the backend API.

The Dashboard should:

Load the user's profile.
Load the user's jobs.
Load the user's applications.
Calculate saved job count.
Calculate application count.
Calculate interview count.
Display loading state.
Display API error state.
Remaining cleanup

After Dashboard API integration:

⏳ Verify all frontend pages use the API exclusively.

⏳ Remove obsolete localStorage helper functions.

⏳ Remove unused mock data imports from pages.

⏳ Determine whether src/data/mockData.ts is still needed.

⏳ Add any remaining frontend loading and error states.

Education

Education backend functionality exists.

However, frontend Education functionality is intentionally being skipped for now.

Reason:

The current development priority is completing the core frontend-to-backend workflow for:

Profile
Experience
Projects
Jobs
Applications
Dashboard

Education can be added later without blocking the current milestone.

Remaining Backend Improvements

These are not blockers for the current frontend workflow:

Add request validation.
Add centralized error handling.
Add API response consistency.
Improve API error messages.
Improve environment-based configuration.
Add additional automated backend testing.

These improvements will be addressed after the core frontend application workflow is complete.

Milestone 7 — AI Features

Status: FUTURE

Add:

Job analysis.
Application assistance.
AI workflows.
Job matching.
Resume assistance.
Cover letter assistance.

AI development will begin after the core full-stack application workflow is working reliably.

Current Frontend Structure
src/
├── App.tsx
├── main.tsx
│
├── components/
│   ├── Header.tsx
│   ├── Navigation.tsx
│   ├── ProfileForm.tsx
│   ├── ExperienceForm.tsx
│   ├── ExperienceSection.tsx
│   ├── ProjectForm.tsx
│   ├── ProjectSection.tsx
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
Completed Decisions

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
✅ Profile frontend connected to backend API.
✅ Experience frontend connected to backend API.
✅ Project frontend connected to backend API.
✅ Jobs frontend connected to backend API.
✅ Applications frontend connected to backend API.
✅ Frontend loading and error handling added.
✅ Frontend CRUD workflows verified for Profile, Experience, Projects, Jobs, and Applications.
✅ Education intentionally deferred.

Current Next Step

Update:

src/pages/Dashboard.tsx

The Dashboard currently uses mock data.

The next change should replace:

import { mockApplications, mockJobs } from "../data/mockData";

with API-backed data from:

src/services/storageService.ts

The Dashboard should use the same backend architecture as the rest of the application.

Development should continue one file at a time.

Development Approach

The project is being developed incrementally.

Process:

Inspect the existing file.
Understand how it currently works.
Make the smallest necessary change.
Test the feature.
Confirm persistence in PostgreSQL.
Update this developer log.
Move to the next feature.

Avoid unnecessary refactoring.

Preserve working functionality while improving the architecture.

Current Overall Status

The core full-stack application workflow is now working.

The application currently has functional API-backed:

Profile
Experience
Projects
Jobs
Applications

The next major task is:

Dashboard → API integration

After that:

Remove obsolete localStorage
        |
        v
Clean up mock data
        |
        v
Finish Milestone 6
        |
        v
Begin AI feature planning
Notes For Future AI Assistants

Read this file first.

The goal is to build a trustworthy AI job search assistant.

Priorities:

Build useful software.
Learn good engineering practices.
Avoid unnecessary complexity.
Keep users in control.
Document important decisions.
Work incrementally and verify changes before moving forward.
Prefer understanding the existing implementation before introducing changes.
Work one file at a time when making development changes.
Do not introduce new architecture unless the existing architecture cannot reasonably support the requirement.
Preserve working functionality while making incremental improvements.