export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
}

export interface Update {
  id: number;
  updates?: Contact;
}
export interface Search {
  searchTerm: string; // Include the search term
}

export interface Action {
  type: "ADD_CONTACT" | "UPDATE_CONTACT" | "DELETE_CONTACT" | "SEARCH";
  payload: Contact | Update | Search;
}
