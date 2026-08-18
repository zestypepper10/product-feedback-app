import SuggestionCard from "./SuggestionCard";

function SuggestionList({ suggestions }) {
  return (
    <ul className="suggestion-list">
      {suggestions.map((suggestion) => (
        <SuggestionCard key={suggestion.id} suggestion={suggestion} />
      ))}
    </ul>
  );
}

export default SuggestionList;
