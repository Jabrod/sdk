JabRod SDK

This repository contains the official JabRod SDK.
The SDK allows developers to integrate JabRod APIs into their applications.

Purpose
- Provide a clean and stable interface to JabRod APIs
- Simplify authentication, requests, and responses
- Offer examples and best practices for integration

Supported Platforms
- JavaScript / TypeScript
- Additional languages may be added over time

Installation (JavaScript example)
npm install @jabrod/sdk

Basic Usage Example
import Jabrod from '@jabrod/sdk';

const client = new Jabrod({
  apiKey: process.env.JABROD_API_KEY
});

const response = await client.someApiCall();
console.log(response);

Repository Structure
- src       : SDK source code
- test      : Unit and integration tests
- examples  : Minimal runnable examples
- scripts   : Build and release helpers

How to Contribute
1. Fork the repository
2. Create a feature or fix branch
   git checkout -b feat/short-description
3. Make your changes
4. Add or update tests where applicable
5. Run tests and ensure build passes
6. Open a Pull Request to main

Branch Naming
- feat/feature-name
- fix/bug-description
- chore/maintenance-task
- docs/documentation-change

Commit Guidelines
- Follow conventional commits where possible
- Examples:
  feat(auth): add token refresh support
  fix(client): handle timeout errors

Testing
- All new features must include tests
- Ensure existing tests pass before submitting a PR

Releases
- Follows semantic versioning: MAJOR.MINOR.PATCH
- Breaking changes must be clearly documented
- Releases are handled via CI automation

Security
- Never commit API keys or secrets
- Use environment variables for authentication
- Report security issues privately to the maintainers

Support
- Bugs: open an issue with a minimal reproduction
- Feature requests: open an issue explaining the use case

License
This SDK is licensed under the same terms as the main JabRod project.
See LICENSE for details.
EOF
