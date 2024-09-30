import Modal from "react-modal";
import css from "./ModalWrapper.module.css";
import sprite from "../../assets/sprite.svg";

Modal.setAppElement("#root");

const ModalWrapper = ({
  children,
  modalIsOpen,
  onCloseModal,
  top = "50%",
  transform = "translate(-50%, -50%)",
}) => {
  const customStyles = {
    content: {
      top: top,
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: transform,
      padding: "0",
      borderRadius: "15px",
    },
    overlay: {
      backgroundColor: "rgba(47, 47, 47, 0.3)",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      contentLabel="Modal Details"
    >
      <div className={css.modalContent}>
        <button className={css.closeBtn} type="button" onClick={onCloseModal}>
          <svg className={css.closeIcon} width="20" height="20">
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
        <div className={css.scrollContainer}>{children}</div>
      </div>
    </Modal>
  );
};

export default ModalWrapper;
