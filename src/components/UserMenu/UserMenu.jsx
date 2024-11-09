import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { selectAuthUser } from "../../redux/auth/selectors";
// import { logoutUser } from "../../redux/auth/operations";
import scrollController from "../../services/noScroll";
import { closeByEsc } from "../../services/functions";
import css from "./UserMenu.module.css";
import sprite from "../../assets/sprite.svg";
import { logoutUser } from "../../redux/auth/operations";
import ModalLogout from "../ModalLogout/ModalLogout";

const UserMenu = () => {
  const dispatch = useDispatch();
  const userData = useSelector(selectAuthUser);
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function openLogInModal() {
    setIsLogInOpen(true);
    scrollController.disabledScroll();
  }
  function openMenu() {
    setIsOpen(true);
    scrollController.disabledScroll();
  }
  function closeLogInModal() {
    setIsLogInOpen(false);
    scrollController.enabledScroll();
  }
  function closeMenu() {
    setIsOpen(false);
    scrollController.enabledScroll();
  }

  useEffect(() => {
    closeByEsc(closeMenu);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className={css.container}>
        <p className={css.text}>
          Hello,&nbsp;<span className={css.name}>{userData.name}!</span>
        </p>
        <button className={css.button} onClick={openLogInModal} type="button">
          Logout
        </button>
      </div>
      {isLogInOpen && (
        <ModalLogout onCloseModal={closeLogInModal} isOpen={isLogInOpen} />
      )}
      <div className={css.containerMob}>
        <button className={css.buttonMob} onClick={openMenu} type="button">
          <svg className={css.iconLogOut} width="20" height="20">
            <use href={`${sprite}#icon-log-out`}></use>
          </svg>
        </button>

        {isOpen && <div className={css.backdrop} onClick={closeMenu}></div>}

        {isOpen && (
          <div className={css.logOutMobContainer}>
            <button
              type="button"
              className={css.btnLogOutMob}
              onClick={handleLogout}
            >
              <svg className={css.iconLogOutMob} width="20" height="20">
                <use href={`${sprite}#icon-log-out`}></use>
              </svg>
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
