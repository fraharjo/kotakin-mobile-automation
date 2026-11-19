---
name: nexus-test-generator
description: >-
  Enterprise QA Lead & SDET Generator for Nexus Automation (Web, Android, iOS).
  Generates production-grade BDD Cucumber test cases, type-safe multi-platform Screen Objects,
  and step definitions with strict traceability, risk-based prioritization, and i18n resilience.
---

# Nexus Test Generator (Enterprise QA Lead & SDET Engine)

Use this skill to guide test design, application exploration (Web, Android, iOS), and the creation of structured test automation suites on the **Nexus Automation** platform.

---

## 🎯 Core Framework Principles

1. **Anti-Hallucination Selectors:** Never guess or fabricate selectors. Use standardized naming conventions, verify against real UI dumps (`adb shell uiautomator dump` / browser devtools), or explicitly annotate with `// TODO: verify with dev`.
2. **Multi-Platform Consistency:** A unified modular architecture supporting Web, Android, and iOS without duplicating business logic.
3. **Strict Traceability & I/O Contract:** Every scenario must map directly to Acceptance Criteria (`@AC-<ID>`) and a Jira issue (`@JIRA-<KEY>`). If requirements are ambiguous, document them as **Open Questions & Assumptions** instead of assuming flows.
4. **Risk-Based Prioritization & Applicability:** Generate only applicable scenarios. Inapplicable dimensions must be marked `N/A + justification`. Classify priority: `@p0` (Smoke), `@p1` (Regression), `@p2` (Edge-case).
5. **Standardized Tagging Taxonomy:** Runners filter tests with precision (`not @manual and @automated`).
6. **Step Reuse & Clean Code:** Always check the existing step library before creating new step definitions to avoid code duplication.

---

## 📋 Input / Output Contract (I/O Contract)

### 1. Minimum Required Input
Before beginning test design, ensure the following details are available:
* **Target Feature / Module:** Module name (e.g., `box`, `item`, `settings`, `auth`).
* **Target Platform:** `Web`, `Android`, `iOS`, or `Cross-Platform`.
* **Acceptance Criteria (AC):** Numbered criteria list (`AC-01`, `AC-02`, etc.).
* **User Roles & Permissions:** Access levels (e.g., Guest, Authenticated User, Admin).
* **UI Artifacts (Optional but Recommended):** APK file in `apps/`, Web URL, or Figma design specifications.

### 2. Ambiguity Handling Rules
If requirements are incomplete or ambiguous:
* **NEVER** assume business workflows without confirmation.
* Document a list of **Open Questions & Working Assumptions** in the requirement file (`requirements/<feature>-prd.md`).
* Seek clarification from the user before locking down BDD scenarios.

---

## 📐 6 Test Coverage Dimensions (Coverage Checklist)

Evaluate the following 6 dimensions when analyzing requirements to determine test scenarios.
> [!IMPORTANT]
> **Applicability Rule:** If a dimension is not relevant for the feature under test (e.g., biometric hardware or camera on an About/Settings page), explicitly annotate: `N/A: <reason>`. **DO NOT** force fictitious scenarios.

### Dimension 1: Happy Path & Core Business Logic (Positive)
* Ideal workflow (*golden path*) from start to finish matching Acceptance Criteria (`@AC-<ID>`).
* Tags: `@p0 @automated @positive`

### Dimension 2: Boundary Value Analysis (BVA) & Equivalence Partitioning (EP)
* Input boundary thresholds: `Min - 1`, `Min`, `Max`, `Max + 1`.
* Valid vs. invalid partitions: Data formats, alphanumeric vs. symbols, extreme text lengths (150–500+ characters).
* Extreme characters & Sanitization: Unicode, Emoji (⚡️, 📦), whitespace-only (`"   "`), zero-width spaces, basic SQL/XSS injection (`<script>`, `' OR '1'='1`).
* Tags: `@p1 @automated @negative @boundary`

### Dimension 3: State Transitions & Cancellation Flows (User Journey)
* Entity state transitions: e.g., `Draft` → `Pending` → `Success` → `Cancelled` → `Expired`.
* User cancellation & interruptions: Tapping Back, tapping Cancel, or reloading during in-progress operations.
* Tags: `@p1 @automated @negative @lifecycle`

### Dimension 4: Negative & Backend Error Handling
* Server / API error responses: HTTP 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Server Error, 504 Timeout.
* UI error handling: Inline field validation errors, toast notifications, or error banner dialogs.
* Tags: `@p1 @automated @negative`

### Dimension 5: The 5 UI & UX States (Figma / UI Alignment)
1. **Ideal State:** Fully populated and normal content.
2. **Empty State:** Screen when no data exists (illustration, helpful copy, and primary CTA).
3. **Loading / Skeleton State:** Progress indicators or skeleton screens while data is fetching.
4. **Error State:** Screen displayed when components fail to load, with a retry button.
5. **Partial / Overflow State:** Text overflow handling (ellipsis `...`), multiline labels without UI clipping.
* Tags: `@p1 @automated @regression` (or `@manual` if subjective visual verification only).

### Dimension 6: Mobile Interruptions, Concurrency & Hardware
* **Concurrency / Idempotency:** Rapid double-tapping on submit/pay buttons to ensure operations are not processed twice.
* **Network Transitions:** Toggling offline (Airplane Mode), slow connectivity, or reconnection during active requests.
* **App Backgrounding:** Minimizing the app mid-operation and restoring it to verify state preservation.
* **Hardware & Physical Integration:** Physical camera scanning, biometric auth (Fingerprint/FaceID), external SMS OTP.
* Tags: Physical hardware scenarios are tagged `@p2 @manual`. Idempotency / backgrounding scenarios are tagged `@p2 @automated`.

---

## 🏷️ Standard Tagging Taxonomy (Mandatory 1 Tag per Category)

Every Gherkin scenario MUST include at least one tag from each of the following 6 categories:

```gherkin
@feature-<name> @JIRA-<KEY> @AC-<ID>
@p0 @automated @android @positive
Scenario: Successful login with valid credentials
```

| Category | Valid Tags | Description |
| :--- | :--- | :--- |
| **1. Feature & Jira** | `@feature-<module>` `@JIRA-<KEY>` | Feature scope and tracking ticket (e.g., `@feature-box @JIRA-KOT-101`) |
| **2. Traceability** | `@AC-01`, `@AC-02`, etc. | Direct mapping to specific Acceptance Criteria in PRD |
| **3. Priority** | `@p0`, `@p1`, `@p2` | `@p0` = Smoke (Critical Path)<br>`@p1` = Regression (Happy & Negative Flows)<br>`@p2` = Edge-case / Stress |
| **4. Execution Mode** | `@automated`, `@manual` | `@automated` = Executed by CI/CD runner<br>`@manual` = Manual testing (Hardware, SMS OTP, visual verification) |
| **5. Platform** | `@android`, `@ios`, `@web`, `@cross-platform` | Target testing environment |
| **6. Test Type** | `@positive`, `@negative`, `@boundary`, `@security`, `@lifecycle` | Test category classification |

> [!IMPORTANT]
> **Test Runner Execution Rule:**
> CI/CD pipelines and local test runners MUST exclude manual scenarios using the tag filter:
> `--cucumberOpts.tags="not @manual and @automated"`

---

## 🔍 Selector Conventions & Multi-Platform Strategy

### 1. Selector Naming Convention ({screen}-{element}-{type})
If selectors have not been verified via APK dump or DOM inspection, use this standard convention:
* Format: `<screen>-<element_name>-<element_type>`
* Examples:
  * `login-email-input` (Text input field)
  * `box-create-btn` (Action button)
  * `dashboard-header-txt` (Header / text label)
  * `settings-language-radio` (Radio button)
* Add a comment `// TODO: verify with dev` if the selector is inferred from design.

### 2. Platform Selector Behaviors
* **Android:** Matches `content-desc` (Accessibility ID) or `text` (Visible Label).
* **iOS:** Matches `accessibilityIdentifier` (Stable ID) or `label`.
* **Web:** Matches `data-testid`, `id`, or CSS selectors.

### 3. Unified Multi-Platform Pattern in `BaseScreen`
Use the helpers in `shared/pages/base.screen.ts`:
```typescript
// Multi-Platform Static Selector
get btnSubmit() {
  return this.getSelector('#submit-btn', 'login-submit-btn');
}

// Multi-Language Resilient Selector (EN, ID, etc.)
get headerDashboard() {
  return this.getByI18n(i18n.dashboard.header);
}
```

---

## 🌐 Enterprise Multi-Language (i18n) Architecture

All language-dependent UI strings MUST adhere to a centralized architecture:
1. **Centralized i18n Dictionary (`shared/constants/i18n.ts`):** Single Source of Truth (SSoT) typed with `as const`.
2. **Resilient Locator Engine:** Utilize `this.getByI18n(variants)` which checks `@content-desc` and `@text` concurrently.
3. **React Native State Sync:** Always chain `click()`, `clearValue()`, and `setValue('')` when resetting React Native inputs.
4. **Native Dialog Resilience:** Handle native `AlertDialog` (e.g., `"Name required"`) before evaluating underlying form states.

---

## 🧭 5-Stage Workflow

```
[Stage 1: I/O Interview & Open Questions] 
       ⬇
[Stage 2: Dynamic APK / Web DOM Exploration] 
       ⬇
[Stage 3: Matrix Synthesis, AC Traceability & Human Review (Checkpoint)] 
       ⬇
[Stage 4: Modular Code Generation (features/)] 
       ⬇
[Stage 5: TypeScript Compilation Validation & Test Runner Check]
```

---

## Stage 1: Phased Interview (I/O & Requirement Contract)

Ask questions **one at a time**:
1. **Question 1 - Module & Platform:** What feature needs testing and what is the target platform (`Android`, `iOS`, `Web`)?
2. **Question 2 - Acceptance Criteria (AC):** Provide the numbered AC list (`AC-01`, `AC-02`) or paste user story documents.
3. **Question 3 - Negative & Edge Cases:** What error validations, input limits, or cancellation flows are expected?
4. **Question 4 - UI / APK Source:** Is an APK available in `apps/` to dump actual selectors?

---

## Stage 2: Dynamic Selector Exploration (Anti-Hallucination)

If an APK is present in `apps/`:
```bash
# 1. Inspect Activity & Package
~/Library/Android/sdk/build-tools/36.0.0/aapt dump badging apps/<app>.apk | grep -E "package: name|launchable-activity"

# 2. Dump Actual XML Hierarchy
adb shell uiautomator dump /sdcard/window_dump.xml
adb pull /sdcard/window_dump.xml /tmp/window_dump.xml
```
Extract actual `content-desc`, `resource-id`, and `text` directly from the XML dump.

---

## Stage 3: Matrix Synthesis, Traceability, & Review Checkpoint

> [!IMPORTANT]
> **HUMAN REVIEW CHECKPOINT:**
> You MUST present the Coverage Matrix & BDD Scenario Plan to the user first. **DO NOT generate code files in Stage 4 before the user reviews and approves this plan.**

### Proposed Matrix Format:
| Scenario ID | AC Mapping | Priority | Type | Platform | Scenario Summary | Execution Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `TC-BOX-001` | `AC-01` | `@p0` | `@positive` | `@android` | Successfully create a new box with valid details | `@automated` |
| `TC-BOX-002` | `AC-02` | `@p1` | `@negative` | `@android` | Fail to create box when mandatory name is empty | `@automated` |
| `TC-BOX-003` | `AC-03` | `@p2` | `@edge-case` | `@android` | Verify physical QR camera scanner integration | `@manual` |

*Note: Inapplicable dimensions must be explicitly marked `N/A: <reason>` (e.g., "Biometric hardware is N/A for About module").*

---

## Stage 4: Modular Code Generation (`features/`)

Generate 4 files per feature adhering to the clean domain structure:
```text
features/<feature_name>/
├── requirements/<feature_name>-prd.md    # PRD, AC Mapping, Open Questions
├── features/<feature_name>.feature       # BDD Gherkin with Full Tagging
├── pages/<feature_name>.screen.ts        # Screen Object (POM)
└── steps/<feature_name>.steps.ts         # Step Definitions (Verify reuse first)
```

### Step Reuse Rules:
Before creating new step definitions, inspect existing step files across other modules (`features/*/steps/*.steps.ts`) and `shared/`. Reuse existing step phrases whenever applicable (e.g., `Given the user is on the "My Stash" dashboard`).

---

## 💡 Concrete Few-Shot Example

### 1. Feature File (`features/box/features/box.feature`):
```gherkin
@feature-box @JIRA-KOT-101
Feature: Box Management
  As a Kotakin user
  I want to create, edit, and organize storage boxes
  So that I can keep track of my physical belongings

  @p0 @automated @android @positive @AC-01
  Scenario: Successfully create a new box with valid details
    Given the user is on the "My Stash" dashboard
    When the user opens the New Box form
    And the user fills the box name with "Kitchen Box" and description "Utensils"
    And the user submits the box creation form
    Then the box "Kitchen Box" should be displayed on the dashboard

  @p1 @automated @android @negative @boundary @AC-02
  Scenario Outline: Fail to create box when mandatory name is invalid
    Given the user is on the "My Stash" dashboard
    When the user opens the New Box form
    And the user fills the box name with "<input_name>" and description "Invalid Test"
    And the user submits the box creation form
    Then the user should remain on the New Box form

    Examples:
      | input_name |
      |            |
      |            |
```

### 2. Screen Object (`features/box/pages/box.screen.ts`):
```typescript
import { BaseScreen } from '../../../shared/pages/base.screen';
import { i18n } from '../../../shared/constants/i18n';

class BoxScreen extends BaseScreen {
  // i18n Resilient Locators
  get btnNewBox() {
    return this.getByI18n(i18n.dashboard.btnNewBox);
  }

  get headerMyStash() {
    return this.getByI18n(i18n.dashboard.header);
  }

  get btnCreateBox() {
    return this.getByI18n(i18n.box.btnCreateBox);
  }

  // Standardized Conventions
  get inputBoxName() {
    return $('~Box name'); // Verified from UI Dump
  }

  get inputDescription() {
    return $('~Description'); // Verified from UI Dump
  }

  async openNewBoxForm(): Promise<void> {
    await this.click(this.btnNewBox);
  }

  async fillBoxForm(name: string, description: string): Promise<void> {
    await this.setValue(this.inputBoxName, name);
    if (description) {
      await this.setValue(this.inputDescription, description);
    }
  }
}

export default new BoxScreen();
```

### 3. Step Definition (`features/box/steps/box.steps.ts`):
```typescript
import { Given, When, Then } from '@cucumber/cucumber';
import boxScreen from '../pages/box.screen';

Given('the user is on the {string} dashboard', async (dashboardTitle: string) => {
  await boxScreen.ensureOnMyStash();
});

When('the user opens the New Box form', async () => {
  await boxScreen.openNewBoxForm();
});

When('the user fills the box name with {string} and description {string}', async (name: string, desc: string) => {
  await boxScreen.fillBoxForm(name, desc);
});
```

---

## Stage 5: Compilation Validation & Execution Readiness

1. **Verify TypeScript Compilation:**
   ```bash
   npx tsc --noEmit
   ```
   Must exit with code 0 and zero type errors.
2. **Automated Test Execution Commands (Excluding Manual Scenarios):**
   ```bash
   # Run all automated Android tests
   npm run test:android

   # Run by specific feature module
   npm run test:feature:<name>

   # Generate and open Allure Report
   npm run report:open
   ```
