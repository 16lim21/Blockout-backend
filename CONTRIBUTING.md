# Contributing

Thanks for considering to contribute to Blockout! An easy way to start contributing is to look through the issues tab and submit an issue through there (bug reports, feature requests etc.) You can also submit any code contributions through pull requests, though make sure to follow some guidelines listed below.

If you have any questions, feel free to open an issue or email me.

## Contributing Guidelines

When submitting pull requests make sure that you follow these rules:

1. Please keep PRs focused on fixing or creating a single feature.
2. Do not submit any pull requests for incomplete code contributions.
3. Please include tests with anticipated behavior for your code.
4. If your branch has conflicts with master, pull master into your fork.
5. Make sure your features and changes are well documented in the code.

## Installation Instructions

1. Fork the repo into your personal GitHub
2. Clone the fork locally using git clone
3. Create a branch for local development
4. Install all dev dependencies from package-lock.json
5. Once you are done creating changes, pre-commit hooks will be run to automatically lint and format all code.
   1. Might need to run "npm rebuild" if there are errors with auto-formatting.
6. Commit changes and push to Github
7. Create a pull request through GitHub.

## Getting Started
If you are adding api routes or modifying them, first fork and clone the [frontend](https://github.com/16lim21/Blockout-web) as well. Authentication with google OAuth2 must be done using the frontend in order to test any API routes. The frontend will run on http://localhost:3000 while the backend will run on http://localhost:3001

## Code Structure
- /: All configuration files are here as of right now
- /.github: Github templates and actions workflow
- /test: All test files
    - /test/main.test.js: Top level test file. New tests files must be included here.
- /server: Code to run and handle server actions
    - /server/server.js: Main file that runs server 
    - /server/api: API directory to house controllers and any self-defined middleware
        - /server/api/controllers: Controllers and routers
            - /server/api/controllers/index.js: Top level router. Additional routers and controllers must be added here.
    - /server/models: Mongoose models for data
    - /server/services: Services that handles business logic of the application
   
## CI Documentation

### Github Actions
- Build: Runs and tests main code. It lints the code using ESlint, then runs all tests and uploads the code coverage report to codecov
- deploy-docs: Recompiles all documentation and then uploads it to the gh-pages branch. 

### NPM Scripts
- start: Starts the server on http://localhost:3001
- dev: Starts the server in development mode (with hot reloading)
- test: Runs all tests in test directory (specifically test included in main.test.js)
- docs: Recompiles documentation (no need to run this, documentation will be recompiled on all successful pull requests)
- lint: Lints all javascript files and checks for errors.

### Developer Hooks
There are currently two sets of hooks used by the Blockout backend.
- Pre-commit hooks: Will run eslint and prettier on all commits, ensuring your code follows the linting guidelines. Incorrect formatting or syntax will reject the commit and must be fixed.
- Pre-push hooks: Runs all test. If any tests fail, push requests are rejected.

## API Documentation
The documentation for Blockout is hosted [here](16lim21.github.io/blockout-backend/).
For documentation on the google calendar api [instead](https://developers.google.com/calendar/v3/reference).

## Release notes and roadmap
Current releases and release notes can be found (here)[https://github.com/16lim21/Blockout-backend/releases]. 
The current release (v0.2.1) allows users to login to Blockout using their google account and create to-dos through the frontend. These events created by users will then be populated in their google calendar, and deletions of events will propogate to their calendar as well.
The next release (v0.3.0) will focus on blocking out times for a user to work on a todo prior to the deadline. 
