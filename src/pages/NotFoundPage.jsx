import { useNavigate } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className={css.section}>
      <div className="container">
        <h2 className={css.title}>404 - Page Not Found</h2>
        <p className={css.text}>
          Sorry, the page you are looking for does not exist.
        </p>
        <button onClick={() => navigate("/")} className={css.link}>
          Back to home page
        </button>
      </div>
    </section>
  );
};

export default NotFoundPage;
