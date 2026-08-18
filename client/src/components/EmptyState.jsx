import { Link } from "react-router-dom";
import illustrationEmpty from "../assets/suggestions/illustration-empty.svg";

function EmptyState() {
  return (
    <div className="empty-state">
      <img
        src={illustrationEmpty}
        alt=""
        className="empty-state__illustration"
      />
      <h2>There is no feedback yet.</h2>
      <p>
        Got a suggestion? Found a bug that needs to be squashed? We love
        hearing about new ideas to improve our app.
      </p>
      <Link to="/new" className="button button--primary">
        + Add Feedback
      </Link>
    </div>
  );
}

export default EmptyState;
