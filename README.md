# EstateFlow Platform

A full-stack real estate platform built with React and .NET 8, designed to simulate a production-grade property marketplace and management system.

## Features

* Property listings with filtering and search
* Role-based authentication (Buyer, Agent, Admin)
* Agent dashboard for managing listings
* Saved properties and inquiries
* Scalable backend with clean architecture

## Tech Stack

### Frontend

* React + TypeScript
* TanStack Query
* Zustand
* Tailwind CSS
* React Hook Form

### Backend

* .NET 8 Web API
* Entity Framework Core
* PostgreSQL

## Project Structure

* `/api` — Backend API
* `/web` — Frontend app
* `/agent-docs` — AI agent workflow and execution plans

## Getting Started

### Backend

Before running the backend, ensure you have a PostgreSQL database created and configured.

1. Create a database (example):

```bash
createdb estateflow
```

2. Update the connection string in:

```
api/EstateFlow.API/appsettings.Development.json
```

Example:

```json
"ConnectionStrings": {
  "DefaultConnection": "Host=localhost;Port=5432;Database=estateflow;Username=postgres;Password=yourpassword"
}
```

3. Apply database migrations:

```bash
cd api
dotnet ef database update \
  --project EstateFlow.Infrastructure \
  --startup-project EstateFlow.API
```

4. Run the API:

```bash
dotnet run --project EstateFlow.API
```

---

### Frontend

```bash
cd web
pnpm install
pnpm dev
```

## Development Notes

* If you encounter errors like `relation does not exist`, ensure migrations have been applied
* Ensure PostgreSQL is running before starting the backend
* You may need to install EF CLI tools:

```bash
dotnet tool install --global dotnet-ef
```

## Development Approach

This project is designed to:

* Follow clean architecture principles
* Be AI-assisted using structured prompts
* Simulate real-world production systems

## Roadmap

See `plans.md` for full roadmap.
