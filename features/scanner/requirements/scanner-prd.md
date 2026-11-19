# Stream Scanner - PRD & Design Specification

## Jira Reference: JIRA-KTK-501
## App Reference: Kotakin (com.bmolab.kotakin)

### Overview:
The QR scanner allows users to scan physical QR codes printed from Kotakin and affixed to actual boxes, instantly navigating directly to the scanned box's contents.

### Acceptance Criteria:
1. **Trigger Scanner:** Users trigger the scanner via the "Scan" button on the "My Stash" dashboard.
2. **Camera Permission Flow:**
   - If camera permission is not yet granted, the app presents the "Grant camera permission" prompt.
   - If granted, the full-screen QR viewfinder opens.
3. **Dismiss Scanner (Naïve User / Edge Case):** Users can dismiss the QR scanner / permission prompt at any time to safely return to "My Stash".

### Real Locators (Android Content-Desc / Accessibility ID):
- Button Scan: `~Scan`
- Button Grant Camera Permission: `~Grant camera permission`
- Text Permission Notice: `//android.widget.TextView[@text="Camera access is required to scan QR codes."]`
- Text Settings Instruction: `//android.widget.TextView[contains(@text, "If permission was denied twice")]`
