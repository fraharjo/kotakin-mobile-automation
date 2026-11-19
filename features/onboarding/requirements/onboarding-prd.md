# Stream Onboarding - PRD & Design Specification

## Jira Reference: JIRA-KTK-101
## App Reference: Kotakin (com.bmolab.kotakin)

### Overview:
Kotakin provides a multi-step walkthrough onboarding flow for new users, introducing core concepts such as creating boxes, attaching QR codes, and searching inventory.

### Acceptance Criteria:
1. **Welcome Screen:** When launched for the first time, users see the welcome slide ("Welcome to Kotakin!").
2. **Step Navigation:** Users can progress slide-by-slide via the "Next" button through 3 introductory steps.
3. **Completion:** On the final step ("Search Everything"), the "Got it!" button completes the onboarding and transitions the user to the "My Stash" dashboard.
4. **Early Exit (Skip):** Users can bypass the onboarding at any time from any slide using the "Skip" button.

### Real Locators (Android Content-Desc / Accessibility ID):
- Next Button: `~Next`
- Skip Button: `~Skip`
- Got It Button: `~Got it!`
- Header My Stash: `//android.widget.TextView[@text="My Stash"]`
- Welcome Title: `//android.widget.TextView[@text="Welcome to Kotakin!"]`
- Step Titles:
  - Slide 2: `//android.widget.TextView[@text="Create Boxes"]`
  - Slide 3: `//android.widget.TextView[@text="Scan & Share"]`
  - Slide 4: `//android.widget.TextView[@text="Search Everything"]`
