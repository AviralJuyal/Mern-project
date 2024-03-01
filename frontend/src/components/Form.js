import React, { useState } from "react";

const Form = ({ handleSubmit }) => {
  const [note, setNote] = useState("");

  // Function to save note
  const handleInputChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center ">
      {/* Form to save notes  */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(note);
          setNote("");
        }}
        className="w-50"
      >
        <div className="mb-3">
          <label className="form-label">Note</label>
          <input
            type="text"
            className="form-control"
            id="noteInput"
            placeholder="Enter your note here"
            value={note}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add notes
        </button>
      </form>
    </div>
  );
};

export default Form;
