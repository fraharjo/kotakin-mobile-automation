# Requirements Directory 📋

This directory serves as the **input gateway (Stage 1)** for feature specifications prior to automation scenario authoring.

## Supported Input Formats:
1. **Product Requirement Document (PRD)** in Markdown format (`.md`).
2. **User Stories & Acceptance Criteria (AC)** from Jira / Linear.
3. **UI Flow Notes / Figma Links**.

## How to Use with AI Skills:
Place the new feature specification document in this folder (e.g., `requirements/box-sharing.md`), then instruct the agent:
```text
"Use the nexus-test-generator skill to design test scenarios based on requirements/box-sharing.md targeting the Android platform, and save draft outputs to generated/box-sharing/"
```
