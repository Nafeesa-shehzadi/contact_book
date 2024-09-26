import React, { FC } from "react";
import { Modal } from "@mui/material"; // Import MUI components
import { styled } from "@mui/material/styles";
import { Contact, Action } from "../types";
import ContactForm from "./ContactForm";

interface EditModalProps {
  showModal: boolean;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
  dispatch: React.Dispatch<Action>;
}

// Styled Box for the Modal content
const StyledModal = styled(Modal)({
  marginTop: "20px",
  borderRadius: "10px",
  width: "20%",
});

const EditModal: FC<EditModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch,
}) => {
  return (
    <StyledModal open={showModal} onClose={toggleModal}>
      <ContactForm
        dispatch={dispatch}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
      />
    </StyledModal>
  );
};

export default EditModal;
