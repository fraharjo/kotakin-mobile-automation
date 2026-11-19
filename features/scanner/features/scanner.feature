@feature-scanner @REQ-KTK-501
Feature: Kotakin Physical QR Code Scanner
  As a Kotakin user
  I want to scan physical QR codes attached to storage boxes
  So that I can immediately view and verify the contents of any physical box

  Background:
    Given the user is on the "My Stash" dashboard

  # ==========================================
  # POSITIVE SCENARIOS
  # ==========================================

  @automated @smoke @android
  Scenario: Trigger QR code scanner from dashboard
    When the user taps the "Scan" button on the dashboard
    Then the QR scanner view or permission prompt should be displayed

  # ==========================================
  # NEGATIVE & PERMISSION SCENARIOS
  # ==========================================

  @automated @negative @android @permission
  Scenario: Verify camera permission requirement message when scanner is launched
    When the user taps the "Scan" button on the dashboard
    Then the app should display the permission prompt button "Grant camera permission"

  # ==========================================
  # EDGE CASES
  # ==========================================

  @automated @edge-case @android
  Scenario: Return safely to My Stash after opening scanner
    When the user taps the "Scan" button on the dashboard
    And the user dismisses the scanner view
    Then the user should be redirected to the "My Stash" dashboard
