# Form-Task-Aerolens
# TASK-AEROLENS Playwright Automation Project

This project automates the https://demoqa.com/automation-practice-form form submission using Playwright. It includes test scripts, test data, page objects, and utilities. It also generates HTML and Allure reports for test results.

---

## Project Structure

- `data/` - Contains test data files (`basicForm.json`, `login_data.csv`, etc.)
- `pages/` - Contains page object files (`registrationPage.js`, etc.)
- `tests/` - Contains test specification files (`formSubmit.spec.js`, etc.)
- `utils/` - Utility helper files (if any)
- `playwright.config.js` - Playwright configuration file
- `package.json` & `package-lock.json` - Project dependencies and configuration
- `node_modules/` - Installed npm packages
- `allure-report/` & `allure-results/` - Allure reports and raw test results
- `playwright-report/` - Playwright HTML report
- `test-results/` - Folder to store other test results


## Prerequisites

- Node.js installed (recommended version >= 14.x)
- npm (comes with Node.js)
- Git installed (for pushing code to GitHub)


## Setup Instructions

1. **Clone the repository**
git clone https://github.com/iam-vallapuneni/Form-Task-Aerolens
cd Form-Task-Aerolens


## Install dependencies
npm install

## Install Playwright browser
npx playwright install

## Running Tests

npx playwright test --timeout=90000 --headed 

## Running Tests debug

npx playwright test --timeout=90000 --debug   ===> u can each step excution


## Generating Reports ===> Playwright HTML Report
npx playwright show-report

## Allure Reports
allure generate allure-results --clean -o allure-report

## To open the Allure report in a browser:
allure open allure-report


