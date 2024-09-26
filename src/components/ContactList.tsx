import { FC } from "react";
import { Action, Contact } from "../types";
import { styled } from "@mui/material/styles";
import ContactItem from "./ContactItem";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

// Styled Components
const ContactsContainer = styled("div")({
  padding: "20px",
});

const StyledTableContainer = styled(Paper)({
  marginTop: "20px",
});

const ContactsTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: "bold",
  marginBottom: "16px",
  color: "#fff",
});

const StyledTableCell = styled(TableCell)({
  fontWeight: "bold",
  backgroundColor: "#f5f5f5",
  textAlign: "center", // Center align text
});

interface ContactListProps {
  contacts: Contact[];
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}
const ContactList: FC<ContactListProps> = ({
  contacts,
  handleEdit,
  dispatch,
}) => {
  console.log("ContactList props:", { contacts, handleEdit, dispatch });
  return (
    <ContactsContainer>
      <ContactsTitle variant="h5">List of Contacts</ContactsTitle>
      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Phone</StyledTableCell>
              <StyledTableCell>Email Address</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
              <StyledTableCell>Delete</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact) => (
              <ContactItem
                key={contact.id}
                {...contact}
                handleEdit={handleEdit} // Ensure this is the correct function
                dispatch={dispatch}
              />
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </ContactsContainer>
  );
};

export default ContactList;
