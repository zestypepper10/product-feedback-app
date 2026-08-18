const BASE = "/api";

async function handleResponse(res) {
  if (!res.ok) {
    let message = "Something went wrong. Please try again.";
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {
      // response body wasn't JSON
    }
    throw new Error(message);
  }
  return res.json();
}

export function getAllSuggestions() {
  return fetch(`${BASE}/get-all-suggestions`).then(handleResponse);
}

export function getSuggestionsByCategory(category) {
  return fetch(
    `${BASE}/get-suggestions-by-category/${encodeURIComponent(category)}`
  ).then(handleResponse);
}

export function addSuggestion({ title, description, category }) {
  return fetch(`${BASE}/add-one-suggestion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, category }),
  }).then(handleResponse);
}
