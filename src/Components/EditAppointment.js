import React from "react";

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
  handleEditFormSubmit,
  handleAddTimeField,
}) => {
  
  return (
    
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a first name..."
          name="first_name"
          value={editFormData.first_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a last name..."
          name="last_name"
          value={editFormData.last_name}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Enter a location..."
          name="location"
          value={editFormData.location}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
      <input
          type="date"
          required="required"
          placeholder="DD-MM-YYYY"
          name="appointment_date"
          value={editFormData.appointment_date}
          onChange={handleEditFormChange}
        ></input>
      </td>
      {editFormData.appointment_time.map((time, index) => (
        <td key={index}>
          <input
            type="time"
            value={time}
            onChange={(event) => handleEditFormChange(event, index)} // Pass index to identify which appointment time is being edited
          />
        </td>
      ))}
      <td>
        
      </td>
      <td>
      <button type="button" onClick={handleAddTimeField}>
          Add Time
        </button>
        <button type="submit" onClick={handleEditFormSubmit}>Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditableRow;
