import { useEffect, useState } from "react";
import Header from "../components/Header";
import CategoryFilter from "../components/CategoryFilter";
import SuggestionList from "../components/SuggestionList";
import EmptyState from "../components/EmptyState";
import {
  getAllSuggestions,
  getSuggestionsByCategory,
} from "../api/suggestions";

function HomePage() {
  const [category, setCategory] = useState("All");
  const [suggestions, setSuggestions] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setStatus("loading");

    const request =
      category === "All"
        ? getAllSuggestions()
        : getSuggestionsByCategory(category);

    request
      .then((data) => {
        if (ignore) return;
        setSuggestions(data);
        setStatus("success");
      })
      .catch((err) => {
        if (ignore) return;
        setError(err.message);
        setStatus("error");
      });

    return () => {
      ignore = true;
    };
  }, [category]);

  return (
    <main className="home-page">
      <Header />
      <CategoryFilter selected={category} onSelect={setCategory} />

      {status === "loading" && (
        <p className="status-message">Loading suggestions…</p>
      )}
      {status === "error" && (
        <p className="status-message status-message--error">{error}</p>
      )}
      {status === "success" && suggestions.length === 0 && <EmptyState />}
      {status === "success" && suggestions.length > 0 && (
        <SuggestionList suggestions={suggestions} />
      )}
    </main>
  );
}

export default HomePage;
