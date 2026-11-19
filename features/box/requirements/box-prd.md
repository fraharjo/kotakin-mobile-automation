# Feature: Box Management - PRD & Design Specification

## Jira Reference: JIRA-KTK-201
## App Reference: Kotakin (com.bmolab.kotakin)

### Overview:
Box management is the central domain of Kotakin, enabling users to create storage containers, organize items within locations, search inventory, and retrieve QR codes for physical tagging.

### Acceptance Criteria:
1. **Creation with Full Details:** Users can create a new box with name (required), description, custom color palette, and location.
2. **Creation with Mandatory Only:** Users can create a box by supplying only the mandatory box name, with default color and empty description/location.
3. **Duplicate Box Names Allowed:** Kotakin uses internal unique IDs (UUID) for boxes; creating multiple boxes with the same name is permitted, and each appears as an independent box in the dashboard.
4. **Mandatory Field Validation (Negative):** Attempting to save a box with an empty name must not submit; the user remains on the creation form.
5. **Search - Positive & Case-Insensitive:** Searching by matching box name (regardless of uppercase/lowercase) filters the list to show matching items.
6. **Search - Partial & Substring Match:** Users can find boxes by typing partial word fragments (e.g. "ware" for "Kitchenware").
7. **Search - Whitespace Tolerance:** Queries with leading or trailing whitespace are trimmed and matched cleanly.
8. **Search - Cross-Entity:** Searching by the name of an item reveals the parent box containing that item.
9. **Search - Negative:** Searching for a non-existent keyword displays the empty state ("No results" and "No items match your search.").
10. **Search - Special Characters & Wildcards (Regex Stress):** Searching with symbols (`*`, `?`, `+`, `[`, `]`, `%`, `_`) must be handled gracefully without application crash or SQL/regex exceptions.
11. **Search - Clear Query:** Tapping "Clear search" resets the input and restores the full inventory list.
12. **Detail View:** Tapping a box opens its detail screen, providing "Add new item", "Show QR code", and "Expand actions".
13. **Special Characters & Counters (Edge Case):** Box names support alphanumeric and special characters (e.g. `#`, `&`, `[]`), and the overall box count on the dashboard updates accordingly.
14. **Favorite Box:** Users can toggle a box as favorite via the Box Actions menu. When favorited, the action changes to "Remove from favorites", and vice versa.
15. **Edit Box:** Users can edit existing box name and location. Saving updates the title on the detail screen immediately.
16. **Edit Box Mandatory Validation:** Clearing the box name and attempting to save must be rejected, keeping the user on the "Edit Box" form.
17. **Cancel Edit:** Tapping "Cancel" discards unsaved changes and preserves the original details.
18. **Delete Box with Confirmation:** Tapping "Delete box" prompts a confirmation dialog ("Delete Box?").
19. **Cancel Deletion:** Tapping "CANCEL" closes the modal and keeps the user on the box detail screen.
20. **Confirm Deletion:** Tapping "DELETE" permanently removes the box, redirects to "My Stash", and verifies the box is no longer in the list.

### Real Locators (Android Content-Desc / Accessibility ID):
- Button New Box: `~New box`
- Input Box Name: `~Box name`
- Input Description: `~Description`
- Color Buttons: `~Blue`, `~Red`, `~Green`, `~Yellow`, `~Purple`, `~Orange`, `~Pink`, `~Custom color`
- Input Location: `~Location`
- Button Create Box: `~Create box`
- Input Search: `~Search boxes`
- Button Clear Search: `~Clear search`
- Button Add New Item: `~Add new item`
- Button Show QR Code: `~Show QR code`
- Button Expand Actions: `~Expand actions`
- Button Collapse Actions: `~Collapse actions`
- Button Add to Favorites: `~Add to favorites`
- Button Remove from Favorites: `~Remove from favorites`
- Button Edit Box: `~Edit box`
- Button Delete Box: `~Delete box`
- Button Save Changes: `~Save Changes`
- Button Cancel Edit: `~Cancel`
- Header Form Edit Box: `//android.widget.TextView[@text="Edit Box"]`
- Dialog Delete Box: `//android.widget.TextView[@text="Delete Box?"]`
- Button Cancel Deletion: `//android.widget.Button[@text="CANCEL"]`
- Button Confirm Deletion: `//android.widget.Button[@text="DELETE"]`
- Button Go Back: `~Go back`
- Text Empty Search: `//android.widget.TextView[@text="No results"]`
- Text Empty Description: `//android.widget.TextView[@text="No items match your search."]`
- Header Form New Box: `//android.widget.TextView[@text="New Box"]`
- Counter Summary: `//android.widget.TextView[contains(@text, "box") and contains(@text, "item")]`
