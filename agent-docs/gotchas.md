# Gotchas Codex Has Hit

## Connection String Overwrite

Codex may overwrite `DefaultConnection` in appsettings files.

### Rule:

* Never replace existing connection strings
* Only extend configuration

## Config Reset

Codex may regenerate appsettings.json and remove custom values.

### Rule:

* Preserve all existing configuration unless explicitly told otherwise

## Missing Middleware

Codex sometimes forgets:

* app.UseAuthentication()
* app.UseAuthorization()

## EF Core Issues

* Missing migrations
* DbContext not registered properly

## General Guidance

* Always review generated changes before committing
* Prefer small, incremental prompts over large ones
