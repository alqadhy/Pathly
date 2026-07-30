# Pathly

![React](https://img.shields.io/badge/React-19.2.6-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38B2AC?logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-8.0.12-646CFF?logo=vite)

**Pathly** is an AI-powered career acceleration platform designed specifically for fresh graduates and entry-level job seekers. The platform bridges the gap between education and employment by providing personalized learning guidance, profile enhancement tools, mentorship support, and intelligent opportunity matching.

## 🎯 Core Problem

Fresh graduates commonly face two major challenges:

1. **Skills & Portfolio Gap** - Many graduates lack practical experience, projects, and structured learning paths, making them less competitive in the job market.
2. **Job Search Noise** - Employers receive hundreds of unqualified applications, making it difficult to discover suitable candidates.

## ✨ How Pathly Solves This

Pathly solves these problems through AI-driven career development and intelligent matching.

### For Students & Job Seekers:
- 🎓 Personalized career roadmaps
- 📚 Guided learning progression
- 📄 Resume/CV optimization with AI
- 🎨 Portfolio creation
- 🤖 AI career assistant
- 🎤 Mock interviews and mentorship
- 🎯 Personalized opportunity recommendations

### For Employers:
- 🏢 Company profile management
- 📋 Job posting and management
- 👥 Candidate ranking and filtering
- 🔍 Direct talent discovery
- 📊 Skill-based candidate matching

### For Admins:
- ✅ Mentor approval system
- 🏭 Company verification
- 📝 Job post moderation
- 📈 Platform analytics

## 🛠️ Tech Stack

### Core Technologies
- **React 19.2.6** - UI library
- **TypeScript 6.0.2** - Type safety
- **Tailwind CSS 4.3.1** - Styling
- **Vite 8.0.12** - Build tool

### Key Libraries & Tools
- **shadcn/ui** - UI component library
- **TanStack Query** - Data fetching and caching
- **Zustand** - State management
- **Zod** - Schema validation
- **React Router 7.18.0** - Routing
- **Chart.js** - Analytics visualization
- **GSAP** - Animations
- **Firebase** - Authentication & backend
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Lucide React** - Icons
- **html2canvas & jsPDF** - PDF generation
- **pdfjs-dist** - PDF viewing
- **react-youtube** - Video integration
- **date-fns** - Date utilities
- **EmailJS** - Email functionality

## 📱 User Roles

The platform supports four distinct user roles:

1. **Student/Employee** - Job seekers accessing learning, CV building, and job applications
2. **Company** - Employers posting jobs and managing company profiles
3. **Instructor** - Mentors providing guidance and courses
4. **Admin** - Platform administrators managing users and content

## 🚀 Main Features

### 1. Authentication & Onboarding
- User registration and login
- Role-based access control
- Profile completion
- Career goal definition
- Interest and target role selection

### 2. AI Career Roadmap
- Target career path selection
- Current skill level assessment
- Available learning time specification
- AI-powered personalized roadmap generation
- Learning milestones and required skills
- Suggested courses and resources
- Progress tracking

### 3. Learning Dashboard
- Course enrollment
- Progress tracking with percentages
- Milestone completion tracking
- Learning statistics and analytics
- Video-based lessons with YouTube integration
- Note-taking capabilities
- Course details and curriculum viewing

### 4. CV & Portfolio Builder
- **Multiple Build Modes:**
  - Manual CV builder with customizable templates
  - AI-powered CV builder
- ATS compatibility scoring
- Template selection
- Real-time preview
- PDF export functionality
- Resume management and storage

### 5. AI Career Assistant
- Interactive chat interface
- Career guidance and advice
- Skill recommendations
- Roadmap assistance
- Profile improvement suggestions
- Mock interview question generation

### 6. Opportunity Matching
- **Job Listings:**
  - Personalized job recommendations
  - Advanced search and filtering
  - Job details and requirements
  - Direct application functionality
- **Internships:**
  - Internship opportunities
  - Application tracking
- **Scholarships:**
  - Scholarship listings
  - Eligibility matching

### 7. Community & Networking
- Community forum
- Professional networking
- Connection building
- Knowledge sharing

### 8. Mentorship & Interview Preparation
- Mentor booking system
- Mock interview practice
- AI-generated interview questions
- Performance feedback
- Session scheduling

### 9. Analytics Dashboard
- Personal progress analytics
- Learning statistics
- Job application tracking
- Career development insights
- Visual charts and reports

### 10. Messaging System
- Direct messaging
- Communication with mentors
- Employer-candidate communication
- Notification system

### 11. Saved Items
- Bookmark jobs and internships
- Save courses and learning materials
- Organize opportunities
- Quick access to favorites

### 12. Settings & Profile Management
- Profile editing
- Account settings
- Preference management
- Privacy controls
- Notification preferences

## 🏗️ Project Structure

```
src/
├── App.tsx                      # Main application component
├── main.tsx                     # Application entry point
├── roles.ts                     # User role definitions
├── assets/                      # Static assets (images, fonts)
├── components/
│   ├── custom/                  # Custom application components
│   │   ├── admin/              # Admin panel components
│   │   ├── home/               # Homepage sections
│   │   └── ...
│   ├── layout/                  # Layout components (Header, Footer, etc.)
│   └── ui/                      # Reusable UI components (shadcn)
├── constants/                   # Application constants
│   ├── router.ts               # Route definitions
│   ├── sidebar-links.tsx       # Navigation links
│   ├── jobs.data.ts            # Job data
│   ├── learning.data.ts        # Learning content
│   └── ...
├── Context/                     # React Context providers
│   └── LearningPlayerContext.tsx
├── hooks/                       # Custom React hooks
│   ├── useChat.ts              # Chat functionality
│   ├── useLearningPlayer.ts    # Video player logic
│   ├── useResumes.ts           # Resume management
│   ├── useRoadmap.ts           # Career roadmap
│   └── ...
├── layout/                      # Layout wrappers
│   ├── AdminDashboard.tsx
│   ├── AuthLayout.tsx
│   └── DashboardLayout.tsx
├── lib/                         # Utility libraries
│   ├── ai/                     # AI service integrations
│   ├── firebase.ts             # Firebase configuration
│   ├── downloadCV.ts           # CV download utility
│   └── utils.ts                # General utilities
├── pages/                       # Page components
│   ├── Home.tsx                # Landing page
│   ├── Auth/                   # Authentication pages
│   ├── admin/                  # Admin pages
│   ├── company/                # Company pages
│   ├── Lessons/                # Learning pages
│   ├── Settings/               # Settings pages
│   └── student/                # Student pages
│       ├── Dashboard.tsx
│       ├── Profile.tsx
│       ├── Jobs-Internships.tsx
│       ├── AnalyticsDashboard.tsx
│       ├── cv/                 # CV builder pages
│       └── ...
├── routes/                      # Route configuration
│   ├── index.tsx               # Main router
│   └── AdminRoute.tsx          # Admin route guard
├── schemas/                     # Zod validation schemas
│   ├── auth.schema.ts
│   ├── jobPosting.schema.ts
│   ├── application.schema.ts
│   └── ...
├── Services/                    # API and business logic
│   ├── ai.service.ts           # AI chat service
│   ├── auth.service.ts         # Authentication service
│   ├── learning.service.ts     # Learning management
│   ├── resume.service.ts       # Resume operations
│   ├── application.service.ts  # Job applications
│   ├── companyProfile.service.ts
│   ├── search.service.ts
│   ├── settings.service.ts
│   └── ...
├── store/                       # Zustand state stores
│   ├── auth.store.ts
│   ├── useCVStore.ts
│   ├── useApplicationsStore.ts
│   ├── saved-items.store.ts
│   └── ...
├── styles/                      # Global styles
│   ├── globals.css
│   ├── tailwind.css
│   └── animations.css
├── types/                       # TypeScript type definitions
│   ├── auth.types.ts
│   ├── jobs.types.ts
│   ├── cv.types.ts
│   ├── courses.types.ts
│   ├── analytics.types.ts
│   └── ...
└── utils/                       # Utility functions
    └── storage.service.ts
```

## 🗺️ Application Routes

### Public Routes
- `/` - Home page
- `/auth/` - Login
- `/auth/sign-up` - Sign up
- `/community` - Community page
- `/saved` - Saved items
- `/ai-assistant` - AI career assistant
- `/student/profile/:id` - Public student profile
- `/company/profile/:id` - Public company profile

### Student Routes
- `/student/dashboard` - Student dashboard
- `/student/analytics` - Analytics dashboard
- `/student/jobs` - Jobs & internships
- `/student/jobs/:id` - Job details
- `/student/apply/:id` - Apply for job
- `/student/learning` - Learning center
- `/student/learning/MyLearning` - My learning
- `/student/learning/:id` - Course details
- `/student/learning/:id/player` - Course player
- `/student/profile` - Student profile
- `/student/messages` - Messages
- `/student/settings` - Settings
- `/student/cv` - CV dashboard
- `/student/cv/templates/:mode` - Template selection
- `/student/cv/builder/manual/:templateId` - Manual CV builder
- `/student/cv/builder/ai/:templateId` - AI CV builder

### Company Routes
- `/company/dashboard` - Company dashboard
- `/company/profile` - Company profile
- `/company/profile/:id` - Public company profile
- `/company/jobs` - Job management
- `/company/jobs/new` - Post new job
- `/company/jobs/:id` - Job details
- `/company/jobs/:id/edit` - Edit job

### Admin Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/companies` - Companies management
- `/admin/companies/:id` - Company details
- `/admin/instructors` - Instructors management
- `/admin/instructors/:id` - Instructor details

## 🎨 Design System

Pathly follows a comprehensive design system with:

### Color Palette
- **Primary Colors** - Purple gradient (#553be6)
- **Secondary Colors** - Teal/Cyan (#2ebccf)
- **Neutral Colors** - Grayscale for text and backgrounds
- **Status Colors** - Success, Warning, Danger, Info variants

### Typography
- **Font Family:** Inter (with Geist as variable font)
- **Heading Scale:** Display (48px) to H6 (16px)
- **Body Text:** Small (14px), Medium (16px), Large (18px)

### Spacing System
- 4px base grid system
- xs (4px) to 4xl (80px)
- Consistent spacing between components

### Other Design Tokens
- Border radius (4px to 24px)
- Shadows (small, medium, card)
- Transitions (150ms to 500ms)
- Z-index layers for modals and overlays

## 🔧 Configuration

### Build & Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Preview production build
npm run preview
```

### Environment Setup
- Firebase configuration in `src/lib/firebase.ts`
- API endpoints configured in service files
- Mock data in `public/mocked/` directory

## 📊 State Management

The application uses **Zustand** for global state management:

- **auth.store.ts** - Authentication state
- **useCVStore.ts** - CV builder state
- **useApplicationsStore.ts** - Job applications
- **useJobPostingStore.ts** - Job posting management
- **useResumeStore.ts** - Resume data
- **saved-items.store.ts** - Saved/favorited items
- **sidebar.store.ts** - Sidebar navigation state
- **useBuilderUIStore.ts** - CV builder UI state

## 🔌 API Architecture

### Service Layer
All API calls are organized in the `Services/` directory:

- **ai.service.ts** - AI chat and career assistance
- **auth.service.ts** - Authentication operations
- **learning.service.ts** - Course and learning management
- **resume.service.ts** - Resume/CV operations
- **application.service.ts** - Job application handling
- **companyProfile.service.ts** - Company profile management
- **search.service.ts** - Search functionality
- **settings.service.ts** - User settings
- **template.service.ts** - CV template management
- **email.ts** - Email service integration
- **firebaseAuth.service.ts** - Firebase authentication
- **notification.service.ts** - Notifications

### Data Fetching
- **TanStack Query** for server state management
- Optimistic updates and caching
- Background refetching
- Error handling and retries

## ✅ Validation

All forms and data inputs use **Zod** schemas for validation:

- **auth.schema.ts** - Authentication forms
- **jobPosting.schema.ts** - Job posting validation
- **application.schema.ts** - Job application forms
- **personalInfo.schema.ts** - Personal information
- **contactInfo.schema.ts** - Contact details
- **education.schema.ts** - Education history
- **experience.schema.ts** - Work experience
- **skills.schema.ts** - Skills validation

## 🎯 Key Features Deep Dive

### AI-Powered Features
1. **AI Career Assistant** - Chat-based career guidance
2. **AI CV Builder** - Intelligent resume generation
3. **AI Roadmap Generation** - Personalized learning paths
4. **Mock Interview Questions** - AI-generated practice questions

### Learning Management
- Video-based lessons with YouTube integration
- Progress tracking
- Note-taking functionality
- Course completion certificates
- Learning path recommendations

### CV/Resume Builder
- Multiple professional templates
- Manual and AI-powered building modes
- ATS compatibility scoring
- Real-time preview
- PDF export
- Template customization

### Job Matching
- Intelligent job recommendations
- Advanced filtering and search
- Application tracking
- Saved jobs functionality
- Direct apply functionality

### Analytics & Insights
- Personal progress tracking
- Learning analytics
- Job application statistics
- Career development metrics
- Visual charts and reports

## 🔐 Security & Authentication

- Firebase Authentication integration
- Role-based access control (RBAC)
- Protected routes
- Local storage for user sessions
- Input validation and sanitization

## 📱 Responsive Design

- Mobile-first approach
- Tailwind CSS responsive utilities
- Adaptive layouts for all screen sizes
- Touch-friendly interfaces
- Optimized for desktop, tablet, and mobile

## 🎬 Animations

- **GSAP** for complex animations
- Scroll-triggered animations
- Page transitions
- Loading states
- Micro-interactions

## 📦 Data Management

### Mock Data
- Sample jobs and internships
- Course content
- User profiles
- Company data
- Admin data

### Local Storage
- User preferences
- Saved items
- Draft applications
- CV data

## 🤝 Contributing

This is a private project. For any questions or suggestions, please contact the development team.

## 📄 License

Private - All rights reserved

---

**Built with ❤️ for fresh graduates and entry-level job seekers**