import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addSuggestion } from "../api/suggestions";
import iconNewFeedback from "../assets/icons/icon-new-feedback.svg";
import iconArrowLeft from "../assets/icons/icon-arrow-left.svg";

const CATEGORIES = ["UI", "UX", "Enhancement", "Bug", "Feature"];
const TITLE_MAX = 100;
const DESCRIPTION_MAX = 500;

function AddFeedbackPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validate() {
    const nextErrors = {};

    if (!title.trim()) {
      nextErrors.title = "Can't be empty";
    } else if (title.trim().length > TITLE_MAX) {
      nextErrors.title = `Must be ${TITLE_MAX} characters or fewer`;
    }

    if (!category) {
      nextErrors.category = "Please select a category";
    }

    if (!description.trim()) {
      nextErrors.description = "Can't be empty";
    } else if (description.trim().length > DESCRIPTION_MAX) {
      nextErrors.description = `Must be ${DESCRIPTION_MAX} characters or fewer`;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setSubmitting(true);
    try {
      await addSuggestion({
        title: title.trim(),
        description: description.trim(),
        category,
      });
      navigate("/");
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="add-feedback-page">
      <Link to="/" className="back-link">
        <img src={iconArrowLeft} alt="" aria-hidden="true" />
        Go Back
      </Link>

      <form className="feedback-form" onSubmit={handleSubmit} noValidate>
        <img
          src={iconNewFeedback}
          alt=""
          aria-hidden="true"
          className="feedback-form__icon"
        />
        <h1>Create New Feedback</h1>

        <label className="field" htmlFor="title">
          <span className="field__label">Title</span>
          <span className="field__hint">Add a short, descriptive headline</span>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? "title-error" : undefined}
          />
          {errors.title && (
            <span id="title-error" className="field__error" role="alert">
              {errors.title}
            </span>
          )}
        </label>

        <label className="field" htmlFor="category">
          <span className="field__label">Category</span>
          <span className="field__hint">
            Choose a category for your feedback
          </span>
          <select
            id="category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? "category-error" : undefined}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && (
            <span id="category-error" className="field__error" role="alert">
              {errors.category}
            </span>
          )}
        </label>

        <label className="field" htmlFor="description">
          <span className="field__label">Description</span>
          <span className="field__hint">
            Include any specific comments on what should be improved
          </span>
          <textarea
            id="description"
            rows={4}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "description-error" : undefined
            }
          />
          {errors.description && (
            <span id="description-error" className="field__error" role="alert">
              {errors.description}
            </span>
          )}
        </label>

        {submitError && (
          <p className="status-message status-message--error" role="alert">
            {submitError}
          </p>
        )}

        <div className="feedback-form__actions">
          <Link to="/" className="button button--secondary">
            Cancel
          </Link>
          <button
            type="submit"
            className="button button--primary"
            disabled={submitting}
          >
            {submitting ? "Adding Feedback…" : "Add Feedback"}
          </button>
        </div>
      </form>
    </main>
  );
}

export default AddFeedbackPage;
