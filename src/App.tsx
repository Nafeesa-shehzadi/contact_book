import { contactsReducer, initialState } from "./reducers/Contactreducer";
import { FC, useEffect, useReducer, useState } from "react";
import { Contact } from "./types";
import Home from "./components/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

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
    setShowModal((prev) => !prev);
  };

  const handleEdit = (id: number) => {
    const contact = state.contacts.find((contact) => contact.id === id);
    if (contact) {
      setDataToEdit(contact);
      toggleModal();
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              dispatch={dispatch}
              dataToEdit={dataToEdit}
              toggleModal={toggleModal}
              showModal={showModal}
              state={state}
              setDataToEdit={setDataToEdit}
              handleEdit={handleEdit}
            />
          }
        />
        {/* Redirect to Home if no route matches */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
