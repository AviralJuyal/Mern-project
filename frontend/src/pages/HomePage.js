import React, { useContext, useEffect, useState } from "react";
import ResizableComponent from "../components/ResizableComponent";
import Welcome from "../components/Welcome";
import Form from "../components/Form";
import Card from "../components/Card";
import MainContext from "../context/MainContext";
import { apiendpoint } from "../utils/apiendpoint";

const HomePage = () => {
  // This save windowWidth
  const windowWidth = window.innerWidth - 50;
  // This save windowHeights
  const windowHeight = window.innerHeight - 50;
  const marginInPx = 15;

  // Height and width states

  const [firstBox, setFirstBox] = useState({
    height: windowHeight / 2,
    width: 400,
  });
  const [secondBox, setSecondBox] = useState({
    height: windowHeight / 2,
    width: windowWidth - 400 - marginInPx,
  });

  const [thirdBox, setThirdBox] = useState({
    height: windowHeight / 2,
    width: windowWidth,
  });

  // These are widths of all the boxes but they get updated only after completion of resizing
  const [widths, setWidths] = useState({
    first: 400,
    second: windowWidth - 415,
    third: windowWidth,
  });

  // These are heights of all the boxes but they get updated only after completion of resizing
  const [heights, setHeights] = useState({
    first: windowHeight / 2,
    second: windowHeight / 2,
    third: windowHeight / 2,
  });

  // This stores all notes
  const [allNotes, setAllNotes] = useState([]);

  // JWT token stored in context for authentication
  const { jwt } = useContext(MainContext);

  // This runs while we are resizing
  const handleResize = (direction, size, box) => {
    // box 1
    if (box === 1) {
      if (direction === "right") {
        setFirstBox({ ...firstBox, width: size.width + widths.first });
        setSecondBox({
          ...secondBox,
          width: Math.abs(windowWidth - size.width - widths.first - marginInPx),
        });
      } else if (direction === "left") {
        setFirstBox({ ...firstBox, width: widths.first + size.width });
      } else if (direction === "bottom") {
        setFirstBox({
          ...firstBox,
          height: heights.first + size.height,
        });
        console.log(size.height);
        if (size.height > 0)
          setThirdBox({
            ...thirdBox,
            height: windowHeight - heights.first - size.height,
          });
      }
    }
    // box 2
    else if (box === 2) {
      if (direction === "left") {
        setSecondBox({
          ...secondBox,
          width: widths.second + size.width,
        });
        setFirstBox({
          ...firstBox,
          width: Math.abs(
            windowWidth - widths.second - size.width - marginInPx
          ),
        });
      } else if (direction === "right") {
        setSecondBox({
          ...secondBox,
          width: widths.second + size.width,
        });
      } else if (direction === "bottom") {
        setSecondBox({
          ...secondBox,
          height: heights.second + size.height,
        });
        if (size.height > 0)
          setThirdBox({
            ...thirdBox,
            height: windowHeight - heights.second - size.height,
          });
      }
    }
    // box 3
    else {
      if (direction === "left" || direction === "right") {
        setThirdBox({ ...thirdBox, width: widths.third + size.width });
      } else if (direction === "bottom") {
        setThirdBox({ ...thirdBox, height: heights.third + size.height });
      } else {
        setThirdBox({ ...thirdBox, height: heights.third + size.height });
        setFirstBox({
          ...firstBox,
          height: windowHeight - heights.third - size.height,
        });
        setSecondBox({
          ...secondBox,
          height: windowHeight - heights.third - size.height,
        });
      }
    }
  };

  // Function only runs when we stop the resizing
  const handleOnStop = (direction, size, box) => {
    if (box === 1) {
      //   console.log(firstBox.width, size.width);
      setWidths({ ...widths, first: firstBox.width });
      setHeights({ ...heights, first: firstBox.height });
    } else if (box === 2) {
      setWidths({ ...widths, second: secondBox.width });
      setHeights({ ...heights, second: secondBox.height });
    } else {
      setWidths({ ...widths, third: thirdBox.width });
      setHeights({ ...heights, third: thirdBox.height });
    }
  };

  // Finction to fetch notes
  const getNotes = async () => {
    let response = await fetch(`${apiendpoint}/notes/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
    });
    response = await response.json();

    if (!response.success) {
      alert("Some error occurred");
      return;
    }
    setAllNotes(response?.notes || []);
  };

  // Function to save notes
  const handleSubmit = async (note) => {
    // event.preventDefault();
    let response = await fetch(`${apiendpoint}/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify({ text: note }),
      jwt,
    });
    response = await response.json();

    if (!response.success) {
      alert("Some error occurred");
      return;
    }
    alert("Note added successfully");
    getNotes();
  };

  // Function to update notes
  const handleUpdate = async (note, id) => {
    let response = await fetch(`${apiendpoint}/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": jwt,
      },
      body: JSON.stringify({ text: note }),
      jwt,
    });
    response = await response.json();

    if (!response.success) {
      alert("Some error occurred");
      return;
    }
    alert("Note added successfully");
    getNotes();
  };

  // Useeffect to load notes
  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className=" d-flex">
        <div className="m-2">
          {/* Welcome component  */}
          <ResizableComponent
            value={firstBox}
            handleChange={handleResize}
            handleOnStop={handleOnStop}
            box={1}
          >
            <Welcome />
          </ResizableComponent>
        </div>
        <div className="m-2">
          {/* Form component  */}
          <ResizableComponent
            value={secondBox}
            handleChange={handleResize}
            handleOnStop={handleOnStop}
            box={2}
          >
            <Form handleSubmit={handleSubmit} />
          </ResizableComponent>
        </div>
      </div>
      <div className="m-2">
        {/* Notes component  */}
        <ResizableComponent
          value={thirdBox}
          handleChange={handleResize}
          handleOnStop={handleOnStop}
          box={3}
        >
          <div className="d-flex gap-2 flex-wrap">
            {allNotes.length > 0
              ? allNotes.map((note, i) => (
                  <Card
                    text={note.text}
                    id={note.id}
                    key={i}
                    handleUpdate={handleUpdate}
                  />
                ))
              : "No notes available, add your notes from the form given above."}
          </div>
        </ResizableComponent>
      </div>
    </>
  );
};

export default HomePage;
