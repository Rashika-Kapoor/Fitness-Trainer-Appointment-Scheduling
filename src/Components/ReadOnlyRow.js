import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.first_name}</td>
      <td>{contact.last_name}</td>
      <td>{contact.location}</td>
      <td>{contact.appointment_date}</td>
      <td>
        {contact.appointment_time.map((time, index) => (
          <span key={index}>{time} </span>
        ))}
      </td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
