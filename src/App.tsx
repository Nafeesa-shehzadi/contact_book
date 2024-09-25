import HeaderSection from "./components/Header";
import ContactForm from "./components/ContactForm";
import { AppState, contactsReducer } from "./reducers/Contactreducer";
import { FC, useEffect, useReducer, useState } from "react";
import ContactList from "./components/ContactList";
import EditModal from "./components/EditModal";
import { Contact } from "./types";
const initialState: AppState = {
  contacts: [],
};
const App: FC = () => {
  const [state, dispatch] = useReducer(contactsReducer, initialState);
  const [showModal, setShowModal] = useState(false);
  const [dataToEdit, setDataToEdit] = useState<Contact | undefined>(undefined);
  useEffect(() => {
    if (!showModal) {
      setDataToEdit(undefined);
    }
  }, [showModal]);
  const toggleModal = () => {
    setShowModal((show) => !show);
  };
  const handleEdit = (id: number) => {
    console.log("handleEdit prop:", handleEdit);

    setDataToEdit(state.contacts.find((contact) => contact.id === id));
    toggleModal();
  };
  return (
    <>
      <HeaderSection />
      <div style={{ display: "flex" }}>
        <ContactForm
          dispatch={dispatch}
          dataToEdit={dataToEdit}
          toggleModal={toggleModal}
        />
        <hr />
        {state.contacts.length > 0 && (
          <ContactList
            contacts={state.contacts}
            handleEdit={handleEdit}
            dispatch={dispatch}
          />
        )}
      </div>
      <EditModal
        showModal={showModal}
        dataToEdit={dataToEdit}
        toggleModal={toggleModal}
        dispatch={dispatch}
      />
    </>
  );
};

export default App;
