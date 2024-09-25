import { FC } from "react";
import { Action, Contact } from "../types";
import EditIcon from "@mui/icons-material/Edit"; // Import MUI Edit Icon
import DeleteIcon from "@mui/icons-material/Delete"; // Import MUI Delete Icon
import { TableRow, TableCell } from "@mui/material"; // Import MUI Table components
import { styled } from "@mui/material/styles";

// Styled Table Cell (optional)
const StyledTableCell = styled(TableCell)({
  padding: "16px", // Adjust padding as needed
  textAlign: "center", // Center align text
});
interface ExtraProps {
  handleEdit: (id: number) => void;
  dispatch: React.Dispatch<Action>;
}
const ContactItem: FC<Contact & ExtraProps> = ({
  id,
  firstName,
  lastName,
  phoneNumber,
  address,
  email,
  handleEdit,
  dispatch,
}) => {
  return (
    <TableRow>
      <StyledTableCell>{firstName}</StyledTableCell>
      <StyledTableCell>{lastName}</StyledTableCell>
      <StyledTableCell>{phoneNumber}</StyledTableCell>
      <StyledTableCell>{email}</StyledTableCell>
      <StyledTableCell>{address}</StyledTableCell>
      <StyledTableCell>
        <EditIcon
          onClick={() => handleEdit(id)}
          style={{ color: "blue", cursor: "pointer" }}
        />
      </StyledTableCell>
      <StyledTableCell>
        <DeleteIcon
          onClick={() => {
            console.log(`Delete clicked for: ${firstName} ${lastName}`);
            const confirmDelete = window.confirm(
              `Are you sure you want to delete contact for user ${firstName} ${lastName}?`
            );
            if (confirmDelete) {
              console.log("Dispatching delete action for ID:", id); // Log the ID

              dispatch({
                type: "DELETE_CONTACT",
                payload: { id },
              });
            }
          }}
          style={{ color: "red", cursor: "pointer" }}
        />
      </StyledTableCell>
    </TableRow>
  );
};

export default ContactItem;
