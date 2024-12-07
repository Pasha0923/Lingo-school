import css from "./TeachersItem.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { addFavorite, deleteFavorite } from "../../redux/favorites/slice";

import BookingModal from "../BookingModal/BookingModal";
import bookOpen from "../../assets/book-open.svg";

import Starsvg from "../../assets/star.svg";
import ReadMore from "../ReadMore/ReadMore";
import sprite from "../../assets/sprite.svg";

import { selectFavoriteTeachers } from "../../redux/favorites/selectors";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

import defaultImage from "../../assets/avatar.webp";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";

const TeachersItem = ({ item }) => {
  const dispatch = useDispatch();

  const [expendedContent, setExpendedContent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const favorite = useSelector(selectFavoriteTeachers);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);

  const inFavorite = favorite.some((fav) => fav?.id === item.id);

  const onClose = () => {
    setIsVisibleModal(false);
  };

  const toogleFavorite = () => {
    if (!isLoggedIn) {
      toast.warning("You need to log in to manage favorites.");
      return;
    }
    if (inFavorite === true) {
      dispatch(deleteFavorite(item.id));

      toast.success("Deleted successfully");
    } else if (inFavorite === false) {
      dispatch(addFavorite(item));
      toast.success("Add successfully");
    }
  };

  const updatedReviews = item.reviews.map((review) => ({
    ...review,
    reviewer_avatar: review.reviewer_avatar || defaultImage,
  }));
  return (
    <>
      <div className={css.teacherItem}>
        <div className={css.imgWrapper}>
          <img className={css.image} src={item.avatar_url} alt={item.name} />
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

            <button className={css.heartBtn} onClick={toogleFavorite}>
              <svg
                className={inFavorite ? css.favoritHeatIcon : css.iconHeart}
                width="26"
                height="26"
              >
                <use href={`${sprite}#icon-heart`}></use>
              </svg>
            </button>
            <Toaster />
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
          {/* Readmore + уровни A1 , A2, B1, B2 по фильтрам */}
          {expendedContent ? (
            <ReadMore
              item={{ ...item, reviews: updatedReviews }}
              setIsVisibleModal={setIsVisibleModal}
            />
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
          )}
        </div>
      </div>

      {isVisibleModal && (
        <ModalWrapper modalIsOpen={isVisibleModal} onCloseModal={onClose}>
          <BookingModal item={item} onClose={onClose} />
        </ModalWrapper>
      )}
    </>
  );
};

export default TeachersItem;
