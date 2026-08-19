# Product Feedback App

## 📌 Project Description & Purpose

This project is a full-stack Product Feedback board. Customers can view and filter feedback
suggestions by category, and submit new suggestions through a validated form — think of it as a
lightweight public roadmap/feature-request board for a product team. It was built as a 3-tier app
(PostgreSQL + Express/Node + React) using an AI-assisted development workflow with Claude Code.

## 🚀 Live Site

Check out the app: https://product-feedback-app-zesty.netlify.app

Backend API: https://product-feedback-api-2uu4.onrender.com (note: on Render's free tier, the
first request after a period of inactivity can take 50+ seconds while the service spins back up)

## 🖼️ Screenshots

<img width="2494" height="1340" alt="image" src="https://github.com/user-attachments/assets/746c5ff3-e120-4588-91bf-cdab5dc1d943" />

## ✨ Features

- View all submitted suggestions, sorted newest first
- Filter suggestions by category (UI, UX, Enhancement, Bug, Feature)
- A friendly empty-state screen when a filter has no matching suggestions
- Submit a new suggestion through a form with client- and server-side validation (required fields,
  title/description length limits, category whitelist)
- Submitted suggestions persist to a PostgreSQL database and survive a page refresh

## 🛠️ Tech Stack

### Frontend

- **Languages:** JavaScript, HTML, CSS
- **Framework:** React (Vite, React Router)
- **Deployment:** Netlify

### Server/API

- **Languages:** JavaScript (Node.js)
- **Framework:** Express
- **Deployment:** Render

### Database

- **Languages:** SQL (PostgreSQL)
- **Deployment:** Neon

## 🔹 API Documentation

These are the API endpoints built for this project:

1. `GET /get-all-suggestions` — get every suggestion
2. `GET /get-suggestions-by-category/:category` — get suggestions filtered by category
3. `POST /add-one-suggestion` — create a new suggestion

Learn more about the API endpoints here: [api-documentation.md](./api-documentation.md)

## 🗄️ Database Schema

Here's the SQL used to create the table:

```sql
CREATE TABLE suggestions (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description VARCHAR(500) NOT NULL,
  category VARCHAR(20) NOT NULL,
  upvotes INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

## 🧑‍💻 Running Locally

1. Clone the repo and install dependencies in both `client/` and `server/` (`npm install`)
2. In `server/`, copy `.env.example` to `.env` and fill in your own Neon `DATABASE_URL`
3. Start the backend: `npm run dev` (inside `server/`)
4. Start the frontend: `npm run dev` (inside `client/`) — it proxies `/api/*` to `http://localhost:3000`
5. Open the URL Vite prints (typically `http://localhost:5173`)

## 💭 Reflections

_What I learned:_ Directing an AI agent through a full-stack build is a different skill than
writing the code by hand — the PRD and the milestone breakdown do a lot of the work, and being
specific about what "done" looks like (view/filter/empty-state/validation, exact endpoints, exact
categories) mattered more than I expected. I also learned firsthand why secrets shouldn't be
committed: partway through the security audit, the Neon DB password had already been auto-rotated
because the credential had been sitting in the public repo's git history.

_What I'm proud of:_ Catching that credential exposure and fixing it properly (env vars, restricted
CORS, updated `.gitignore`) instead of just patching the symptom. Also that the bug log from
Milestone 5 (hover-state CSS bug, a stack-trace leak on malformed input, collapsed line breaks)
turned into three clean, verified fixes across Milestones 6 and 7.

_What challenged me:_ The frontend hadn't actually been built yet when I got to the "full testing"
milestone — there was nothing to click through. That meant catching up on Milestone 4's work before
I could even start testing, which was a good reminder to verify each milestone's output before
moving on to the next one.

Future ideas for how I'd continue building this project:

1. Let users upvote suggestions from the UI (the `upvotes` column already exists — just needs a
   `PATCH`/`POST` endpoint and a clickable button)
2. Add comments on suggestions
3. Sort suggestions by most/least upvotes, and support filtering by more than one category at once

## 🤖 AI Usage Log

This project was built with Claude Code (Claude) as an AI pair programmer, per the AI-assisted
track of this assignment. Roughly, by milestone:

- **Milestone 5 (testing):** Discovered the frontend was still an unbuilt skeleton and had Claude
  build out the Home and AddFeedback pages (routing, category filtering, empty state, form
  validation) before manually testing every user flow in the browser and confirming persistence
  against the Neon database directly. Found and logged 3 bugs as GitHub Issues during testing.
- **Milestone 6 (backend fix):** Had Claude fix a bug where a malformed JSON request body leaked a
  raw Express stack trace instead of a clean error response; verified with curl before merging.
- **Milestone 7 (UI fixes):** Compared the app against the Figma designs at mobile/tablet/desktop
  widths; fixed the two remaining frontend bugs (a CSS specificity bug that broke the active filter
  pill's hover state, and collapsed line breaks in descriptions) plus a low-contrast header text
  issue found along the way.
- **Milestone 8 (audits):** Ran Lighthouse's accessibility audit locally and fixed the one flagged
  contrast issue. For the security audit, moved the database credentials out of a committed source
  file into environment variables, restricted CORS to the actual frontend origin, and verified
  parameterized queries and server-side validation were already in place.
- **Milestone 9 (deploy):** Deployed the backend to Render and the frontend to Netlify, re-tested
  all user flows against the live URLs, and ran Lighthouse against the deployed site.

## 🙌 Credits & Shoutouts

Thanks to AnnieCannons for the project brief, Figma designs, and course structure this app was
built against! And thanks to Claude Code for pairing on the build, testing, and debugging across
every milestone.
