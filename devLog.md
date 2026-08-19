# Developer Log — AI Job Search Assistant Platform

## Project Status

**Current Phase:** Job URL import complete → Cover letter generation and storage next

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

## Milestone 6 — Frontend API Integration

Status: COMPLETE

Frontend features connected to the backend:

✅ Profile
✅ Experience
✅ Projects
✅ Jobs
✅ Applications
✅ Dashboard

All primary application data now flows through:

React
    ↓
Frontend API Service
    ↓
Express API
    ↓
Backend Services
    ↓
Prisma
    ↓
PostgreSQL

✅ localStorage removed from the active workflow
✅ mockData removed
✅ Dashboard verified
✅ API persistence verified
✅ Loading states implemented
✅ Error handling implemented

 ## Milestone 7 — AI Integration

Status: IN PROGRESS

Goal:

Begin adding AI capabilities to the job search assistant while keeping the AI layer separated from the frontend and core application logic.

The initial AI provider strategy is:

* Ollama for local AI development.
* Hugging Face for remote/cloud-based AI inference.

The application should be able to use local models during development while keeping the architecture flexible enough to support Hugging Face models later.

---

## AI Architecture

The planned architecture is:

```text
React Frontend
      |
      v
Express API
      |
      v
AI Service Layer
      |
      ├── Ollama
      |
      └── Hugging Face

The frontend will not communicate directly with Ollama or Hugging Face.

AI requests will go through the backend API.

This keeps provider-specific logic inside the backend and allows the AI provider to be changed without modifying the frontend.

Ollama

Chosen as the first AI provider for local development.

Reasons:

Allows local model execution.
Avoids external API costs during development.
Keeps profile and job data local during initial AI development.
Provides a practical environment for learning AI integration.
Allows the application to experiment with different local models.

Ollama is being used through its Node.js package.

Installed in the backend:

ollama

A local model is being used for initial development:

llama3.2

The intended flow is:

Express
   |
   v
ollamaService.ts
   |
   v
Ollama
   |
   v
Local AI Model
Initial AI Service

Created:

backend/src/ai/ollamaService.ts

Current responsibility:

Provide a simple backend function that sends a prompt to a locally running Ollama model and returns the generated response.

Current structure:

backend/
└── src/
    ├── ai/
    │   ├── aiService.ts
    │   ├── huggingFaceService.ts
    │   └── ollamaService.ts
    │
    ├── routes/
    ├── services/
    ├── lib/
    ├── types/
    └── server.ts

The initial service is intentionally simple.

The goal is to verify the complete communication path before adding more complex AI functionality.

Hugging Face

Hugging Face is the planned second AI provider.

Purpose:

Provide access to remote AI models.
Allow experimentation with different models.
Provide an alternative to locally running models.
Prepare the application for future production AI infrastructure.

Hugging Face integration will be added after the Ollama integration has been verified.

The planned architecture is:

AI Service Layer
      |
      ├── Ollama Service
      |
      └── Hugging Face Service
First AI Feature

The first AI feature will be:

Job Analysis

The AI will analyze a job against the user's career profile.

Input:

User Profile
+
Job Posting

Expected output:

Matching Skills
Missing Skills
Relevant Experience
Concerns
Suggestions

The AI should explain its reasoning rather than simply returning an unexplained numerical match score.

Example:

Strong match because:

* React experience matches the job requirement.
* TypeScript experience matches the required frontend stack.
* Previous project experience is relevant to the role.

Potential gap:

* The job requires AWS experience that is not currently listed in the profile.

The AI must only use information provided by the user and the job posting.

It must not invent:

Skills.
Experience.
Education.
Achievements.
Employment history.
Human Control

AI remains an assistant rather than a decision-maker.

The AI can:

Analyze.
Suggest.
Organize.
Draft.
Explain.

The AI should not:

Automatically apply for jobs.
Make career decisions for the user.
Invent qualifications.
Submit applications without user approval.
Development Approach

AI integration will follow the same incremental development approach used throughout the project.

Process:

Create the AI service.
Verify communication with the local model.
Create a small backend test endpoint.
Test the AI response.
Build the job-analysis service.
Create the job-analysis API endpoint.
Connect the frontend.
Add Hugging Face support.
Improve structured AI responses.
Add validation and error handling.

The first objective is not to build the complete AI agent.

The first objective is to establish a reliable AI integration layer that can later support the larger job-search assistant.

AI integration is being developed incrementally.

The first objective was to establish reliable communication between the backend and a local AI model.

The integration was tested in stages:

1. Verify Ollama communication.
2. Create a backend AI test endpoint.
3. Verify the backend can send prompts and receive responses.
4. Build job analysis using real profile and job data.
5. Connect job analysis to the frontend.
6. Move from free-form AI responses to structured JSON.
7. Improve the AI response contract and validation.
8. Build the final user-facing AI analysis interface.

This approach keeps AI provider integration separate from the frontend and allows individual pieces to be tested before adding additional complexity.

## Current Status

Completed:

✅ AI integration direction selected.
✅ Ollama selected for local AI development.
✅ Hugging Face selected as a future remote AI provider.
✅ Ollama Node.js package installed.
✅ AI directory created.
✅ Local model selected for initial development.
✅ Verified communication between the backend and Ollama.
✅ Created backend AI test endpoint.
✅ Created job analysis service.
✅ Created job analysis API endpoint.
✅ Connected job analysis to profile and job data from PostgreSQL.
✅ Connected frontend job analysis workflow to the backend.
✅ Verified end-to-end job analysis from the frontend.
✅ Updated Ollama integration to request structured JSON responses.
✅ Verified Ollama can return the expected structured analysis format.

Current AI flow:

React Frontend
      |
      v
Express API
      |
      v
Job Analysis Service
      |
      ├── Profile Service
      │
      └── Job Service
      |
      v
AI Service
      |
      v
Ollama
      |
      v
llama3.2:3b
      |
      v
Structured JSON analysis

Current structured analysis format:

{
  "jobRequirements": [],
  "matchingQualifications": [],
  "missingRequirements": [],
  "relevantExperience": [],
  "potentialConcerns": [],
  "suggestions": []
}

The AI response is currently parsed by the backend before being returned.

Current API response still wraps the parsed analysis as a JSON string.

Example:

{
  "result": "{\"jobRequirements\":[\"React\",\"TypeScript\"],...}"
}

This will be improved so the API returns the analysis as a JSON object rather than a JSON-encoded string.

Known AI-quality issue:

The model can still incorrectly classify information.

For example, it may identify a candidate skill that is not a job requirement as a matching qualification, or treat product/domain context as a candidate gap.

These issues will be addressed after the structured response contract is completed.

Next steps:

⏳ Review Prisma schema for cover letter storage.

⏳ Add cover letter generation using the imported job and candidate profile.

⏳ Add backend API endpoint for generating a cover letter.

⏳ Add frontend workflow for generating and displaying the cover letter.

⏳ Allow the user to review/edit the generated cover letter before using it.

⏳ Test the complete job URL → import → save → analyze → cover letter workflow.


Completed:

Added job posting URL import functionality.
Implemented JSON-LD extraction with Open Graph fallback.
Successfully tested against a real Paylocity job posting.
Imported job data is now appearing correctly on the Jobs page.
TypeScript compilation passes.

Next:

Review the Prisma schema.
Add storage for generated cover letters if needed.
Build the job URL → saved job → tailored cover letter workflow, one file at a time.


## current file structure

AI-Job-Search-Assistant/

├── DEVELOPER_LOG.md
├── README.md
│
├── frontend/
│   ├── package.json
│   ├── .env
│   ├── index.html
│   │
│   └── src/
│       ├── App.tsx
│       ├── main.tsx
│       │
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── Navigation.tsx
│       │   ├── ProfileForm.tsx
│       │   ├── ExperienceForm.tsx
│       │   ├── ExperienceSection.tsx
│       │   ├── ProjectForm.tsx
│       │   ├── ProjectSection.tsx
│       │   ├── JobForm.tsx
│       │   ├── ApplicationForm.tsx
│       │   └── ApplicationStatusSelect.tsx
│       │
│       ├── pages/
│       │   ├── Dashboard.tsx
│       │   ├── Profile.tsx
│       │   ├── Jobs.tsx
│       │   └── Applications.tsx
│       │
│       ├── data/
│       │
│       ├── services/
│       │   └── storageService.ts
│       │
│       └── types/
│           └── index.ts
│
└── backend/
    ├── package.json
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    │
    └── src/
        ├── ai/
        │   ├── aiService.ts
        │   ├── huggingFaceService.ts
        │   └── ollamaService.ts
        │
        ├── routes/
        │   ├── index.ts
        │   ├── profileRoutes.ts
        │   └── aiRoutes.ts
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
        │   ├── jobAnalysisService.ts
        │   ├── jobImportService.ts
        │   └── applicationService.ts
        │
        ├── lib/
        │   └── prisma.ts
        │
        ├── types/
        │   └── index.ts
        │
        ├── testJobImport.ts
        │
        └── server.ts