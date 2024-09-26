import { Contact, Action, Update } from "../types";

export interface AppState {
  contacts: Contact[];
  filteredContacts: Contact[]; // New state for filtered contacts
}
export const initialState: AppState = {
  // Ensure this is exported
  contacts: [],
  filteredContacts: [], // Initialize as empty
};

export const contactsReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [...state.contacts, action.payload as Contact],
      };
    case "UPDATE_CONTACT":
      const { id, updates } = action.payload as Update;
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === id) {
            return {
              ...contact,
              ...updates,
            };
          }
          return contact;
        }),
      };
    case "DELETE_CONTACT": {
      const { id } = action.payload as Contact;
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== id
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    case "SEARCH": {
      const { searchTerm } = action.payload as { searchTerm: string };
      const filteredContacts = state.contacts.filter(
        (contact) =>
          contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return {
        ...state,
        filteredContacts, // Update filtered contacts
      };
    }
    case "CLEAR_SEARCH": {
      return {
        ...state,
        filteredContacts: [], // Clear filtered contacts
      };
    }
    default:
      return state;
  }
};
