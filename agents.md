# agents.md

## Project Overview

This is a full-stack real estate platform built with React (frontend) and .NET 8 Web API (backend).

The system supports:

* Property listings
* User roles (Buyer, Agent, Admin)
* Property search and filtering
* Saved listings and inquiries

## Tech Stack

Frontend:

* React + TypeScript
* TanStack Query
* Zustand
* Tailwind CSS
* React Hook Form

Backend:

* .NET 8 Web API
* Entity Framework Core
* PostgreSQL

## Development Principles

* Follow clean architecture (Domain, Application, Infrastructure, API)
* Avoid tight coupling between layers
* Use DTOs for API communication
* Never expose EF entities directly

## Coding Rules

* No implicit `any` in TypeScript
* Do not use React.FC
* Prefer hooks over class components
* Use async/await consistently
* Use dependency injection in backend

## Testing Instructions

* Backend: use xUnit
* Frontend: use Vitest
* Write tests for:

  * API endpoints
  * business logic
  * critical UI components

## Build & Run

Backend:

* `dotnet restore`
* `dotnet build`
* `dotnet run`

Frontend:

* `pnpm install`
* `pnpm dev`

## PR Instructions

* Keep PRs under 300 lines if possible
* Include description of:

  * what changed
  * why it changed
* Ensure all tests pass
* Run lint before submitting

## Feature Workflow

1. Define DTOs
2. Add backend endpoint
3. Add frontend API call
4. Implement UI
5. Add tests

## Helpful CLI Tools

* pnpm
* dotnet CLI
* docker
* gh (GitHub CLI)

## Linting

* ESLint (frontend)
* Prettier
* dotnet format (backend)

## Notes for Agents

* Do NOT introduce new libraries unless necessary
* Reuse existing patterns in the repo
* Keep components small and composable
* Prefer clarity over cleverness

## Known Gotchas (Important)

### Do NOT overwrite existing configuration

* Never modify existing connection strings in `appsettings.json` or `appsettings.Development.json`
* Always preserve:

  * Database name
  * Username
  * Password
  * Host and port

### When updating configuration:

* Extend existing settings instead of replacing them
* Only add new keys (e.g., Jwt settings), do not remove existing ones

### Database Safety

* Do NOT drop or recreate the database unless explicitly instructed
* Do NOT reset migrations without confirmation

### File Safety

* Do NOT overwrite entire files unless necessary
* Prefer incremental updates

### General Rule

If a file already contains user-defined values:
→ Preserve them and build around them

### TypeScript Config Overwrite (tsconfig.*.json)

Codex may overwrite `tsconfig.json` or `tsconfig.app.json` and remove custom compiler options.

#### Rules:

* Never overwrite existing tsconfig files
* Always preserve:

  * compilerOptions (including ignoreDeprecations, paths, baseUrl)
  * strict settings
  * module resolution settings

#### When updating TypeScript config:

* Extend existing config instead of replacing it
* Only add new fields if missing

#### Example:

If "ignoreDeprecations": "6.0" exists → it must not be removed
