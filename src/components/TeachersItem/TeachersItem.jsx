import { useState } from "react";
import css from "./TeachersItem.module.css";
// import ReadMore from "../ReadMore/ReadMore";
// import Modal from "../Modal/Modal";
// import BookingModal from "../BookingModal/BookingModal";
import { useDispatch } from "react-redux";
// import { addFavorite, deleteFavorite } from "../../redux/favoriteSlice";
// import { useAuth, useFavorite } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { addFavorite, deleteFavorite } from "../../redux/favorites/slice";
import { useAuth, useFavorite } from "../hooks/useAuth";
import BookingModal from "../BookingModal/BookingModal";
import bookOpen from "../../assets/book-open.svg";
import Heartsvg from "../../assets/heart.svg";
import Starsvg from "../../assets/star.svg";
const TeachersItem = ({ item }) => {
  const { isAuth } = useAuth();

  const dispatch = useDispatch();
  //   const [expendedContent, setExpendedContent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const { favorite } = useFavorite();

  const inFavorite = favorite.some((fav) => fav.id === item.id);

  const addToFavorite = () => {
    if (inFavorite === true && isAuth === true) {
      dispatch(deleteFavorite(item.id));
      toast.success("Deleted successfully");
    }
    if (inFavorite === false && isAuth === true) {
      dispatch(addFavorite(item));
      toast.success("Add successfully");
    }
    if (isAuth === false) {
      toast.warning("Only for registered users!");
    }
  };

  const onClose = () => {
    setIsVisibleModal(false);
  };
  return (
    <>
      <div className={css.teacherItem}>
        <div className={css.imgWrapper}>
          <img className={css.image} src={item.avatar_url} alt={item.name} />
          <img
            onClick={addToFavorite}
            className={
              inFavorite && isAuth
                ? `${css.heartMob} ${css.favorite}`
                : css.heartMob
            }
            src={Heartsvg}
            alt="heart"
            loading="lazy"
          />
        </div>
        <div>
          <div className={css.textWrapper}>
            <p className={css.languages}>Languages</p>
            <ul className={css.list}>
              <li className={css.item}>
                <img
                  src={bookOpen}
                  alt="book"
                  width="16px"
                  height="16px"
                  loading="lazy"
                />
                Lessons online
              </li>
              <li className={css.item}>Lessons done: {item.lessons_done}</li>
              <li className={css.item}>
                <img
                  src={Starsvg}
                  alt="star"
                  width="16px"
                  height="16px"
                  loading="lazy"
                />
                Rating: {item.rating}
              </li>
              <li className={css.item}>
                Price / 1 hour:
                <span className={css.price}>{item.price_per_hour}$</span>
              </li>
            </ul>
            <img
              onClick={addToFavorite}
              className={
                inFavorite && isAuth
                  ? `${css.heart} ${css.favorite}`
                  : css.heart
              }
              src={Heartsvg}
              alt="heart"
              loading="lazy"
            />
          </div>
          <h2 className={css.name}>
            {item.name} {item.surname}
          </h2>
          <div className={css.optionsWrapper}>
            <div className={css.languageWrapper}>
              <span className={css.languages}>Speaks: </span>
              <ul className={css.languageList}>
                {item.languages.map((language, index) => (
                  <li className={css.languageItem} key={language}>
                    {language}
                    {index < item.languages.length - 1 && ", "}
                  </li>
                ))}
              </ul>
            </div>
            <div className={css.languageWrapper}>
              <span className={css.languages}>Lesson Info: </span>
              <span className={css.languageItem}>{item.lesson_info}</span>
            </div>
            <div className={css.languageWrapper}>
              <span className={css.languages}>Conditions: </span>
              <span className={css.languageItem}>{item.conditions}</span>
            </div>
          </div>

          {/* {expendedContent ? (
            <ReadMore item={item} setIsVisibleModal={setIsVisibleModal} />
          ) : (
            <>
              <button
                onClick={() => setExpendedContent(true)}
                className={css.button}
              >
                Read more
              </button>
              <ul className={css.btnList}>
                {item.levels.map((level, index) => (
                  <li className={css.levelItem} key={index}>
                    {level}
                  </li>
                ))}
              </ul>
            </>
          )} */}
        </div>
      </div>
      {isVisibleModal && (
        <ModalWrapper onClose={onClose}>
          <BookingModal item={item} onClose={onClose} />
        </ModalWrapper>
      )}
    </>
  );
};

export default TeachersItem;
