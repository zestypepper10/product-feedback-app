function SuggestionCard({ suggestion }) {
  const { title, description, category, upvotes } = suggestion;

  return (
    <li className="suggestion-card">
      <div className="suggestion-card__upvotes">
        <span className="suggestion-card__upvotes-count">{upvotes}</span>
        <span className="suggestion-card__upvotes-label">Upvotes</span>
      </div>
      <div className="suggestion-card__content">
        <h2 className="suggestion-card__title">{title}</h2>
        <p className="suggestion-card__description">{description}</p>
        <span className="suggestion-card__category">{category}</span>
      </div>
    </li>
  );
}

export default SuggestionCard;
