import { Link } from "react-router-dom";

import img1x from "../../assets/girl-img-1x.png";
import img2x from "../../assets/girl-img-2x.png";
import imgMob1x from "../../assets/girl-img-mob-1x.png";
import imgMob2x from "../../assets/girl-img-mob-2x.png";
import css from "./HomeContent.module.css";

const HomeContent = () => {
  return (
    <div className={css.homeContainer}>
      <div className={css.contentContainer}>
        <div className={css.textContainer}>
          <h1 className={css.title}>
            Unlock your potential with the best{" "}
            <span className={css.span}>language</span> tutors
          </h1>
          <p className={css.text}>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <Link to="/teachers">
            <button type="button" className={css.btn}>
              Get started
            </button>
          </Link>
        </div>
        <div className={css.imgContainer}>
          <div className={css.container}>
            <picture>
              <source
                media="(min-width: 768px)"
                srcSet={`${img1x}, ${img2x} 2x`}
              />
              <source
                media="(max-width: 767px)"
                srcSet={`${imgMob1x}, ${imgMob2x} 2x`}
              />
              <img src={img1x} alt="girl" className={css.girlImg} />
            </picture>
            <div className={css.iMacContainer}>
              <div className={css.iMacIcon}></div>
            </div>
          </div>
        </div>
      </div>
      <div className={css.statisticContainer}>
        <ul className={css.statisticList}>
          <li className={css.statisticItem}>
            <h3 className={css.statisticTitle}>32,000 +</h3>
            <p className={css.statisticText}>Experienced tutors</p>
          </li>
          <li className={css.statisticItem}>
            <h3 className={css.statisticTitle}>300,000 +</h3>
            <p className={css.statisticText}>5-star tutor reviews</p>
          </li>
          <li className={css.statisticItem}>
            <h3 className={css.statisticTitle}>120 +</h3>
            <p className={css.statisticText}>Subjects taught</p>
          </li>
          <li className={css.statisticItem}>
            <h3 className={css.statisticTitle}>200 +</h3>
            <p className={css.statisticText}>Tutor nationalities</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomeContent;
