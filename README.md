# FlowTask Web

FlowTask is a task-management application for busy professionals who want one reliable place to capture, prioritize, and complete personal tasks without missing deadlines.

This repository contains the Next.js frontend. The initial MVP provides a responsive task dashboard and will progressively add task creation, editing, filtering, and backend integration. Authentication, collaboration, projects, tags, reminders, uploads, and cloud deployment are intentionally deferred.

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4
- ESLint

## Prerequisites

- Node.js 20.9 or newer
- npm

## Setup

Install dependencies:

```bash
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

`NEXT_PUBLIC_API_URL` points to the local Spring Boot API at `http://localhost:8080`.

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

Run linting:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

## Project structure

```text
app/          # App Router routes, layouts, and global styles
components/   # Reusable UI and layout components
public/       # Static assets
```
