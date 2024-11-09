import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleClick }) => {
  return (
    <button className={css.button} type="button" onClick={() => handleClick()}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
