# How to release

This document is for maintainers of Hyperkeys only. It lists the steps to create a new release of Hyperkeys.

1. First, create a new draft release : https://github.com/xurei/hyperkeys/releases/new.
2. `npm version [patch|minor|major]`
3. In the release draft, create the tag name wih syntax `v[x].[y].[z]` (example: `v1.2.34`).
4. Re-run the last github actions to update the release artifacts, or push your latest changes.
   If you push another commit, Github will update the artifacts to match the latest successfully built commit.

5. While it builds, check the description of your release.

6. Publish the release. It will create the right tag at the right commit.

7. BONUS : create the next release draft already ;-)
