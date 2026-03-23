---
name: create-linear-issue-getrolling
description: Creates Linear issues in project GetRolling with a consistent intake flow. Use when the user asks to create a Linear ticket, bug, task, issue, or backlog item for GetRolling.
---

# Create Linear Issue (GetRolling)

## Purpose

Create a new Linear issue in the `GetRolling` project using a consistent, low-friction workflow and concise final output.

## Required Fields

Collect these fields before creation:

- `title` (required)
- `description` (required)
- `priority` (required)
- `labels` (required; empty list allowed only if user explicitly says no labels)

## Defaults

- Always target Linear project `GetRolling`.
- If multiple teams/projects include similar names, select the exact `GetRolling` match.

## Workflow

1. Gather missing required fields from the user.
2. Normalize content:
   - Keep title specific and action-oriented.
   - Convert description to concise markdown with context, expected behavior, and acceptance criteria when available.
   - Map priority to Linear's supported priority values.
   - Normalize labels to existing team labels when possible; otherwise create issue without new label creation unless user asks.
3. Create the issue in Linear for project `GetRolling`.
4. Return a concise result with:
   - Issue identifier (for example `GR-123`)
   - Issue URL
   - Title
   - Priority
   - Labels

## Tooling Guidance

- Prefer Linear MCP tools when available.
- Before calling any MCP tool, inspect its descriptor/schema to confirm required parameters and valid field names.
- If the current environment has no Linear integration configured, ask for setup details instead of guessing API endpoints.

## Output Format

Use this concise response format:

```markdown
Created Linear issue: [GR-123](https://linear.app/...).
Title: <title>
Priority: <priority>
Labels: <comma-separated labels or "none">
```

## Guardrails

- Do not silently switch to a project other than `GetRolling`.
- Do not invent assignee, estimate, or labels.
- If required fields are missing, ask only for the missing fields.
