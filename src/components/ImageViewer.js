import React, { useState, useEffect } from "react";
import "./image.css";
import Loader from "./Loader/Loader";
import Box from "./BoundingBox/Bounding";
import square from "../assets/square.png";

const Image = (props) => {
  // State to reset the component
  const [resetCounter, setResetCounter] = useState(0);

  // For Loader
  const [loader, setLoader] = useState(false);

  // State to reset coordinates
  const [resetCoordinates, setResetCoordinates] = useState(false);

  // State to hold calculated coordinates
  const [topLeft, setTopLeft] = useState([0, 0]);
  const [topRight, setTopRight] = useState([0, 100]);
  const [bottomLeft, setBottomLeft] = useState([100, 0]);
  const [bottomRight, setBottomRight] = useState([100, 100]);

  // Number of bounding boxes
  const [numBoxes, setNumBoxes] = useState(1);

  // Adding a state to hold box coordinates
  const [boxCoord, setBoxCoord] = useState(null);

  // Function to add a new box
  const addBox = () => {
    setNumBoxes(numBoxes + 1);
  };

  // State to hold calculated dimensions
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);

  // Effect to reset coordinates when resetCounter changes
  useEffect(() => {
    if (resetCounter > 0) {
      setResetCounter(0);
      setTopLeft([0, 0]);
      setTopRight([0, 100]);
      setBottomLeft([100, 0]);
      setBottomRight([100, 100]);
      setResetCoordinates(true);
    }
  }, [resetCounter]);

  // Effect to reset coordinates if needed when props.image changes
  useEffect(() => {
    if (resetCoordinates) {
      setResetCoordinates(false);
    }
  }, [props.image, resetCoordinates]);

  // Style for the resizable and draggable rectangle
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "dashed 4px red",
    background: "rgba(240, 240, 240, 0.5)",
  };

  // Effect to calculate initial dimensions of the parent div
  useEffect(() => {
    let parentDiv = document.getElementById("childDiv");
    const dimensions = parentDiv.getBoundingClientRect();
    setA(dimensions.x);
    setB(dimensions.y);
  }, []);

  // Style for the parent div
  const parentDivStyle = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  };

  // Function to handle saving coordinates
  const handleSave = () => {
    setLoader(true);
    let parentDiv = document.getElementById("childDiv");
    const dimensions = parentDiv.getBoundingClientRect();

    // Collect all box coordinates
    const boxCoordinates = [];
    for (let index = 0; index < numBoxes; index++) {
      let box = document.getElementById(`rct-rnd${index}`);
      if (box) {
        const boxDimension = box.getBoundingClientRect();
        let x1 = boxDimension.x - dimensions.x;
        let y1 = boxDimension.y - dimensions.y;
        let width = boxDimension.width;
        let height = boxDimension.height;

        boxCoordinates.push({
          x1,
          y1,
          x2: x1 + width,
          y2: y1 + height,
        });
      }
    }

    // Set box coordinates state
    setBoxCoord(boxCoordinates);

    setTimeout(() => {
      alert("Changes Saved!");
      setLoader(false);
    }, 1000);
  };

  // Function to handle downloading JSON data
  const handleDownload = () => {
    setLoader(true);
    let jsonData = {};

    if (boxCoord) {
      jsonData = {
        [props.imageID]: boxCoord,
      };
    }

    const blob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.imageID}_boxes.json`;

    // Set a timeout of 3 seconds before starting the download
    setTimeout(() => {
      a.click();
      setLoader(false);
      URL.revokeObjectURL(url);
    }, 3000);
  };

  return (
    <div id="parentDiv" className="parentDivClass" style={parentDivStyle}>
      {loader && <Loader />}
      <div className="heading">{props.imageID}</div>
      <div className="icon-selector">
        Click on the Shape!
        <hr style={{ width: "97%" }} />
        <div className="sqaure">
          <img width={50} onClick={addBox} src={square} alt="" />
        </div>
      </div>
      <img
        style={{ width: "70%", height: "80%" }}
        id="childDiv"
        className="childDivClass"
        src={props.image}
        alt="fq"
      />
      {a && b &&
        Array.from({ length: numBoxes }).map((_, index) => (
          <Box key={index} a={a} b={b} id={`rct-rnd${index}`} />
        ))}
      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="download-btn" onClick={handleDownload}>
          Download
        </button>
      </div>
    </div>
  );
};

export default Image;
