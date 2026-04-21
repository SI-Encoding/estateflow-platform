# architecture.md

## Backend Architecture

Layers:

* Domain: entities and enums only
* Application: business logic, DTOs, interfaces
* Infrastructure: database, repositories
* API: controllers and middleware

## Rules

* Domain must not depend on other layers
* Application depends only on Domain
* Infrastructure implements Application interfaces
* API depends on Application

## Patterns

* Repository pattern
* Service layer for business logic
* DTO mapping (manual or AutoMapper)

## Database

* PostgreSQL
* Use EF Core migrations

## Authentication

* JWT-based authentication
* Role-based authorization

## Configuration Rules
- Application configuration must not overwrite existing environment-specific values
- Sensitive values (DB credentials) must always be preserved