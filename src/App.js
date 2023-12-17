//import logo from './logo.svg';
import React, { useState, Fragment } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Header from "./Components/Header";
import data from "./MOCK_DATA.json";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditAppointment";


const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    appointment_date: "",
    appointment_time: "",
  });

  const [editFormData, setEditFormData] = useState({
    first_name: "",
    last_name: "",
    location: "",
    appointment_date: "",
    appointment_time: [],
  });

 

  const [editContactId, setEditContactId] = useState(null);

  /* Adding an appointment */
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    
    if (fieldName === "appointment_time") {
      fieldValue = fieldValue.split(',').map(time => time.trim());
    }

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
    
  };

  const handleEditFormChange = (event, index) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    let fieldValue = event.target.value;

    setEditFormData(prevData => {
      const newData = { ...prevData };
  
      if (Array.isArray(newData[fieldName])) {
        newData[fieldName][index] = fieldValue;
      } else {
        newData[fieldName] = fieldValue;
      }
  
      return newData;
    });

    setEditFormData(prevData => {
      const updatedTime = [...prevData.appointment_time];
      updatedTime[index] = fieldValue;
  
      return {
        ...prevData,
        appointment_time: updatedTime,
      };
    });
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      first_name: addFormData.first_name,
      last_name: addFormData.last_name,
      location: addFormData.location,
      appointment_date: addFormData.appointment_date,
      appointment_time: addFormData.appointment_time,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);

    setAddFormData({
      first_name: "",
      last_name: "",
      location: "",
      appointment_date: "",
      appointment_time: "",
    });

    alert("Client added successfully");
  };

  const handleAddTimeField = () => {
    setEditFormData((prevData) => {
      return {
        ...prevData,
        appointment_time: [...prevData.appointment_time, ''], // Add another empty string for a new input field
      };
    });
  
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      first_name: editFormData.first_name,
      last_name: editFormData.last_name,
      location: editFormData.location,
      appointment_date: editFormData.appointment_date,
      appointment_time: editFormData.appointment_time,
    };

  const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);

    alert("Appointment edited successfully");
    
  };

  /*Editting Appointment*/

  const handleEditClick = (event, contact) => {
    
    
      event.preventDefault();
      setEditContactId(contact.id);

      const formValues = {
        first_name: contact.first_name,
        last_name: contact.last_name,
        location: contact.location,
        appointment_date: contact.appointment_date,
        appointment_time: contact.appointment_time,
      };
      setEditFormData(formValues);

  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (confirmation) {
      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === contactId);

      newContacts.splice(index, 1);

      setContacts(newContacts);
      alert("Appointment deleted successfully!");
    }
  };
  return (
    <>
      <Header />
      <div className="app-container">
        {/* Adding an appointment */}

        <form onSubmit={handleAddFormSubmit}>
          <input
            type="text"
            name="first_name"
            required="required"
            placeholder="Enter a First Name..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="last_name"
            required="required"
            placeholder="Enter an Last Name..."
            onChange={handleAddFormChange}
          />
          <input
            type="text"
            name="location"
            required="required"
            placeholder="Enter a location..."
            onChange={handleAddFormChange}
          />
          <input
            type="date"
            name="appointment_date"
            required="required"
            placeholder="Enter an appointment..."
            onChange={handleAddFormChange}
          />
          <input
            type="time"
            name="appointment_time"
            required="required"
            placeholder="Enter an appointment time..."
            onChange={handleAddFormChange}
          />
          <button type="submit">Add</button>
        </form>
        <form onSubmit={handleEditFormSubmit}>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Location</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <Fragment key={contact.id}>
                  {editContactId === contact.id ? (
                    <EditableRow
                      key={contact.id}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                      handleAddTimeField={handleAddTimeField}
                    />
                  ) : (
                    <ReadOnlyRow
                      key={contact.id}
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};

export default App;

