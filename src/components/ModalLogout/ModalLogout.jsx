import LogoutForm from "../LogoutForm/LogoutForm";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalLogout = ({ onCloseModal, isOpen }) => {
  return (
    <ModalWrapper modalIsOpen={isOpen} onCloseModal={onCloseModal}>
      <LogoutForm onCloseModal={onCloseModal} />
    </ModalWrapper>
  );
};

export default ModalLogout;
