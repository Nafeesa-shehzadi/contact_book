import { Contact, Action, Update } from "../types";

export interface AppState {
  contacts: Contact[];
}

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
      const { id } = action.payload;
      const updatedContacts = state.contacts.filter(
        (contact) => contact.id !== id
      );
      return {
        ...state,
        contacts: updatedContacts,
      };
    }
    default:
      return state;
  }
};
