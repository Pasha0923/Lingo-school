import { useDispatch, useSelector } from "react-redux";

import css from "./LogoutForm.module.css";
import { logoutUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";
import { selectFavoriteTeachers } from "../../redux/favorites/selectors";
import { clearFavorites } from "../../redux/favorites/slice";

const LogoutForm = ({ onCloseModal }) => {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoriteTeachers);

  const handleLogout = () => {
    localStorage.removeItem("favoriteItems");
    dispatch(clearFavorites());
    dispatch(logoutUser())
      .unwrap()
      .then(() => {
        localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));

        toast.success("You have successfully logged out");

        onCloseModal();
      })
      .catch((error) => {
        toast.error(`Logout failed: ${error}`);
      });
  };
  return (
    <div className={css.modalContentWrapper}>
      <h2 className={css.modalTitle}>Log out</h2>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.modalBtnWrapper}>
        <button className={css.modalBtn} onClick={handleLogout}>
          Log out
        </button>
        <button className={css.modalBtnCancel} onClick={onCloseModal}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutForm;
