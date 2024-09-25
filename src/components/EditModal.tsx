import React, { FC } from "react";
import { Modal, Box, Typography } from "@mui/material"; // Import MUI components
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
const StyledBox = styled(Box)({
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#fff",
});

const EditModal: FC<EditModalProps> = ({
  toggleModal,
  dataToEdit,
  showModal,
  dispatch,
}) => {
  return (
    <Modal open={showModal} onClose={toggleModal}>
      <StyledBox>
        <Typography variant="h6" component="h2" gutterBottom>
          Update Contact Info
        </Typography>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
      </StyledBox>
    </Modal>
  );
};

export default EditModal;
