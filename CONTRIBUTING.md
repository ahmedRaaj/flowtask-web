# Contributing to FlowTask Web

Thanks for your interest in contributing! This document outlines the process for reporting issues and submitting changes.

## Getting Started

### Prerequisites

- Node.js 20.9 or newer
- npm

### Setup

```bash
git clone https://github.com/ahmedRaaj/flowtask-web.git
cd flowtask-web
npm install
cp .env.example .env.local
npm run dev
```

The web application starts at `http://localhost:3000`.

## How to Contribute

1. **Search existing issues** before opening a new one to avoid duplicates.
2. **Open an issue** to discuss significant changes before starting work, unless it is a small fix.
3. **Fork the repository** and create a short-lived branch off current `main`:

   ```bash
   git switch -c feat/short-description
   ```

4. **Make your changes**, keeping commits focused and atomic.
5. **Add or update tests** for behavior changes when tests exist for that area.
6. **Run required checks** before submitting:

   ```bash
   npm run lint
   npm run build
   ```

7. **Push your branch** and open a pull request against `main`.

## Branch and Commit Conventions

- Use a descriptive branch prefix that reflects the work: `feat/...`, `fix/...`, `docs/...`, `chore/...`, `refactor/...`, or `test/...`.
- Use [Conventional Commits](https://www.conventionalcommits.org/) for commit messages: `type: short imperative summary`.
  - `feat: add task creation form`
  - `fix: prevent duplicate task submission`
  - `docs: document local frontend setup`
  - `chore: update development tooling`
  - `refactor: simplify task card rendering`
  - `test: cover task creation flow`
- Keep pull requests focused on a single concern; open separate PRs for unrelated changes.

## Definition of Done

Before requesting review, confirm that:

- Relevant automated tests pass.
- `npm run lint` and `npm run build` pass.
- Code is formatted, understandable, and limited to the intended change.
- Documentation is updated when behavior, configuration, or setup changes.
- Screenshots are attached for visible frontend changes, or marked `N/A`.
- No secrets, IDE configuration, build output, or unrelated generated files are included.
- The pull request explains the purpose, implementation, testing, and meaningful trade-offs.

## Pull Request Guidelines

- Fill in the PR description explaining the *what* and *why* of the change.
- Reference related issues (for example, `Closes #12`).
- Be responsive to review feedback; small follow-up commits are fine.
- A maintainer will review and merge once the PR is approved and CI passes.

## Code Style

- Use TypeScript and follow the existing project formatting and linting rules.
- Prefer accessible, responsive interfaces with clear loading, empty, and error states.
- Keep components focused on a single responsibility.

## Reporting Bugs

When filing a bug report, please include:

- Steps to reproduce the issue
- Expected versus actual behavior
- Relevant browser errors, logs, or screenshots
- Environment details such as browser, OS, and Node.js version

## Suggesting Enhancements

Open an issue describing:

- The problem you are trying to solve
- Your proposed solution
- Any alternatives you considered

## Code of Conduct

Be respectful and constructive in all interactions. Harassment or abusive behavior of any kind will not be tolerated.

## Questions

If you have questions, open an issue with the `question` label.
