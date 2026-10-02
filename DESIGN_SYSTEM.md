Design System — Junction
Purpose

This document defines the visual language and UI principles for the AI Job Search Assistant project.

It exists to keep future development visually consistent across:

    Human developers

    AI coding agents

    New components

    New pages

    Future features

    Design iterations

The design should feel intentional and product-specific rather than resembling a generic AI SaaS application.

When adding or modifying UI, use this document as the visual source of truth.
Product Identity
Product Name

Junction

The application is a personal career workspace that helps users organize their job search, understand opportunities, prepare applications, and track progress.

The product should feel like a career operating workspace, not an AI chatbot.

The AI is an assistant inside the workspace.

The user remains in control.
Design Philosophy

The visual identity should communicate:

    Craft

    Focus

    Progress

    Organization

    Human control

    Professionalism

    Thoughtfulness

    Technical competence

The interface should feel like a tool that was deliberately built for someone doing serious work.

It should not feel like a template.

It should not look like a generic AI startup dashboard.

The design should have some editorial character while remaining practical and usable.
Visual Concept

The core visual metaphor is:

    A well-organized career workshop.

Think:

    Paper

    Notes

    Documents

    Editorial layouts

    Work surfaces

    Filing systems

    Technical annotations

    Career records

    Deliberate organization

The interface should feel structured without feeling corporate.
What We Are Avoiding

Do not introduce generic visual patterns commonly associated with AI SaaS applications unless there is a strong product-specific reason.

Avoid:

    Purple/blue AI gradients

    Glowing backgrounds

    Excessive glassmorphism

    Floating translucent cards everywhere

    Excessive rounded corners

    Huge gradient text

    Neon accents

    Chatbot-first layouts

    Excessive animation

    Decorative blobs

    Generic "AI magic" visual effects

    Overly dense dashboards

    Excessive shadows

    Every element being placed inside a card

    Generic Tailwind gray palettes

The application should not look like a reskinned AI template.
Color System

The palette is intentionally warm and slightly editorial.
Core Colors
Ink

Primary dark color.

#202522

Used for:

    Primary text

    Strong headings

    Dark-mode background foundation

    High-importance UI

Tailwind token:

ink

Paper

Primary light background.

#f4f1e8

Used for:

    Application background

    Main workspace

    Large surfaces

Tailwind token:

paper

Parchment

Secondary warm surface.

#eae5d8

Used for:

    Secondary panels

    Subtle sections

    Supporting surfaces

    Differentiating areas without heavy cards

Tailwind token:

parchment

Warm White

#fbfaf6

Used for:

    Primary elevated surfaces

    Forms

    Important content areas

Tailwind token:

whitewarm

Line

#d5d0c3

Used for:

    Borders

    Dividers

    Structural lines

Tailwind token:

line

Borders should generally be thin and subtle.

Prefer structural borders over heavy shadows.
Muted

#74766f

Used for:

    Supporting text

    Metadata

    Descriptions

    Secondary labels

Tailwind token:

muted

Accent Colors
Copper

Primary brand accent.

#b85c38

Used for:

    Primary actions

    Important interactive elements

    Brand moments

    Selected states where appropriate

Tailwind token:

copper

Copper Dark

#8e452c

Used for:

    Hover states

    Stronger copper emphasis

    Darker interactive states

Tailwind token:

copper-dark

Moss

#536b58

Used for:

    Positive states

    Active status

    Completed work

    Confirmed information

Tailwind token:

moss

Signal

#d9a441

Used for:

    Attention

    Warnings

    Highlights

    Important annotations

Tailwind token:

signal

Use sparingly.
Dark Mode

Dark mode is not a separate visual identity.

It should feel like the same product at night.

Do not use pure black backgrounds.

Current dark palette:

Background: #171a18
Surface:    #202420
Muted:      #252a27
Text:       #f1eee5
Muted text: #9a9b94
Border:     #363b37
Accent:     #c66a45
Positive:   #78927c
Attention:  #d9a441

Dark mode should retain:

    Warmth

    Editorial character

    Copper accent

    Moss status language

    Thin structural borders

Avoid turning the application into a generic black-and-white developer dashboard.
Typography

Typography should create hierarchy without relying on excessive font size.
Display / Editorial

Primary font:

Georgia, "Times New Roman", serif

Tailwind token:

font-display

Use for:

    Product name

    Major page headings

    Important editorial statements

    Large section titles

The serif should be used intentionally, not everywhere.
Interface Sans

Primary interface font:

Inter, ui-sans-serif, system-ui, sans-serif

Tailwind token:

font-sans

Use for:

    Buttons

    Navigation

    Forms

    Body text

    UI controls

    Most application content

Monospace

Use the system monospace stack.

Tailwind token:

font-mono

Use for:

    Status labels

    Small metadata

    Technical annotations

    Dates when appropriate

    AI/system labels

    Small uppercase category labels

Do not use monospace for large amounts of normal prose.
Typography Character

The interface should combine:

Editorial
+
Technical
+
Practical

Example:

Junction
CAREER WORKSPACE

Your job search, organized.

APPLICATIONS

12 ACTIVE
4 INTERVIEWS

The serif communicates personality.

The sans communicates usability.

The monospace communicates system information.
Shape Language

The product should use restrained geometry.

Prefer:

    Small or moderate border radius

    Thin borders

    Clear rectangles

    Strong alignment

    Intentional spacing

Avoid:

    Excessive pill shapes

    Huge rounded containers

    Every card having a 20px+ radius

    Excessively soft UI

Pills may still be used for statuses where they improve comprehension.
Borders and Shadows

Borders are more important than shadows.

Prefer:

border-line

over heavy shadows.

Shadows should be subtle and rare.

The interface should feel like physical paper and structured documents rather than floating glass panels.
Layout Philosophy

The layout should emphasize:

    Clear hierarchy

    Strong alignment

    Generous whitespace

    Predictable navigation

    Content density appropriate to the task

Do not fill empty space simply because it exists.

Whitespace is part of the design.
Responsive Design

The application must be designed for:

    Desktop

    Tablet

    Mobile

Responsive behavior should be intentional.

Do not simply allow desktop layouts to shrink until they become unusable.
Desktop

Desktop can use:

    Persistent navigation

    Multi-column layouts

    Dense tables

    Side-by-side analysis

    Larger information panels

Mobile

Mobile should prioritize:

    Content

    Readability

    Touch targets

    Simple navigation

    Vertical information hierarchy

When a desktop table becomes too wide, transform it into a stacked record/card layout rather than creating a horizontally scrolling table unless horizontal scrolling is genuinely useful.

When a desktop two-column layout becomes too narrow, stack the sections vertically.

Secondary metadata can disappear or move below primary content.
Navigation

Desktop navigation should feel like part of the workspace structure.

Mobile navigation should not consume excessive vertical space.

Navigation should clearly communicate the main workflow:

Dashboard
Profile
Jobs
Applications

Future navigation may include additional workflow sections as the product grows.
Dashboard Philosophy

The dashboard is the user's workspace overview.

The primary information hierarchy should answer:

    How many jobs have I saved?

    How many applications have I submitted?

    How many interviews do I have?

    What needs my attention?

    What should I work on next?

The dashboard should not become a collection of decorative statistics.

Metrics should represent useful career information.
Job Workspace

Jobs are one of the most important parts of the product.

The job experience should support:

Import
↓
Understand
↓
Analyze
↓
Prepare
↓
Apply
↓
Track

The interface should make this workflow understandable.
AI Interface Language

AI should be presented as an assistant providing evidence and preparation.

Avoid presenting AI output as an unquestionable authority.

Prefer labels such as:

MATCH
GAP
EVIDENCE
CONCERN
SUGGESTION
NEXT

rather than:

AI SCORE
AI DECISION
PERFECT MATCH
YOU SHOULD APPLY

The UI should reinforce the product principle:

    AI assists. The human decides.

Job Analysis

Job analysis should emphasize reasoning.

A good analysis presentation might include:

MATCH

React experience aligns with the frontend requirements.

EVIDENCE

Previous dashboard work demonstrates relevant experience.

GAP

AWS experience is not currently listed in the profile.

CONCERN

The role appears to require production cloud experience.

NEXT

Consider whether your existing project experience can demonstrate
related infrastructure knowledge.

Avoid relying on a single numerical match score as the primary representation.
Cover Letters

Cover letters are generated drafts.

The UI should make this clear.

The user should be able to:

    Review

    Edit

    Regenerate

    Download

    Approve

The interface should never imply that generated content is automatically ready to submit without review.
Human Control

The product's UI should consistently communicate that the user remains in control.

AI may:

    Analyze

    Suggest

    Organize

    Draft

    Explain

AI should not silently:

    Apply to jobs

    Submit applications

    Invent qualifications

    Make career decisions

    Represent assumptions as facts

Components

Build reusable visual primitives when they are genuinely shared.

Examples:

Button
Card
Badge
Input
SectionHeader
StatusDot
PageHeader

Reuse visual primitives.

Do not force every small piece of UI into its own component.

A component should exist because it provides:

    Reuse

    Meaning

    Encapsulation

    Significant behavior

    Visual consistency

Avoid unnecessary component fragmentation.
Component Styling

Components should consume the design system rather than invent their own colors.

Prefer:

className="bg-paper text-ink border-line"

over:

className="bg-[#f4f1e8] text-[#202522] border-[#d5d0c3]"

Do not introduce arbitrary colors unless there is a clear design reason.

Prefer semantic design tokens.
Tailwind CSS

The project uses:

Tailwind CSS v4

Design tokens are defined in CSS using:

@theme {
  ...
}

Do not introduce a traditional Tailwind configuration file simply to add colors that belong in the existing CSS design system.

Current design tokens are defined in:

frontend/src/index.css

Animation

Animation should be subtle and purposeful.

Use animation for:

    State changes

    Loading

    Navigation transitions

    Important feedback

Avoid:

    Constant movement

    Decorative floating elements

    Excessive transitions

    Animation that delays interaction

The product should feel calm and deliberate.
Accessibility

Visual design must not compromise accessibility.

Ensure:

    Sufficient color contrast

    Visible focus states

    Keyboard accessibility

    Touch-friendly controls

    Semantic HTML

    Clear form labels

    Meaningful status indicators

Do not use color alone to communicate important information.

For example, a rejected application should not be communicated only through red.

Use:

Rejected

alongside the visual treatment.
AI Agent Instructions

When modifying or creating UI:

    Read this document first.

    Preserve the established visual language.

    Use existing design tokens.

    Prefer existing reusable components.

    Do not introduce generic AI SaaS aesthetics.

    Do not introduce new colors without a clear reason.

    Do not replace the palette with Tailwind's default gray/slate/blue/purple system.

    Maintain responsive behavior.

    Maintain light and dark mode compatibility.

    Keep the user in control of AI-assisted workflows.

    Prefer structural borders over heavy shadows.

    Use typography intentionally.

    Keep the interface calm, editorial, and technical.

    Do not redesign unrelated areas when implementing a feature.

    Preserve existing application functionality while improving presentation.

Design Decision Rule

When uncertain between two visual approaches, prefer the option that feels:

    More intentional, more useful, less generic.

The interface should look like it belongs specifically to Junction.

It should feel like a product that was built carefully by someone who understands both the technical system and the human problem it is trying to solve.
Current Design Direction

The current design foundation is:

Junction
Career Workspace

Warm paper surfaces
Editorial serif typography
Clean interface sans
Technical monospace metadata
Copper actions
Moss positive states
Gold attention states
Thin structural borders
Restrained corners
Minimal shadows
Intentional whitespace
Responsive layouts
Light + dark modes
Human-controlled AI

This is the visual direction to preserve as the application grows.