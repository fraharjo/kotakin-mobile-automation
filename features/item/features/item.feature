@feature-item @JIRA-KTK-401
Feature: Kotakin Item Management Inside Box
  As a Kotakin user
  I want to add, photograph, and manage items inside my storage boxes
  So that I know exactly what is stored inside each box and its quantity

  Background:
    Given the user has opened an existing box detail screen

  # ==========================================
  # POSITIVE SCENARIOS
  # ==========================================

  @automated @smoke @regression @android
  Scenario: Add a new item with photo, title, description, and adjusted quantity
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "Ceramic Mug" and description "Blue porcelain coffee mug"
    And the user increases the item quantity by 2
    And the user taps the Save Item button
    Then the item "Ceramic Mug" should be listed inside the box

  @automated @functional @android
  Scenario: Add an item with mandatory title only and default quantity
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "Spare Keys" and leaves description blank
    And the user taps the Save Item button
    Then the item "Spare Keys" should be listed inside the box

  @automated @functional @android
  Scenario: Adjust item quantity using increment and decrement controls
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user increases the item quantity by 3
    And the user decreases the item quantity by 1
    Then the item quantity indicator should display 3

  @automated @functional @boundary @android
  Scenario: Add an item with minimum boundary single-character title
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "X" and description "Single character lower boundary"
    And the user taps the Save Item button
    Then the item "X" should be listed inside the box

  # ==========================================
  # NEGATIVE SCENARIOS
  # ==========================================

  @automated @negative @android
  Scenario: Fail to save item when mandatory title is empty
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user leaves the item title empty
    And the user taps the Save Item button
    Then the user should remain on the "Add Item Details" screen

  @automated @negative @android
  Scenario: Fail to save item when title contains only whitespace
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "     " and leaves description blank
    And the user taps the Save Item button
    Then the user should remain on the "Add Item Details" screen

  @automated @negative @android
  Scenario: Cancel item creation and discard captured photo
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user taps the Cancel button
    Then the user should be returned to the box detail screen without saving

  # ==========================================
  # EDGE CASES & REGEX VALIDATION
  # ==========================================

  @automated @edge-case @regex @android
  Scenario: Add an item with special characters, punctuation, and emojis
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "Item #42: [Vintage] & 'Rare' ⚡️ (50% Off)" and description "Punctuation & symbols: @!$%^*()_+-=[]{}|;':,./<>?"
    And the user taps the Save Item button
    Then the item "Item #42: [Vintage] & 'Rare' ⚡️ (50% Off)" should be listed inside the box

  @automated @edge-case @stress @boundary @android
  Scenario: Add an item with maximum length boundary title and long description
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters maximum boundary title of 150 characters and a multiline description of 500 characters
    And the user taps the Save Item button
    Then the maximum length item should be listed inside the box

  @automated @edge-case @security @android
  Scenario: Add an item with script injection tags and verify literal text rendering
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user enters item title "<script>alert('XSS')</script>" and description "' OR '1'='1 -- SQLi test"
    And the user taps the Save Item button
    Then the item "<script>alert('XSS')</script>" should be listed inside the box

  @automated @edge-case @android
  Scenario: Remove an attached photo before saving item
    When the user taps the "Add new item" button
    And the user captures a photo and proceeds to item details
    And the user taps the Remove photo button
    Then the photo should be removed from the item draft
