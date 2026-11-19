@feature-settings @REQ-KTK-301
Feature: Kotakin Application Settings & Localization
  As a Kotakin user
  I want to configure application settings, localization, and backups
  So that I can use the app comfortably in my preferred language and protect my data

  Background:
    Given the user is on the "My Stash" dashboard

  # ==========================================
  # POSITIVE SCENARIOS
  # ==========================================

  @automated @smoke @android
  Scenario: Switch application language to Bahasa Indonesia
    When the user opens the Settings screen
    And the user selects the language option "Bahasa Indonesia"
    Then the language option "Bahasa Indonesia" should be selected

  @automated @functional @android
  Scenario: Switch application language back to English
    When the user opens the Settings screen
    And the user selects the language option "English"
    Then the language option "English" should be selected

  @automated @functional @android
  Scenario: Navigate to About Kotakin screen and verify app version
    When the user opens the Settings screen
    And the user taps the "About Kotakin" button
    Then the About screen should display the app version details
    When the user taps the Go back button
    Then the user should see the Settings screen header

  @automated @functional @android
  Scenario: Navigate back to My Stash from Settings screen
    When the user opens the Settings screen
    And the user taps the Go back button
    Then the user should be redirected to the "My Stash" dashboard

  # ==========================================
  # BOUNDARY & EDGE CASES
  # ==========================================

  @automated @edge-case @android
  Scenario: Verify Backup and Restore action buttons are accessible
    When the user opens the Settings screen
    Then the backup action button "Create zip backup" should be displayed
    And the restore action button "Restore from zip backup" should be displayed
