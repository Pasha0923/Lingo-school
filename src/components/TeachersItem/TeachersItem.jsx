import { useState } from "react";
import css from "./TeachersItem.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { Toaster } from "react-hot-toast";
// import ReadMore from "../ReadMore/ReadMore";
// import Modal from "../Modal/Modal";
// import BookingModal from "../BookingModal/BookingModal";
import { useDispatch, useSelector } from "react-redux";
// import { addFavorite, deleteFavorite } from "../../redux/favoriteSlice";
// import { useAuth, useFavorite } from "../../hooks/useAuth";

import ModalWrapper from "../ModalWrapper/ModalWrapper";
import { addFavorite, deleteFavorite } from "../../redux/favorites/slice";
// import { useAuth } from "../hooks/useAuth";
import BookingModal from "../BookingModal/BookingModal";
import bookOpen from "../../assets/book-open.svg";
// import Heartsvg from "../../assets/heart.svg";
import Starsvg from "../../assets/star.svg";
import ReadMore from "../ReadMore/ReadMore";
import sprite from "../../assets/sprite.svg";
// import { useEffect } from "react";
import { selectAuthIsLoggedIn } from "../../redux/auth/selectors";
import { selectFavoriteTeachers } from "../../redux/favorites/selectors";
import { Toaster } from "react-hot-toast";
// toast.configure();
const TeachersItem = ({ active, item }) => {
  // const { isAuth } = useAuth();

  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(active);
  const [expendedContent, setExpendedContent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const isLoggedIn = useSelector(selectAuthIsLoggedIn);
  const favorites = useSelector(selectFavoriteTeachers);
  // const { favorite } = useFavorite();

  const inFavorite = favorites.some((fav) => fav.id === item.id);

  // const addToFavorite = () => {
  //   if (!isAuth) {
  //     toast.warning("Only for registered users!");
  //     return;
  //   }
  //   if (inFavorite === true && isAuth === true) {
  //     dispatch(deleteFavorite(item.id));
  //     toast.success("Deleted successfully");
  //   }
  //   if (inFavorite === false && isAuth === true) {
  //     dispatch(addFavorite(item));
  //     toast.success("Add successfully");
  //   }
  // };

  const onClose = () => {
    setIsVisibleModal(false);
  };
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     setIsActive(inFavorite);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [inFavorite, isLoggedIn]);

  function handleClick(event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы
    if (!isLoggedIn) {
      toast.error("Please log in", {
        style: {
          backgroundColor: "var(--main-color)",
          color: "#fff",
          padding: "16px",
          fontSize: "18px",
        },
      });
      return;
    }
    if (isLoggedIn) {
      if (inFavorite) {
        dispatch(deleteFavorite(item.id));
        toast.success("Deleted successfully");
        setIsActive(false);
      } else {
        dispatch(addFavorite(item));
        toast.success("Add successfully");
        setIsActive(true);
      }
    }
  }

  return (
    <>
      <div className={css.teacherItem}>
        <div className={css.imgWrapper}>
          <img className={css.image} src={item.avatar_url} alt={item.name} />
          {/* <img
            onClick={handleClick}
            className={
              inFavorite && isAuth
                ? `${css.heartMob} ${css.favorite}`
                : css.heartMob
            }
            src={Heartsvg}
            alt="heart"
            loading="lazy"
          /> */}
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
            {/* <img
              onClick={addToFavorite}
              className={
                inFavorite && isAuth
                  ? `${css.heart} ${css.favorite}`
                  : css.heart
              }
              src={Heartsvg}
              alt="heart"
              loading="lazy"
            /> */}
            <button className={css.heartBtn} onClick={handleClick}>
              <svg
                className={isActive ? css.favoritHeatIcon : css.iconHeart}
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
          )}
        </div>
      </div>
      {/* <ToastContainer /> */}
      {/* Добавьте этот компонент для отображения уведомлений */}
      {isVisibleModal && (
        <ModalWrapper onClose={onClose}>
          <BookingModal item={item} onClose={onClose} />
        </ModalWrapper>
      )}
    </>
  );
};

export default TeachersItem;
