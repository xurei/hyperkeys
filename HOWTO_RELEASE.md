# How to release

This document is for maintainers of Hyperkeys only. It lists the steps to create a new release of Hyperkeys.

1. First, create a new draft release : https://github.com/xurei/hyperkeys/releases/new.

2. In the release draft, create the tag name wih syntax `v[x].[y].[z]` (example: `v1.2.34`).

3. Re-run the last github actions to update the release artifacts, or push your latest changes.
   If you push another commit, Github will update the artifacts to match the latest successfully built commit.

4. While it builds, check the description of your release.

5. Publish the release. It will create the right tag at the right commit.

6. `npm version [patch|minor|major] && git commit --amend -m "Start x.y.z Development"`
   (You can do manually as well if required)

7. BONUS : create the next release draft already ;-)
