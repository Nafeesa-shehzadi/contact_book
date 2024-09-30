import React, { useState } from "react";
import { styled } from "@mui/system";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ContactsRoundedIcon from "@mui/icons-material/ContactsRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import EditModal from "./EditModal";
const HomePageContainer = styled("div")({
  minHeight: "100vh",
  maxHeight: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: "url(./download.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
});
const Styledtypo = styled(Typography)({
  color: "HighlightText",
  fontFamily: "sans-serif",
  margin: "20px",
  fontWeight: "bold",
});
const StyledTextField = styled(TextField)({
  marginBottom: "20px",
  width: "600px",
  borderRadius: "50px",
  backgroundColor: "#fff",
});

const StyledButton = styled(Button)({
  margin: "10px",
  width: "200px",
  borderRadius: "50px",
  color: "#fff",
  display: "flex",
  flexDirection: "column",
  textTransform: "none",
});

const Home: React.FC<any> = ({
  dispatch,
  dataToEdit,
  toggleModal,
  state,
  handleEdit,
  showModal,
}) => {
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [showContactForm, setShowContactForm] = useState(false);
  const [showContactList, setShowContactList] = useState(false);
  const handleAddContactClick = () => {
    console.log("Button clicked: Showing Contact Form");
    setSearchTerm(""); // Clear search term when adding a contact
    dispatch({ type: "CLEAR_SEARCH" }); // Clear any existing search
    setShowContactForm(true);
    setShowContactList(false); // Hide contact list
  };

  const handleContactListClick = () => {
    setSearchTerm(""); // Clear search term when showing contact list
    dispatch({ type: "CLEAR_SEARCH" }); // Clear any existing search
    setShowContactForm(false);
    setShowContactList(true); // Hide contact list
  };

  const handleSearch = () => {
    if (searchTerm) {
      dispatch({ type: "SEARCH", payload: { searchTerm } }); // Dispatch search action
      setShowContactForm(false); // Hide contact form if showing
      setShowContactList(true); // Show contact list if not showing
    } else {
      dispatch({ type: "CLEAR_SEARCH" }); // Clear if search term is empty
      setShowContactForm(false); // Show contact form if showing
      setShowContactList(false); // Hide contact list if showing
    }
  };

  return (
    <HomePageContainer>
      <Styledtypo variant="h4">PhoneBook App☎️</Styledtypo>
      <StyledTextField
        variant="outlined"
        value={searchTerm} // Bind search term to input
        onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
        placeholder="search here..."
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={handleSearch}
                  style={{ cursor: "pointer" }}
                />{" "}
                {/* Trigger search on click */}
              </InputAdornment>
            ),
          },
        }}
      />

      <Box display="flex" flexDirection={"column"}>
        <StyledButton
          variant="contained"
          color="success"
          onClick={handleAddContactClick}
        >
          <ContactsRoundedIcon />
          Add to Contacts
        </StyledButton>

        <StyledButton
          variant="contained"
          color="success"
          onClick={handleContactListClick}
        >
          <CallRoundedIcon />
          Contact List
        </StyledButton>
      </Box>
      {showContactList && state.contacts.length === 0 && (
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
          }}
        >
          Contact List is Empty
        </Typography>
      )}
      {/* Conditional rendering for ContactForm */}
      {showContactForm &&
        state.filteredContacts.length === 0 &&
        searchTerm === "" && (
          <ContactForm
            dispatch={dispatch}
            dataToEdit={dataToEdit}
            toggleModal={toggleModal}
          />
        )}

      {/* Conditional rendering for ContactList based on search results */}
      {state.filteredContacts.length > 0 && searchTerm !== "" && (
        <ContactList
          dispatch={dispatch}
          contacts={state.filteredContacts} // Pass filtered contacts to ContactList
          handleEdit={handleEdit}
        />
      )}
      {state.filteredContacts.length === 0 && searchTerm !== "" && (
        <Typography
          variant="h4"
          sx={{
            color: "#fff",
          }}
        >
          Contact not found
        </Typography>
      )}

      {/* Show complete contact list only when Contact List button is clicked and search is not active */}
      {showContactList && state.contacts.length > 0 && searchTerm === "" && (
        <ContactList
          dispatch={dispatch}
          contacts={state.contacts} // Pass all contacts to ContactList
          handleEdit={handleEdit}
        />
      )}
      <EditModal
        showModal={showModal}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
        dispatch={dispatch}
      />
    </HomePageContainer>
  );
};

export default Home;
