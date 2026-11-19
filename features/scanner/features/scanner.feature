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

  # ==========================================
  # MANUAL VERIFICATION SCENARIOS
  # ==========================================

  @manual @p1 @android @AC-501-01 @REQ-KTK-501
  Scenario: Scan physical QR code attached to a storage box
    Given the tester launches the physical QR scanner on a real mobile device
    When the tester points the physical camera lens towards a printed Kotakin QR code label
    Then the application should detect and decode the QR code within 2 seconds
    And the application should navigate automatically to the corresponding box detail view

  @manual @p2 @android @AC-501-02 @REQ-KTK-501
  Scenario: Scan damaged or dimly lit QR code with flashlight torch
    Given the tester is in a low-light physical testing environment
    When the tester activates the flashlight torch from the scanner interface
    And the tester aims the camera at a partially creased or reflective QR code
    Then the scanner should successfully resolve the box ID without crashing or freezing
