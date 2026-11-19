# Feature: Item Management - PRD & Design Specification

## Jira Reference: JIRA-KTK-401
## App Reference: Kotakin (com.bmolab.kotakin)

### Overview:
Items represent physical goods placed inside a storage box. Users can capture or upload up to 3 photos, assign a title (mandatory), describe contents, and adjust quantities.

### Acceptance Criteria:
1. **Camera / Photo Capture:** Users initiate item addition via "Add new item" inside an existing box. They must capture at least one photo (up to 3 photos maximum) using "Take photo" or "Gallery".
2. **Mandatory Title Field:** Every item must have a non-empty Item Title ("Item Title *").
3. **Quantity Stepper:** Items start at quantity 1 and can be increased ("Increase quantity") or decreased ("Decrease quantity"). Minimum quantity is 1.
4. **Mandatory Validation (Negative):** Attempting to tap "Save item" without an item title will not submit; the user remains on "Add Item Details".
5. **Whitespace Validation (Negative):** Inputting only whitespace characters into Item Title must be treated as empty and fail validation.
6. **Cancel Flow (Negative / Naïve User):** Tapping "Cancel" discards captured photos and returns to the box screen without creating an item.
7. **Special Characters & Emojis (Regex Support):** Item Title and Description must support alphanumeric, punctuation, ASCII symbols, and Unicode Emojis without crashing SQLite or UI rendering.
8. **Boundary Testing (Min/Max):**
   - Lower Boundary: Single-character title (e.g. "X") is accepted.
   - Upper Boundary: Long title (150+ chars) and multiline description (500+ chars) must be accepted without UI freeze or crash.
9. **Security / Sanitization:** HTML entities and script injection tags (`<script>`, `' OR '1'='1`) must be rendered as plain literal strings without execution.
10. **Photo Removal (Edge Case):** Users can remove an attached photo using "Remove photo" before final save.

### Real Locators (Android Content-Desc / Accessibility ID):
- Button Add New Item: `~Add new item`
- Button Take Photo: `~Take photo`
- Button Done Photos: `~Done adding photos`
- Button Close Camera: `~Close camera`
- Button Remove Photo: `~Remove photo`
- Input Item Title: `~Item title`
- Input Item Description: `~Item description`
- Button Increase Quantity: `~Increase quantity`
- Button Decrease Quantity: `~Decrease quantity`
- Button Save Item: `~Save item`
- Button Cancel: `~Cancel`
- Header Add Item Details: `//android.widget.TextView[@text="Add Item Details"]`
