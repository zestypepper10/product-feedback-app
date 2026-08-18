const CATEGORIES = ["All", "UI", "UX", "Enhancement", "Bug", "Feature"];

function CategoryFilter({ selected, onSelect }) {
  return (
    <nav className="category-filter" aria-label="Filter suggestions by category">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={
            category === selected
              ? "category-filter__button category-filter__button--active"
              : "category-filter__button"
          }
          onClick={() => onSelect(category)}
          aria-pressed={category === selected}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryFilter;
