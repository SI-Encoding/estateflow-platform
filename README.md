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

```bash
cd api
dotnet restore
dotnet run
```

### Frontend

```bash
cd web
pnpm install
pnpm dev
```

## Development Approach

This project is designed to:

* Follow clean architecture principles
* Be AI-assisted using structured prompts
* Simulate real-world production systems

## Roadmap

See `plans.md` for full roadmap.
