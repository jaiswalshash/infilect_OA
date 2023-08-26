import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import "./image.css";
import Loader from "./Loader/Loader";

const Image = (props) => {
  // State to reset the component
  const [resetCounter, setResetCounter] = useState(0);
  
    //For Loader
    const [loader, setLoader] = useState(false); 

  // State to reset coordinates
  const [resetCoordinates, setResetCoordinates] = useState(false);
  
  // State to hold calculated coordinates
  const [topLeft, setTopLeft] = useState([0, 0]);
  const [topRight, setTopRight] = useState([0, 100]);
  const [bottomLeft, setBottomLeft] = useState([100, 0]);
  const [bottomRight, setBottomRight] = useState([100, 100]);
  
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
    border: "dashed 4px red", // Changed to dashed border
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
    let child = document.getElementById("rnd-rct");
    const childDimension = child.getBoundingClientRect();

    let x1 = childDimension.x - dimensions.x;
    let y1 = childDimension.y - dimensions.y;
    let width = childDimension.width;
    let height = childDimension.height;

    setTopLeft([x1, y1]);
    setTopRight([x1 + width, y1]);
    setBottomLeft([x1, y1 + height]);
    setBottomRight([x1 + width, y1 + height]);

    setTimeout(() => {
        alert("Changes Saved!")
        setLoader(false);
      }, 1000); 
  };

  // Function to handle downloading JSON data
  const handleDownload = () => {
    setLoader(true);
    const jsonData = {
      [props.imageID]: [
        {
          x1: topLeft,
          y1: topRight,
          x2: bottomLeft,
          y2: bottomRight,
        },
      ],
    };
  
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: "application/json",
    });
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.imageID}.json`;
  
    // Set a timeout of 3 seconds before starting the download
    setTimeout(() => {
      a.click();
      setLoader(false);
      URL.revokeObjectURL(url);
    }, 3000); 
  };
  

  return (
    <div id="parentDiv" className="parentDivClass" style={parentDivStyle}>
        {loader && <Loader/>}
      <div className="heading">{props.imageID}</div>
      <img
        style={{ width: "70%", height: "80%" }}
        id="childDiv"
        className="childDivClass"
        src={props.image}
        alt="fq"
      />
      {a && b && (
        <Rnd
          id="rnd-rct"
          style={style}
          bounds=".childDivClass"
          default={{
            x: a,
            y: b,
            width: 100,
            height: 100,
          }}
        ></Rnd>
      )}
      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>Save</button>
        <button className="download-btn" onClick={handleDownload}>Download</button>
      </div>
    </div>
  );
};

export default Image;
