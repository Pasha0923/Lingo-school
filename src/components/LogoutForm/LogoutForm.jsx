import { useDispatch } from "react-redux";

import css from "./LogoutForm.module.css";
import { logoutUser } from "../../redux/auth/operations";
import { toast } from "react-toastify";

const LogoutForm = ({ onCloseModal }) => {
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(logoutUser(data));
    toast.success("You have successfully logout"); // Добавляем нотификашку
    onCloseModal();
  };

  return (
    <div className={css.modalContentWrapper}>
      <h2 className={css.modalTitle}>Log out</h2>
      <p className={css.modalText}>Do you really want to leave?</p>
      <div className={css.modalBtnWrapper}>
        <button className={css.modalBtn} onClick={onSubmit}>
          Log out
        </button>
        <button
          className={css.modalBtnCancel}
          onClick={onCloseModal} // Добавляем обработчик клика для Cancel
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutForm;
