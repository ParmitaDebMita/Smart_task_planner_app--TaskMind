# 🎓 TaskMind — AI-Powered Student Productivity Suite

<div align="center">

![TaskMind Banner](https://img.shields.io/badge/TaskMind-Student_Productivity_Suite-4F46E5?style=for-the-badge&logo=google-cloud&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-Expo_SDK_51-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Platform](https://img.shields.io/badge/Platform-Web_•_iOS_•_Android-22C55E?style=for-the-badge)
![Status](https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-8B5CF6?style=for-the-badge)

**An intelligent academic task planner and productivity engine crafted for university students.**  
Seamlessly blending syllabus breakdown, Google Calendar 2-way sync, Pomodoro focus chamber, AI-powered schedule conflict resolution, and collaborative sprint tracking into one high-performance interface.

[Quick Start](#-quick-start) • [Features](#-key-features--screen-catalog) • [Design System](#-design-system-tokens) • [Architecture](#-project-architecture) • [Screens Guide](#-complete-screen-suite-22-screens)

</div>

---

## 📖 Table of Contents
- [Project Overview](#-project-overview)
- [Key Features & Screen Catalog](#-key-features--screen-catalog)
- [Complete Screen Suite (22 Screens)](#-complete-screen-suite-22-screens)
- [Design System & Theme Tokens](#-design-system-tokens)
- [Technology Stack](#-technology-stack)
- [Quick Start](#-quick-start)
- [Project Architecture](#-project-architecture)
- [State Management & Data Flow](#-state-management--data-flow)
- [Troubleshooting & FAQ](#-troubleshooting--faq)

---

## 💡 Project Overview

**TaskMind** is designed to eliminate student overwhelm by bridging the gap between course syllabi, daily class schedules, group deliverables, and focused deep work.

Unlike traditional generic to-do list apps, TaskMind is engineered around academic workflows:
- **Course-Centric Hierarchy:** Tasks, labs, and exams are automatically tied to enrolled university courses (e.g., `CS301`, `CS402`, `MATH302`).
- **Autonomous Schedule Protection:** Real-time Google Calendar conflict detection that identifies lecture clashes and autonomously proposes optimized study slots with 98% flow matches.
- **Milestone & Weightage Scoring:** Prioritizes tasks dynamically based on syllabus grade weight (40%), time-to-deadline (35%), and calendar congestion (25%).
- **Distraction-Free Focus Chamber:** Integrated Pomodoro timer with SVG progress rings, ambient binaural soundscapes (White Noise, Rain, Lo-Fi), and live subtask checklist tracking.

---

## 🌟 Key Features & Screen Catalog

### 1. 🔐 Authentication & Onboarding Flow
- **Splash Screen:** Animated brand presentation with dynamic graduation cap gradient mark and instant state hydration.
- **Onboarding Carousel:** 3-step value illustration introducing AI Auto-Scheduling, Google Calendar 2-way sync, and the Focus Chamber.
- **Secure Login & Sign Up:** Academic email validation, university single-sign-on (SSO) shortcut, and password recovery workflow.

### 2. 📋 Core Academic Hubs & Task Management
- **Home Dashboard:** Bento grid layout with Next Up Class countdown, Gemini Smart Priority cards, Quick Actions bar, and today's schedule timeline.
- **Today's Schedule:** Chronological timeline view with class badges, study session slots, task checkboxes, and filter toggles.
- **Upcoming Deadlines:** Time-bucketed categorizations (*Today*, *Tomorrow*, *This Week*, *Later*) with urgency indicators and grade weightage pills.
- **Task Details & Subtasks:** Interactive milestone checklists, course syllabus notes, estimated pomodoros, and one-tap Focus Chamber launching.
- **Add Task Modal Composer:** Multi-field creator supporting Course pickers, Due Date & Time, Priority flags, Duration estimations, and Subtask builders.

### 3. 📅 Academic Calendar & AI Schedule Optimizer
- **Day / Week / Month Calendar:** Interactive date picker with color-coded dots representing assignments, lectures, labs, and exams.
- **AI Smart Scheduling:** Live conflict banner detecting overlaps (e.g., IoT Lab clashing with Distributed Systems study session) with Gemini 1.5 Pro recommended free slots, reasoning explanations, and before-and-after schedule comparisons.
- **Google Calendar Sync & OAuth:** Google OAuth 2.0 verified authorization flow, master auto-sync toggle, channel selectors (Lectures, Labs, Exams), commute buffers, and diagnostic latency simulator.

### 4. 🧠 Deep Focus Chamber & Productivity Analytics
- **Focus / Pomodoro Chamber:** Circular SVG progress timer (25:00 default), customizable focus/break intervals, ambient soundscapes (White Noise, Rain, Lo-Fi), and active task milestone tracker.
- **Progress & AI Insights Dashboard:** Weekly study time gauge (32.5 hrs), subject breakdown donut/bar chart, 14-day streak counter, and Gemini AI productivity recommendations.

### 5. 👥 Collaboration, Notifications & Voice Entry
- **Shared Group Sprints:** Bento milestone tracker (65% sprint completion), team member assignments (Alex, Priya, Marcus, Sarah), deliverable checklist, and real-time live pulse feed.
- **Notifications & "Don't Let Me Forget":** Color-coded urgency alerts, pinned critical spotlight card with interactive snooze menu (10m, 30m, 1h, 7 PM).
- **Search & Interactive Filters:** Instant multi-field lookup, filter carousel (All, High Priority, Assignments, Exams, Overdue), overdue warning ribbon, and UI States Dev Lab.
- **Voice Task Entry:** Pulsating mic animation, live audio visualizer waveform, speech transcript stream, and Gemini NLP entity extraction card.
- **Student Profile & Settings:** GPA / Dean's List badges, course syllabus progress bars, streak badges, notification switches, and theme/cache preferences.

---

## 📱 Complete Screen Suite (22 Screens)

| ID | Screen Component | Route Key | Key Capabilities |
|:---|:---|:---|:---|
| 1 | `SplashScreen.js` | `splash` | Animated brand splash with auto-navigation |
| 2 | `OnboardingScreen.js` | `onboarding` | 3-slide value walkthrough with Skip / Next controls |
| 3 | `LoginScreen.js` | `login` | Student login with demo autofill & SSO options |
| 4 | `SignUpScreen.js` | `signup` | Account creation with university email validation |
| 5 | `ForgotPasswordScreen.js` | `forgotPassword` | Reset link dispatch & OTP confirmation simulation |
| 6 | `HomeDashboardScreen.js` | `home` | Bento dashboard, next class countdown, smart priority tasks |
| 7 | `TodayTasksScreen.js` | `today` | Chronological schedule & pending checklist |
| 8 | `UpcomingTasksScreen.js` | `upcoming` | Grouped deadlines (Today, Tomorrow, Week, Later) |
| 9 | `AddTaskScreen.js` | `addTask` | Full task composer with subtask creator & course selector |
| 10 | `TaskDetailsScreen.js` | `taskDetails` | Subtask checklist, notes, syllabus tags, focus launcher |
| 11 | `AcademicCalendarScreen.js` | `calendar` | Day/Week/Month views with schedule event blocks |
| 12 | `AISmartSchedulingScreen.js` | `aiSmartScheduling` | GCal conflict detection, 98% flow slot optimizer, timeline diff |
| 13 | `GoogleCalendarSettingsScreen.js` | `calendarSettings` | 2-way sync master switch, channel filters, commute buffer |
| 14 | `GoogleOAuthScreen.js` | `googleOAuth` | Google OAuth 2.0 verified screen with permissions & diagnostics |
| 15 | `FocusChamberScreen.js` | `focus` | 25m Pomodoro SVG gauge, ambient soundscapes, active task |
| 16 | `ProgressDashboardScreen.js` | `progress` | 32.5h gauge, course time donut chart, 14-day streak, AI insights |
| 17 | `SharedGroupTasksScreen.js` | `group` | Team sprint bento (65%), deliverables board, live pulse feed |
| 18 | `NotificationsScreen.js` | `notifications` | Urgency filters, pinned "Don't Let Me Forget", snooze modal |
| 19 | `SearchFiltersScreen.js` | `search` | Instant search, filter chips, overdue banner, UI states lab |
| 20 | `VoiceTaskEntryScreen.js` | `voice` | Pulsating mic ring, live waveform, Gemini NLP entity parser |
| 21 | `ProfileScreen.js` | `profile` | Student card (Alex Rivera, 3.88 GPA), syllabus progress, badges |
| 22 | `SettingsScreen.js` | `settings` | Notification switches, AI sensitivity, cache clear, logout |

---

## 🎨 Design System Tokens

Built strictly against the design tokens documented in [`DESIGN.md`](./DESIGN.md):

### Color Palette
- **Primary:** `#4F46E5` (TaskMind Electric Indigo)
- **Primary Light / Container:** `#EEF2FF`
- **Secondary:** `#8B5CF6` (AI / Violet Accent)
- **Secondary Light:** `#F5F3FF`
- **Background Surface:** `#F8FAFC` (Clean Light Slate)
- **Card Surface:** `#FFFFFF` (Pure White)
- **Success / Complete:** `#22C55E` / `#16A34A`
- **Warning / Medium Priority:** `#F59E0B` / `#D97706`
- **Error / Urgent / Overdue:** `#EF4444` / `#DC2626`
- **Text Primary:** `#0F172A` (Slate 900)
- **Text Secondary:** `#64748B` (Slate 500)
- **Borders & Dividers:** `#E2E8F0`

### Typography (Inter Font Scale)
- **Headline XL:** `28px` / Bold (700)
- **Headline Large:** `22px` / Bold (700)
- **Title Medium:** `18px` / SemiBold (600)
- **Body Regular:** `14px` / Regular (400) & Medium (500)
- **Caption / Label:** `12px` / Medium (500) & SemiBold (600)
- **Badge / Micro:** `10px` / Bold (700)

### Spacing & Grid System
- **Base Grid:** 8px (`xs: 4px`, `sm: 8px`, `md: 16px`, `lg: 24px`, `xl: 32px`, `xxl: 48px`)
- **Border Radii:** `sm: 8px`, `md: 12px`, `lg: 16px`, `xl: 24px`, `full: 9999px`
- **Shadow Elevations:** Multi-tiered subtle drop shadows with 1px border outlines for depth.

---

## 🛠️ Technology Stack

- **Framework:** React Native + Expo SDK 51
- **Web Layer:** React Native Web (seamless cross-platform browser support)
- **Vector Icons:** Material Symbols Outlined
- **Graphics & Gauges:** `react-native-svg`
- **State Management:** React Context API (`TaskContext.js`) with persistent hooks
- **Runtime:** Node.js (v18+ compatible, tested on Node v24)

---

## 🚀 Quick Start

### Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) installed on your machine.

### 1. One-Click Launch (Windows)
Simply double-click the included `run.bat` file in the project root, or execute:
```cmd
.\run.bat
```

### 2. Manual Terminal Commands

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Start Web Application:**
   ```bash
   npm run web
   ```
   *Your browser will automatically open at `http://localhost:8081`.*

3. **Run on Mobile (iOS / Android):**
   ```bash
   npx expo start
   ```
   *Scan the generated QR code in your terminal using the **Expo Go** app on your physical device.*

4. **Production Web Bundle Export:**
   ```bash
   npx expo export --platform web
   ```

---

## 📁 Project Architecture

```
Smart-task-planner-app---TaskaMind/
├── App.js                               # Root container & screen routing engine
├── index.js                             # Entry point registering root component
├── package.json                         # Project dependencies & scripts
├── app.json                             # Expo application configuration
├── babel.config.js                      # Babel preset configuration
├── run.bat                              # One-click Windows development server launcher
├── DESIGN.md                            # Comprehensive Stitch design system specifications
├── README.md                            # Documentation & user manual
├── src/
│   ├── theme/                           # Design tokens & styling foundation
│   │   ├── colors.js                    # Colors & semantic status palette
│   │   ├── typography.js                # Font scale, weights & line heights
│   │   └── spacing.js                   # Spacing grid, corner radii, and elevations
│   ├── data/
│   │   └── mockData.js                  # Realistic student data (courses, tasks, events, pulse)
│   ├── context/
│   │   └── TaskContext.js               # Central state provider (Tasks CRUD, Timer, GCal, Toast)
│   ├── components/
│   │   └── common/                      # Reusable UI primitives
│   │       ├── AppLogo.js               # Exact SVG graduation cap brand logo
│   │       ├── Icon.js                  # Material Symbols Outlined renderer
│   │       ├── Header.js                # Top sticky header with badges & profile trigger
│   │       ├── BottomNav.js             # 5-tab bottom navigation bar with elevated FAB
│   │       ├── TaskCard.js              # Interactive card with checkbox & priority badges
│   │       ├── CircularProgress.js      # SVG circular timer/gauge component
│   │       └── Toast.js                 # Global notification toast banner
│   └── screens/
│       ├── auth/                        # Authentication & Onboarding screens
│       │   ├── SplashScreen.js
│       │   ├── OnboardingScreen.js
│       │   ├── LoginScreen.js
│       │   ├── SignUpScreen.js
│       │   └── ForgotPasswordScreen.js
│       ├── main/                        # Core Dashboard
│       │   └── HomeDashboardScreen.js
│       ├── tasks/                       # Task Management & Schedules
│       │   ├── AddTaskScreen.js
│       │   ├── TaskDetailsScreen.js
│       │   ├── TodayTasksScreen.js
│       │   └── UpcomingTasksScreen.js
│       ├── calendar/                    # Calendar, AI Rescheduling & Google Sync
│       │   ├── AcademicCalendarScreen.js
│       │   ├── AISmartSchedulingScreen.js
│       │   ├── GoogleCalendarSettingsScreen.js
│       │   └── GoogleOAuthScreen.js
│       ├── focus/                       # Pomodoro Deep Work
│       │   └── FocusChamberScreen.js
│       ├── analytics/                   # Productivity & AI Insights
│       │   └── ProgressDashboardScreen.js
│       ├── group/                       # Shared Deliverables & Live Pulse
│       │   └── SharedGroupTasksScreen.js
│       ├── notifications/               # Reminders & Snooze Actions
│       │   └── NotificationsScreen.js
│       ├── search/                      # Instant Search & UI States Lab
│       │   └── SearchFiltersScreen.js
│       ├── voice/                       # Voice Entry & NLP Extractor
│       │   └── VoiceTaskEntryScreen.js
│       ├── profile/                     # Academic Profile & Course Syllabus
│       │   └── ProfileScreen.js
│       └── settings/                    # App Preferences & Account
│           └── SettingsScreen.js
```

---

## ⚡ State Management & Data Flow

`TaskContext.js` provides global, reactive state management across all screens without external complex middleware:

- **Tasks CRUD:** Add new tasks, toggle completion states, update subtasks, and calculate dynamic progress gauges.
- **Focus Chamber Engine:** Active countdown interval timer, mode switching (*Work / Short Break / Long Break*), ambient soundscape selections, and session counters.
- **Google Calendar Synchronizer:** Simulated 2-way sync pipeline, master switch state, active channel filters, and conflict detection hooks.
- **Notification & Snooze Dispatcher:** Instant notification marks, snooze interval timers (10m, 30m, 1h, Evening), and "Don't Let Me Forget" spotlight priority.
- **Shared Sprint Activity:** Collaborative team checklist updates and live chat pulse messages.
- **Global Toast Alerts:** Floating animated alerts across all screens with `'success'`, `'error'`, or `'info'` variants.

---

## ❓ Troubleshooting & FAQ

<details>
<summary><strong>Q: PowerShell execution policy prevents running scripts on Windows?</strong></summary>

If you encounter an execution policy error when calling `npm` or `npx` directly in PowerShell, use the CMD alias or execute `run.bat`:
```cmd
.\run.bat
```
Alternatively, bypass the restriction for the current terminal session:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
</details>

<details>
<summary><strong>Q: How do I test the Google Calendar integration?</strong></summary>

Navigate to **Calendar** &rarr; tap the Google Calendar sync button or visit **Settings** &rarr; **Google Calendar Integration**. You can toggle 2-way sync, authorize accounts via `GoogleOAuthScreen`, and test conflict rescheduling in `AISmartSchedulingScreen`.
</details>

<details>
<summary><strong>Q: How do I test different UI states (e.g., Loading Skeleton, Empty State)?</strong></summary>

Open the **Search & Filters** screen (`src/screens/search/SearchFiltersScreen.js`) and use the **Preview State** toggle bar (*Normal / Empty / Loading*) at the top of the screen to preview all dynamic UI states.
</details>

---

## 📄 License
This project is licensed under the **MIT License** — see the LICENSE file for details.

Developed with ❤️ for students worldwide.
