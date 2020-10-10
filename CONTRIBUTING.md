## Contributing
Thanks for considering to contribute to Woof! An easy way to start contributing is to look through the issues tab and submit an issue through there (bug reports, feature requests etc.) You can also submit any code contributions through pull requests, though make sure to follow some guidelines listed below. 

If you have any questions, feel free to open an issue or email me.

### Contributing Guidelines
When submitting pull requests make sure that you follow these rules:
1. Please keep PRs focused on fixing or creating a single feature.
2. Do not submit any pull requests for incomplete code contributions.
3. Please include tests with anticipated behavior for your code.
4. If your branch has conflicts with master, pull master into your fork.
5. Make sure your features and changes are well documented in the code.

### Getting Started
1. Fork the repo into your personal GitHub
2. Clone the fork locally using git clone
3. Create a branch for local development
4. Install all dev dependencies from requirements-dev.txt
5. Once you are done creating changes, use flake8 to check linting and black to help format your code
    1. You can use pre-commit hooks to make this easier
    2. To do so, just run "pre-commit install"
    3. Now, all linting and formatting will be done before every git commit (all config files are included in this repo)
6. Commit changes and push to Github
7. Create a pull request through GitHub. 
