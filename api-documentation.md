# 📘 Product Feedback API Documentation

Base URL (local): `http://localhost:3000`
Base URL (deployed): `https://product-feedback-api-2uu4.onrender.com`

## Overview

| Resource         | Method | Endpoint                              | Description                                     |
|------------------|--------|----------------------------------------|--------------------------------------------------|
| `suggestions`    | GET    | /get-all-suggestions                   | Get every suggestion, newest first                |
| `suggestions`    | GET    | /get-suggestions-by-category/:category | Get suggestions filtered by one category          |
| `suggestions`    | POST   | /add-one-suggestion                    | Create a new suggestion                           |

---

### 🔹 GET `/get-all-suggestions`

**Description:** Returns every suggestion in the database, ordered by most recently created first.

**Example Request URL:**

```
GET /get-all-suggestions
```

**Example Response:**

```json
[
  {
    "id": 1,
    "title": "Add dark mode",
    "description": "It would be great to have a dark theme option for the app.",
    "category": "UI",
    "upvotes": 12,
    "created_at": "2026-08-18T22:58:06.244Z"
  },
  {
    "id": 2,
    "title": "Fix broken login on Safari",
    "description": "Login button doesn't respond on Safari 17.",
    "category": "Bug",
    "upvotes": 5,
    "created_at": "2026-08-18T22:58:06.244Z"
  }
]
```

---

### 🔹 GET `/get-suggestions-by-category/:category`

**Description:** Returns suggestions filtered to a single category, ordered by most recently created first. `:category` is matched case-insensitively against `UI`, `UX`, `Enhancement`, `Bug`, or `Feature`; anything else returns a 400.

**Example Request URL:**

```
GET /get-suggestions-by-category/Bug
```

**Example Response:**

```json
[
  {
    "id": 2,
    "title": "Fix broken login on Safari",
    "description": "Login button doesn't respond on Safari 17.",
    "category": "Bug",
    "upvotes": 5,
    "created_at": "2026-08-18T22:58:06.244Z"
  }
]
```

**Example Error Response** (invalid category, e.g. `/get-suggestions-by-category/Cars`):

```json
{ "error": "Invalid category." }
```

---

### 🔹 POST `/add-one-suggestion`

**Description:** Creates a new suggestion. `title` (max 100 characters) and `description` (max 500 characters) must be non-empty after trimming, and `category` must be one of `UI`, `UX`, `Enhancement`, `Bug`, or `Feature` (case-insensitive). `upvotes` defaults to `0` and `created_at` defaults to the current time — both are set by the server, not the client.

**Example Request URL:**

```
POST /add-one-suggestion
```

**Example Request Body:**

```json
{
  "title": "Add keyboard shortcuts",
  "description": "Power users would love shortcuts for common actions.",
  "category": "Feature"
}
```

**Example Response:**

```json
{
  "id": 3,
  "title": "Add keyboard shortcuts",
  "description": "Power users would love shortcuts for common actions.",
  "category": "Feature",
  "upvotes": 0,
  "created_at": "2026-08-18T22:58:06.244Z"
}
```

**Example Error Response** (missing/invalid fields):

```json
{ "error": "Title, description, and a valid category are required." }
```
