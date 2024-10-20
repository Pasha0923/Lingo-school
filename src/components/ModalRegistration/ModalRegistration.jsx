import ModalWrapper from "../ModalWrapper/ModalWrapper";
import FormRegistration from "../FormRegistration/FormRegistration";

const ModalRegistration = ({ onCloseModal, isOpen }) => {
  return (
    <ModalWrapper modalIsOpen={isOpen} onCloseModal={onCloseModal}>
      <FormRegistration onCloseModal={onCloseModal} />
    </ModalWrapper>
  );
};

export default ModalRegistration;
