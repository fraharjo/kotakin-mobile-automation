# Stream Settings - PRD & Design Specification

## Jira Reference: JIRA-KTK-301
## App Reference: Kotakin (com.bmolab.kotakin)

### Overview:
The Settings module allows users to configure application preferences, toggle languages between English and Bahasa Indonesia, view application details/credits, and perform data backups or restores.

### Acceptance Criteria:
1. **Access Settings:** Users can open Settings by tapping the gear/button at the top right of the "My Stash" dashboard.
2. **Localization:** Users can toggle between "English" and "Bahasa Indonesia". The selected radio button should show selected/checked state.
3. **About Kotakin Dialog:** Tapping "About Kotakin" displays app version information ("Version 1.0.0 (beta)"), description, and credits.
4. **Data Management:** Backup buttons ("Create zip backup") and Restore buttons ("Restore from zip backup") are accessible to ensure local-first data protection.
5. **Back Navigation:** Tapping the "Go back" button returns the user safely to the "My Stash" dashboard.

### Real Locators (Android Content-Desc / Accessibility ID):
- Button Settings: `~Settings`
- Radio English: `~Switch to English`
- Radio Indonesian: `~Switch to Indonesian`
- Button About Kotakin: `~About Kotakin`
- Button Create Backup: `~Create zip backup`
- Button Restore: `~Restore from zip backup`
- Button Go Back: `~Go back`
- Header Settings: `//android.widget.TextView[@text="Settings"]`
- Text Version: `//android.widget.TextView[contains(@text, "Version")]`
