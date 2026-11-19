@feature-onboarding @JIRA-KTK-101
Feature: Kotakin Onboarding & Walkthrough
  As a new Kotakin user
  I want to be guided through the initial walkthrough screens
  So that I understand how to create boxes, organize items, and scan QR codes

  @automated @smoke @android
  Scenario: Complete full onboarding walkthrough to My Stash
    Given the user opens the Kotakin app
    When the user advances through all onboarding steps using the Next button
    And the user taps the Got it button on the final step
    Then the user should be redirected to the "My Stash" dashboard

  @automated @functional @android
  Scenario: Skip onboarding from the initial welcome screen
    Given the user opens the Kotakin app
    When the user taps the Skip button on the current onboarding step
    Then the user should be redirected to the "My Stash" dashboard

  @automated @functional @android
  Scenario: Skip onboarding midway from step two
    Given the user opens the Kotakin app
    When the user advances one step forward using the Next button
    And the user taps the Skip button on the current onboarding step
    Then the user should be redirected to the "My Stash" dashboard

  @automated @edge-case @android
  Scenario: Verify onboarding step headers correspond to expected feature guides
    Given the user opens the Kotakin app
    Then the onboarding header should display "Welcome to Kotakin!"
    When the user advances one step forward using the Next button
    Then the onboarding header should display "Create Boxes"
    When the user advances one step forward using the Next button
    Then the onboarding header should display "Scan & Share"
    When the user advances one step forward using the Next button
    Then the onboarding header should display "Search Everything"
