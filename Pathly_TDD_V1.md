# Pathly V1 | Technical Design Document

## Project Overview

**What is Pathly?**

Pathly is an AI-powered career acceleration platform designed specifically for fresh graduates and entry-level job seekers.

Unlike traditional professional platforms that focus heavily on experienced professionals, Pathly helps graduates bridge the gap between education and employment by providing personalized learning guidance, profile enhancement tools, mentorship support, and intelligent opportunity matching.

The platform combines learning, career preparation, and recruitment into a single ecosystem.

**The Core Problem**

Fresh graduates commonly face two major problems:

1. Skills & Portfolio Gap
   Many graduates lack practical experience, projects, and structured learning paths, making them less competitive in the job market.

2. Job Search Noise
   Employers receive hundreds of unqualified applications, making it difficult to discover suitable candidates.

**How Pathly Solves This Problem?**

Pathly solves these problems through AI-driven career development and intelligent matching.

For students:

- Personalized career roadmaps
- Guided learning progression
- Resume/CV optimization
- Portfolio creation
- AI career assistance
- Mock interviews and mentorship
- Personalized opportunity recommendations

For employers:

- Candidate ranking
- Skill-based filtering
- Direct talent discovery
- Targeted job offers

---

## Main Features (V1 Scope)

**Authentication & Onboarding**

Users can:

- Register and login
- Complete profile information
- Define career goals
- Select interests and target roles

Purpose: Collect enough information to personalize the experience.

**AI Career Roadmap**

Users can:

- Select target career path
- Specify current level
- Specify available learning time
- Generate AI-powered roadmap

Generated roadmap includes:

- Learning milestones
- Required skills
- Suggested courses/resources
- Progress tracking

Purpose: Provide a structured path toward career goals.

**Learning Dashboard**

Users can:

- Enroll in roadmap courses
- View progress percentages
- Track completed milestones
- View learning statistics

Purpose: Help users continuously improve skills.

CV & Portfolio Builder

Users can:

Create professional resumes
Build portfolios
Upload profile data
Receive ATS compatibility scores

Purpose: Improve employability and profile quality.

**AI Career Assistant**

Users can:

- Chat with AI assistant
- Ask career questions
- Get skill recommendations
- Receive roadmap guidance
- Get profile improvement suggestions

Purpose: Act as a personalized career coach.

**Opportunity Matching**

Users can:

- View matched jobs
- View internships
- View scholarships
- Receive ranking-based recommendations

Purpose: Connect users with relevant opportunities.

**Mentorship & Mock Interviews**

Users can:

- Book mentor sessions
- Practice interviews
- Receive AI-generated interview questions
- Receive feedback after practice

Purpose: Improve interview readiness.

**Employer Dashboard (Basic V1)**

Employers can:

- Create company profiles
- Post opportunities
- View ranked candidates
- Search potential hires

Purpose: Allow companies to discover suitable graduates efficiently.

**Admin Dashboard (Basic V1)**

Admins can:

- Approve mentors
- Approve companies
- Moderate job posts
- View platform analytics

Purpose: Maintain platform quality and trust.

---

## Routes

| Route Path             | Page Component   |
| ---------------------- | ---------------- |
| `/`                    | HomePage         |
| `/login`               | LoginPage        |
| `/sign-up`             | SignupPage       |
| `/student/on-boarding` | OnBoardingPage   |
| `/student/dashboard`   | StudentDashboard |

---

## Project Folder Structure

src
├── pages
├── components
├── constants
├── services
├── hooks
├── types
├── utils
├── styles
├── routes
├── providers
├── layout
└── store

---

## Layout Components

- Header
- Footer
- Sidebar

---

## Types

---

## States

Global
├── Favorites
└── Notifications

---

## API Architecture

#### API Service Layer

services
├── api.service.ts
└── api.service.ts

---

## UI Development Plan

1. Global Layout
   - Header
   - Footer
   - Sidebar
2. HomePage
3. Login
4. Signup
5. OnBoarding
6. StudentDashboard
