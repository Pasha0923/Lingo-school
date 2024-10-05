import css from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={css.logoContainer}>
      <div className={css.circleContainer}></div>
      <p className={css.logoText}>LearnLingo</p>
    </div>
  );
};

export default Logo;
