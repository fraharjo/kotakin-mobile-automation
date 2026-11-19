# QA Prompting Guide for AI (Nexus Test Generator)

Use this prompt template whenever there is a new PRD, Jira ticket, or Figma design for your stream.

---

## 1. Prompt: Generate New BDD & Screen Object

```text
Hi, please create Cucumber BDD (.feature), TypeScript Screen Object, and Step Definition for Stream [STREAM_NAME, e.g., checkout] based on the following requirements:

--- TICKET & DESIGN INFORMATION ---
Jira Ticket: [e.g., JIRA-PAY-402]
Figma Screen: [e.g., Screens/Payment/QRIS-v2]
Testing Type: [e.g., Functional / Regression / E2E]

--- ACCEPTANCE CRITERIA / USER STORY ---
[Paste User Story & Acceptance Criteria from Jira / PRD here]

--- FIGMA COMPONENTS / UI LOCATORS ---
[Paste list of Figma layer/component names or selector IDs, e.g.:
- Input QRIS Nominal: #input-nominal / ~input-nominal
- Pay Now Button: #btn-pay / ~btn-pay
- Status Dialog: #dialog-status / ~dialog-status]

--- OUTPUT SPECIFICATIONS ---
1. Apply standard tagging:
   - Stream: @stream-[name]
   - Eligibility: @automated or @manual
   - Category: @smoke, @functional, @regression, or @e2e
   - Platform: @web, @android, @ios
2. Generate clean Gherkin .feature files (Given-When-Then).
3. Generate Screen Object files extending BaseScreen with reserved locators for Web (#id/css) and Mobile (~accessibility-id).
4. Generate TypeScript Step Definition files that call the Screen Object methods.
```

---

## 2. Prompt: Self-Healing & Fix Failing Tests

```text
Hi, the test scenario [@JIRA-xxx] in Stream [stream_name] is FAILING on the [Web / Android] platform.

--- ALLURE ERROR LOG ---
[Paste error log / stack trace from Allure Report here]

--- RECENT UI / LOCATOR CHANGES ---
[Mention any ID or page hierarchy changes from the Dev team]

Please inspect the corresponding Screen Object and Step Definition files, and provide the fix so the test passes (GREEN) again.
```
