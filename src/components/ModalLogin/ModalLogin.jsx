import FormLogin from "../FormLogin/FormLogin";
import ModalWrapper from "../ModalWrapper/ModalWrapper";

const ModalLogin = ({ onCloseModal, isOpen }) => {
  return (
    <ModalWrapper modalIsOpen={isOpen} onCloseModal={onCloseModal}>
      <FormLogin onCloseModal={onCloseModal} />
    </ModalWrapper>
  );
};

export default ModalLogin;
