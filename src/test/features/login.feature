Feature: User Login
  As a user
  I want to log in to the system
  So that I can access my account

  Background: Naviation to application
    Given I navigate to the application
    And I click on login button

  Scenario Outline: Successful login
    And I enter my email address as "<username>"
    And I enter my password as "<password>"
    And I click the Sign In button
    Then I should be redirected to the My Account page

    Examples:
      | username          | password |
      | fadnew1@gmail.com | Fadi_155 |

