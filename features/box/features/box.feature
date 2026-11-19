@feature-box @REQ-KTK-201
Feature: Kotakin Box Creation & Management
  As a Kotakin user
  I want to create, search, and manage storage boxes
  So that I can effectively organize and track my physical inventory

  Background:
    Given the user is on the "My Stash" dashboard

  # ==========================================
  # POSITIVE SCENARIOS - CREATION & DETAIL
  # ==========================================

  @automated @smoke @regression @android
  Scenario: Create a new box with all fields populated
    When the user taps the "New box" button
    And the user enters box name "Kitchenware" and description "Fragile plates and glassware"
    And the user selects box color "Blue" and enters location "Kitchen Cupboard A"
    And the user taps the Create Box button
    Then the box "Kitchenware" should appear in the stash list

  @automated @functional @android
  Scenario: Create a new box with only mandatory name field
    When the user taps the "New box" button
    And the user enters box name "Garage Tools" and leaves optional fields blank
    And the user taps the Create Box button
    Then the box "Garage Tools" should appear in the stash list

  @automated @e2e @regression @android
  Scenario: View box detail and verify action buttons
    When the user taps on the box "Kitchenware"
    Then the box detail screen should display "Add new item" and "Show QR code" buttons

  # ==========================================
  # FAVORITE FEATURE SCENARIOS
  # ==========================================

  @automated @functional @favorite @android
  Scenario: Add a box to favorites
    Given the user has opened the detail of box "Kitchenware"
    When the user expands the Box actions menu
    And the user taps the Add to favorites button
    Then the action option should update to "Remove from favorites"

  @automated @functional @favorite @android
  Scenario: Remove a box from favorites
    Given the user has opened the detail of box "Kitchenware"
    When the user expands the Box actions menu
    And the user taps the Remove from favorites button
    Then the action option should update to "Add to favorites"

  # ==========================================
  # EDIT BOX FEATURE SCENARIOS
  # ==========================================

  @automated @functional @edit @android
  Scenario: Edit existing box details and save changes successfully
    Given the user has opened the detail of box "Kitchenware"
    When the user expands the Box actions menu
    And the user taps the Edit box button
    And the user updates the box name to "Kitchenware Updated" and location to "Basement Unit B"
    And the user taps the Save Changes button
    Then the box title should display "Kitchenware Updated"

  @automated @negative @edit @android
  Scenario: Fail to save box edits when box name is cleared
    Given the user has opened the detail of box "Kitchenware Updated"
    When the user expands the Box actions menu
    And the user taps the Edit box button
    And the user clears the box name field
    And the user taps the Save Changes button
    Then the user should remain on the "Edit Box" screen

  @automated @functional @edit @cancel @android
  Scenario: Cancel box editing and verify original details remain unchanged
    Given the user has opened the detail of box "Kitchenware Updated"
    When the user expands the Box actions menu
    And the user taps the Edit box button
    And the user updates the box name to "Accidental Change" and location to "Unknown"
    And the user taps the Cancel edit button
    Then the box title should display "Kitchenware Updated"

  # ==========================================
  # DELETE BOX FEATURE SCENARIOS
  # ==========================================

  @automated @functional @delete @cancel @android
  Scenario: Cancel box deletion and verify box is preserved in stash
    Given the user has opened the detail of box "Kitchenware Updated"
    When the user expands the Box actions menu
    And the user taps the Delete box button
    Then the confirmation dialog "Delete Box?" should be displayed
    When the user taps the Cancel deletion button
    Then the user should remain on the box detail screen

  @automated @functional @delete @android
  Scenario: Delete a box permanently and verify removal from stash dashboard
    Given the user has opened the detail of box "Kitchenware Updated"
    When the user expands the Box actions menu
    And the user taps the Delete box button
    Then the confirmation dialog "Delete Box?" should be displayed
    When the user taps the Confirm deletion button
    Then the user should be redirected to the "My Stash" dashboard
    And the box "Kitchenware Updated" should no longer appear in the stash list

  # ==========================================
  # DUPLICATE & REGEX / FILTER SCENARIOS
  # ==========================================

  @automated @functional @duplicate @android
  Scenario: Allow creation of duplicate box names and update total box counter
    When the user taps the "New box" button
    And the user enters box name "Garage Tools" and leaves optional fields blank
    And the user taps the Create Box button
    Then multiple boxes with name "Garage Tools" should appear in the stash list

  @automated @functional @android
  Scenario: Search for an existing box by name
    When the user searches for box with query "Garage Tools"
    Then the stash list should display "Garage Tools"

  @automated @functional @android
  Scenario: Clear search query and restore full box list
    Given the user searches for box with query "Garage Tools"
    When the user taps the Clear search button
    Then the search input should be empty

  @automated @functional @regex @android
  Scenario: Search box with case-insensitive query
    When the user searches for box with query "garage tools"
    Then the stash list should display "Garage Tools"

  @automated @functional @regex @android
  Scenario: Search box using partial substring matching
    When the user searches for box with query "Tools"
    Then the stash list should display "Garage Tools"

  @automated @functional @sanitization @android
  Scenario: Search box with leading and trailing whitespace query
    When the user searches for box with query "  Garage Tools  "
    Then the stash list should display "Garage Tools"

  @automated @functional @cross-search @android
  Scenario: Search for a box by the name of an item stored inside it
    When the user searches for box with query "Ceramic Mug"
    Then the stash list should display the box containing "Ceramic Mug"

  # ==========================================
  # NEGATIVE SCENARIOS
  # ==========================================

  @automated @negative @android
  Scenario: Fail to create box when mandatory box name is empty
    When the user taps the "New box" button
    And the user leaves the box name empty
    And the user taps the Create Box button
    Then the user should remain on the "New Box" creation form

  @automated @negative @android
  Scenario: Search with non-existent keyword shows empty results state
    When the user searches for box with query "xyz_nonexistent_item_999"
    Then the stash list should display the empty search result message

  # ==========================================
  # EDGE CASES & WILDCARD STRESS
  # ==========================================

  @automated @edge-case @android
  Scenario: Create a box with special characters and numerical identifiers
    When the user taps the "New box" button
    And the user enters box name "Box #101 [Fragile] & 100% Cotton" and description "High priority items"
    And the user selects box color "Green" and enters location "Shelf B-2"
    And the user taps the Create Box button
    Then the box "Box #101 [Fragile] & 100% Cotton" should appear in the stash list

  @automated @edge-case @regex @stress @android
  Scenario: Search box with special regex characters without application crash
    When the user searches for box with query "*?+[]%_'"
    Then the stash list should handle the query without crashing

  # ==========================================
  # NEW COVERAGE: BVA, SECURITY & LIFECYCLE
  # ==========================================

  @p1 @automated @negative @boundary @AC-02 @android
  Scenario: Fail to create box when name contains only whitespace
    When the user taps the "New box" button
    And the user enters box name "     " and leaves optional fields blank
    And the user taps the Create Box button
    Then the user should remain on the "New Box" creation form

  @p1 @automated @positive @boundary @AC-01 @android
  Scenario: Create a box with minimum boundary single-character name
    When the user taps the "New box" button
    And the user enters box name "B" and leaves optional fields blank
    And the user taps the Create Box button
    Then the box "B" should appear in the stash list

  @p2 @automated @positive @security @AC-01 @android
  Scenario: Create a box with script injection tags and verify literal text rendering
    When the user taps the "New box" button
    And the user enters box name "<script>alert(1)</script> Safe Box" and description "Security test"
    And the user taps the Create Box button
    Then the box "<script>alert(1)</script> Safe Box" should appear in the stash list

  @p1 @automated @negative @lifecycle @cancel @AC-03 @android
  Scenario: Cancel box creation midway and verify draft is not saved to stash
    When the user taps the "New box" button
    And the user enters box name "Abandoned Draft Box" and leaves optional fields blank
    And the user taps the Go back button from creation form
    Then the user should be redirected to the "My Stash" dashboard
    And the box "Abandoned Draft Box" should no longer appear in the stash list

  @p2 @automated @lifecycle @resilience @AC-04 @android
  Scenario: Preserve dashboard state when application is minimized to background
    Given the user is on the "My Stash" dashboard
    When the user minimizes the application to background for 2 seconds
    Then the user should still see the "My Stash" dashboard without any application crash
