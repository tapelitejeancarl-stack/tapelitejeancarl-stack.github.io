# Upload Guide (read this carefully)

Your GitHub username: tapelitejeancarl-stack
Your website: https://tapelitejeancarl-stack.github.io

## The most important rule
Your repository on GitHub must show these 5 items on its FIRST page:
   css   data   images   js   index.html
If you see only index.html, or one extra folder holding everything, the website will look broken (plain text, no photo).

## PART 1 - Prepare
1. Download the zip and right-click > Extract All.
2. Open the extracted folder. Inside you should see: css, data, images, js, index.html.

## PART 2 - Create the repository
1. Go to https://github.com/new
2. Repository name: tapelitejeancarl-stack.github.io
3. Public. Do NOT tick "Add a README". Click the green "Create repository" button.

## PART 3 - Upload (folders must come along)
1. Click "uploading an existing file".
2. Inside the extracted folder press Ctrl + A (selects css, data, images, js, index.html).
3. Drag them all into the GitHub page. Wait until they all appear in the list (css/style.css, js/script.js, data/projects.json, images/profile.jpg, images/project1.png ...).
4. Commit message: First version of my portfolio
5. Click "Commit changes".
6. CHECK: the repository first page shows css, data, images, js, index.html.

If the folders did not upload: click "Add file" > "Upload files" and drag the missing folders in again.

## PART 4 - Turn on the website
1. Click "Settings" (top tabs, far right).
2. Left menu > "Pages" (under "Code and automation").
3. Source: "Deploy from a branch".
4. Branch: choose "main" and "/ (root)", click "Save".
5. Click the "Actions" tab. Wait for the green check (about 2 minutes).
6. Open https://tapelitejeancarl-stack.github.io and press Ctrl + F5.
7. In Settings > Pages make sure "Enforce HTTPS" is ticked.

## PART 5 - Extra commits (need 3 or more)
1. Click a file in your repository > pencil icon > make a small change.
2. Commit with a clear message such as "Update career goals".
3. Do this twice more.

## PART 6 - Checkpoint for your teacher
1. On the live site press F12 > Network tab > Ctrl + R.
2. Screenshot "projects.json" and the request to "api.github.com" (Method GET, Status 200, Type json).
3. Console tab must have no red errors.
(The GitHub repo list needs at least one public repository in your account.)

## Quick fixes
- Plain text, no design: css folder missing on GitHub. Upload it.
- No photo: images folder missing on GitHub. Upload it.
- 404: wait 2 minutes, check the repo name is exactly tapelitejeancarl-stack.github.io.
