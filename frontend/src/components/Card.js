import React, { useEffect, useState } from "react";

const Card = ({ text, handleUpdate, id }) => {
  // State to save whether the card is in update state or not
  const [isUpdating, setIsUpdating] = useState(false);

  // Saves the note
  const [note, setNote] = useState(text);

  // Updates the note
  useEffect(() => {
    setNote(text);
  }, [text]);

  return (
    <div class="card" style={{ width: "14rem" }}>
      <div class="card-body">
        {/* When not editing */}
        {!isUpdating && <p class="card-text">{note}</p>}

        {/* When in edit state  */}
        {isUpdating && (
          <input
            type="text"
            value={note}
            class=""
            placeholder="Updating"
            onChange={(e) => setNote(e.target.value)}
          />
        )}

        {!isUpdating ? (
          <button className="btn btn-info" onClick={() => setIsUpdating(true)}>
            Update
          </button>
        ) : (
          <div>
            <button
              className="btn btn-success m-2"
              onClick={() => {
                setIsUpdating(false);
                handleUpdate(note, id);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                setNote(text);
                setIsUpdating(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
