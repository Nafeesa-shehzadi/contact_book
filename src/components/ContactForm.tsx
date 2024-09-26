import { FC, ChangeEvent, useState, FormEventHandler } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Action, Contact } from "../types";

// Styled Components
const FormContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  width: "500px",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  backgroundColor: "#fff",
  height: "440px",
  marginBottom: 20,
});

const StyledForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  marginBottom: "20px",
});

const SubmitButton = styled(Button)({
  alignSelf: "flex-end",
  marginTop: "16px",
});

interface ContactFormProps {
  dispatch: React.Dispatch<Action>;
  dataToEdit: Contact | undefined;
  toggleModal: () => void;
}

const ContactForm: FC<ContactFormProps> = ({
  dispatch,
  dataToEdit,
  toggleModal,
}) => {
  console.log("ContactForm is rendering"); // Debugging log

  const [contact, setContact] = useState({
    firstName: dataToEdit?.firstName || "",
    lastName: dataToEdit?.lastName || "",
    phoneNumber: dataToEdit?.phoneNumber || "",
    address: dataToEdit?.address || "",
    email: dataToEdit?.email || "",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear the error for the changed field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
    };
    let isValid = true;

    // Simple validation rules
    if (!contact.firstName) {
      newErrors.firstName = "First Name is required.";
      isValid = false;
    } else if (/[\d\s]/.test(contact.firstName)) {
      // No digits or spaces allowed
      newErrors.firstName = "First Name cannot contain spaces or numbers.";
      isValid = false;
    }

    if (!contact.lastName) {
      newErrors.lastName = "Last Name is required.";
      isValid = false;
    } else if (/[\d\s]/.test(contact.lastName)) {
      // No digits or spaces allowed
      newErrors.lastName = "First Name cannot contain spaces or numbers.";
      isValid = false;
    }

    if (!contact.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required.";
      isValid = false;
    } else if (!/^[\d\s]+$/.test(contact.phoneNumber)) {
      // Only digits and spaces allowed
      newErrors.phoneNumber =
        "Phone Number can only contain numbers and spaces.";
      isValid = false;
    }
    if (!contact.email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(contact.email)) {
      // Simple email validation
      newErrors.email = "Email is not valid.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (!dataToEdit) {
        dispatch({
          type: "ADD_CONTACT",
          payload: {
            id: Date.now(),
            ...contact,
          },
        });
        setContact({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          address: "",
          email: "",
        });
      } else {
        dispatch({
          type: "UPDATE_CONTACT",
          payload: {
            id: dataToEdit.id,
            updates: {
              id: Date.now(),
              ...contact,
            },
          },
        });
        toggleModal();
      }
    }
  };

  return (
    <FormContainer>
      <Typography variant="h5" component="h3" gutterBottom>
        {dataToEdit ? "Update Contact" : "Add New Contact"}
      </Typography>
      <StyledForm onSubmit={handleOnSubmit}>
        <StyledTextField
          label="First Name"
          name="firstName"
          value={contact.firstName}
          onChange={handleOnChange}
          fullWidth
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
        <StyledTextField
          label="Last Name"
          name="lastName"
          value={contact.lastName}
          onChange={handleOnChange}
          fullWidth
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
        <StyledTextField
          label="Phone Number"
          name="phoneNumber"
          value={contact.phoneNumber}
          onChange={handleOnChange}
          fullWidth
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
          required
        />
        <StyledTextField
          label="Address"
          name="address"
          value={contact.address}
          onChange={handleOnChange}
          fullWidth
        />
        <StyledTextField
          label="Email"
          name="email"
          type="email"
          value={contact.email}
          onChange={handleOnChange}
          fullWidth
          error={!!errors.email}
          helperText={errors.email}
          required
        />
        <SubmitButton variant="contained" color="primary" type="submit">
          {dataToEdit ? "Update Contact" : "Add Contact"}
        </SubmitButton>
      </StyledForm>
    </FormContainer>
  );
};

export default ContactForm;
